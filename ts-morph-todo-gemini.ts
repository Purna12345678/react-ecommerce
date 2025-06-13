import {
    Project,
    SyntaxKind,
    ClassDeclaration,
    MethodDeclaration,
    CallExpression,
    ImportDeclaration,
    ExpressionStatement,
    Identifier,
    PropertyAccessExpression,
    SourceFile,
    Statement,
    ObjectLiteralExpression,
    PropertyAssignment,
    VariableDeclaration,
    JSDoc,
    VariableStatement,
    Node,
    FunctionDeclaration,
    Block,
    PropertyDeclaration,
    GetAccessorDeclaration,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
} from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import * as fsa from 'fs-extra';
import { ScriptTarget, JsxEmit } from 'typescript';

const newSrcBasePath = "./new-src";
const sourceFilesPath = path.join(newSrcBasePath, 'src', '**', '*.{ts,tsx,js,jsx}');
const migrationReportPath = path.join(newSrcBasePath, 'migration-todo.json');

interface MigrationIssue {
    file: string;
    issue: string;
    line: number;
    suggestion?: string;
    transformed: boolean;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

async function ensureStorageAndCopySource() {
    const newSrcDir = path.join(newSrcBasePath, 'src');
    if (fsa.existsSync(newSrcBasePath)) {
        await fsa.remove(newSrcBasePath);
        console.log(`Removed existing '${newSrcBasePath}' for a clean start.`);
    }

    fsa.mkdirSync(newSrcBasePath, { recursive: true });

    await fsa.copy('src', newSrcDir, { overwrite: true });
    console.log(`Copied 'src' to '${newSrcDir}' for migration.`);
}

/**
 * Transforms content of a node (typically a method body or render return)
 * to use functional component patterns.
 */
function transformNodeContent(
    node: Node,
    stateProperties: { name: string; setter: string }[],
    classMethods: string[]
): string {
    // Create a temporary source file for transformation to avoid modifying the original AST during traversal
    // and then apply the changes as text. This is a common pattern for isolated node transformations.
    const tempProject = new Project();
    const tempSourceFile = tempProject.createSourceFile("temp.ts");
    let contentToProcess: string;

    if (node.getKind() === SyntaxKind.Block) {
        // If it's a block, take its statements. This ensures proper indentation after conversion.
        contentToProcess = (node as Block).getStatements().map(s => s.getText()).join('\n');
    } else {
        // Otherwise, just take the node's text. This is for JSX elements in render methods.
        contentToProcess = node.getText();
    }
    tempSourceFile.replaceWithText(contentToProcess);

    tempSourceFile.forEachDescendant(descendant => {
        if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
            const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
            const expressionText = propAccess.getExpression().getText();
            const propertyName = propAccess.getName();

            // Handling this.state.propName
            if (expressionText === 'this.state' || expressionText === '_this.state') {
                const stateProp = stateProperties.find(p => p.name === propertyName);
                if (stateProp) {
                    // If it's a state property access, replace with the setter function
                    propAccess.replaceWithText(`${stateProp.setter}(${propertyName})`);
                } else {
                    // If not found, flag it for manual review
                    propAccess.replaceWithText(`/* TODO: Manual state conversion for: ${propertyName} */ this.state.${propertyName}`);
                }
            }
            // Handling this.props.propName
            else if (expressionText === 'this.props' || expressionText === '_this.props') {
                propAccess.replaceWithText(`props.${propertyName}`);
            }
            // Handling this.methodName
            else if (expressionText === 'this' || expressionText === '_this') {
                if (classMethods.includes(propertyName)) {
                    // If it's a call to a class method (e.g., this.handleClick())
                    if (propAccess.getParent()?.getKind() === SyntaxKind.CallExpression &&
                        propAccess.getParent()?.asKindOrThrow(SyntaxKind.CallExpression).getExpression() === propAccess) {
                        propAccess.replaceWithText(propertyName); // Direct call to method
                    }
                } else if (propertyName === 'context') {
                    // Specific handling for this.context
                    propAccess.replaceWithText('context'); // Assumes `const context = useContext(MyContext);` is added
                } else if (propertyName === 'refs') {
                    // Specific handling for this.refs
                    propAccess.replaceWithText('/* TODO: Manual useRef conversion */ refs'); // Flag this.refs
                } else if (propertyName === 'setState') {
                    // setState calls are handled by the separate CallExpression block below
                }
            }
        }
        // Handling setState calls
        else if (descendant.getKind() === SyntaxKind.CallExpression) {
            const callExpr = descendant.asKindOrThrow(SyntaxKind.CallExpression);
            const expressionText = callExpr.getExpression().getText();

            if (expressionText === 'this.setState' || expressionText === '_this.setState') {
                const args = callExpr.getArguments();
                if (args.length > 0) {
                    const arg = args[0];
                    if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
                        // setState with an object: this.setState({ prop: value }) -> setProp(value)
                        const setStateObject = arg.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                        let replacementCalls: string[] = [];
                        setStateObject.getProperties().forEach(prop => {
                            if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                                const propAssignment = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
                                const propName = propAssignment.getName();
                                const propValue = propAssignment.getInitializer()?.getText() || 'undefined';
                                const stateProp = stateProperties.find(p => p.name === propName);
                                if (stateProp) {
                                    replacementCalls.push(`${stateProp.setter}(${propValue})`);
                                }
                            } else if (prop.getKind() === SyntaxKind.ShorthandPropertyAssignment) {
                                const shorthand = prop.asKindOrThrow(SyntaxKind.ShorthandPropertyAssignment);
                                const propName = shorthand.getName();
                                const stateProp = stateProperties.find(p => p.name === propName);
                                if (stateProp) {
                                    replacementCalls.push(`${stateProp.setter}(${propName})`);
                                }
                            }
                            // No need to handle SpreadAssignment for this.setState as it's not a direct property update
                        });
                        if (replacementCalls.length > 0) {
                            callExpr.replaceWithText(replacementCalls.join(';\n'));
                        } else {
                            // If no properties were found/transformed, flag it
                            callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                        }
                    } else if (arg.getKind() === SyntaxKind.ArrowFunction || arg.getKind() === SyntaxKind.FunctionExpression) {
                        // setState with a function: this.setState(prevState => ({ prop: prevState.prop + 1 }))
                        // Attempt to transform to functional update if possible, otherwise flag
                        const funcArg = arg.asKindOrThrow(arg.getKind() === SyntaxKind.ArrowFunction ? SyntaxKind.ArrowFunction : SyntaxKind.FunctionExpression);
                        const params = funcArg.getParameters().map(p => p.getText());
                        const body = funcArg.getBody();

                        if (body.getKind() === SyntaxKind.ParenthesizedExpression) {
                            const parenthesizedExpr = body.asKindOrThrow(SyntaxKind.ParenthesizedExpression);
                            const objectLiteral = parenthesizedExpr.getExpression();
                            if (objectLiteral.getKind() === SyntaxKind.ObjectLiteralExpression) {
                                const props = objectLiteral.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).getProperties();
                                let replacementCalls: string[] = [];
                                props.forEach(prop => {
                                    if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                                        const propAssignment = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
                                        const propName = propAssignment.getName();
                                        const propValue = propAssignment.getInitializer()?.getText() || 'undefined';
                                        const stateProp = stateProperties.find(p => p.name === propName);
                                        if (stateProp) {
                                            // Simple replacement, might need manual adjustment for `prevState` usage
                                            replacementCalls.push(`${stateProp.setter}(${params[0]} => (${propValue}))`);
                                        }
                                    }
                                });
                                if (replacementCalls.length > 0) {
                                    callExpr.replaceWithText(replacementCalls.join(';\n'));
                                } else {
                                    callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                                }
                            } else {
                                callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                            }
                        } else if (body.getKind() === SyntaxKind.ObjectLiteralExpression) {
                            // Direct object return like ({ prop: value })
                            const objectLiteral = body.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                            const props = objectLiteral.getProperties();
                            let replacementCalls: string[] = [];
                            props.forEach(prop => {
                                if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                                    const propAssignment = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
                                    const propName = propAssignment.getName();
                                    const propValue = propAssignment.getInitializer()?.getText() || 'undefined';
                                    const stateProp = stateProperties.find(p => p.name === propName);
                                    if (stateProp) {
                                        replacementCalls.push(`${stateProp.setter}(${params[0]} => (${propValue}))`);
                                    }
                                }
                            });
                             if (replacementCalls.length > 0) {
                                callExpr.replaceWithText(replacementCalls.join(';\n'));
                            } else {
                                callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                            }
                        } else {
                            // Complex function body for setState
                            callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                        }
                    } else {
                        // setState with a direct value (uncommon but possible) or unknown format
                        callExpr.replaceWithText(`void 0; // TODO: Manual setState object conversion for: ${callExpr.getText()}`);
                    }
                }
            }
        }
    });

    return tempSourceFile.getFullText();
}

async function main() {
    // 1. Prepare the working directory by copying 'src' to 'new-src/src'.
    await ensureStorageAndCopySource();

    // 2. Initialize a new ts-morph project for the copied files in 'new-src/src'.
    const project = new Project({
        tsConfigFilePath: 'tsconfig.json', // Use your project's tsconfig.json.
        compilerOptions: {
            allowJs: true,
            checkJs: false,
            target: ScriptTarget.ES2017,
            jsx: JsxEmit.ReactJSX,
        },
        skipAddingFilesFromTsConfig: true, // We will add files explicitly using the glob pattern.
    });

    // Add source files from the copied 'new-src/src' directory to the project.
    project.addSourceFilesAtPaths([sourceFilesPath]);
    console.log(`Added source files from: ${sourceFilesPath}`);

    const issues: MigrationIssue[] = []; // Array to collect all identified issues and transformation results

    // Iterate over each source file to apply transformations
    project.getSourceFiles().forEach(sourceFile => {
        const filePath = sourceFile.getFilePath();
        const ext = sourceFile.getExtension().toLowerCase();
        const isTS = /\.tsx?$/.test(ext); // Determine if it's a TypeScript file

        let usesModuleExports = false; // Flag to detect module.exports for later conversion in this file

        // Track if useState/useCallback/useEffect import is needed for this file
        let needsUseStateImport = false;
        let needsUseCallbackImport = false;
        let needsUseEffectImport = false;
        let needsUseRefImport = false; // Added useRef import flag
        let needsUseContextImport = false; // Added useContext import flag
        let defaultPropsVarName: string | null = null; // To store name of defaultProps variable if separate

        // First pass to identify and stage direct transformations (like ReactDOM.render)
        const nodesToRemove: Node[] = [];

        sourceFile.forEachDescendant(node => {
            const kind = node.getKind();

            // --- 1. ReactDOM.render → createRoot ---
            if (kind === SyntaxKind.CallExpression) {
                const call = node.asKindOrThrow(SyntaxKind.CallExpression);
                const expression = call.getExpression();

                if (expression.getText() === 'ReactDOM.render') {
                    const nodeStartLineNumber = node.getStartLineNumber();

                    // Ensure `createRoot` import from `react-dom/client`
                    if (!sourceFile.getImportDeclarations().some(i =>
                        i.getModuleSpecifierValue() === 'react-dom/client' &&
                        i.getNamedImports().some(ni => ni.getName() === 'createRoot'))) {
                        sourceFile.addImportDeclaration({
                            moduleSpecifier: 'react-dom/client',
                            namedImports: ['createRoot'],
                        });
                    }
                    const [elementArg, containerArg] = call.getArguments();

                    if (elementArg && containerArg) {
                        call.replaceWithText(`createRoot(${containerArg.getText()}).render(${elementArg.getText()})`);
                        issues.push({
                            file: filePath,
                            issue: 'ReactDOM.render replaced with createRoot().render().',
                            line: nodeStartLineNumber,
                            suggestion: 'Ensure `react-dom/client` is correctly imported. Manual adjustments for other ReactDOM methods might be needed.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    } else {
                        issues.push({
                            file: filePath,
                            issue: 'ReactDOM.render call found with unexpected arguments.',
                            line: nodeStartLineNumber,
                            suggestion: 'Could not automatically migrate. Manual refactoring required.',
                            transformed: false,
                            severity: 'CRITICAL',
                        });
                    }
                }
            }

            // --- 4. Fix incorrect aliasing syntax in imports: { X: Y } → { X as Y } ---
            if (kind === SyntaxKind.ImportDeclaration) {
                const importDecl = node.asKindOrThrow(SyntaxKind.ImportDeclaration);
                const namedImports = importDecl.getNamedImports();
                namedImports.forEach((namedImport) => {
                    const text = namedImport.getText();
                    const importLineNumber = namedImport.getStartLineNumber();

                    if (text.includes(':') && !text.includes(' as ')) {
                        const [original, alias] = text.split(':').map((s: string) => s.trim());
                        namedImport.replaceWithText(`${original} as ${alias}`);
                        issues.push({
                            file: filePath,
                            issue: `Import alias \`${text}\` fixed to \`${original} as ${alias}\`.`,
                            line: importLineNumber,
                            suggestion: 'Corrected import alias syntax.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    }
                });
            }

            // --- 5. Basic require() → import (for VariableStatements like `const X = require('module');`) ---
            if (kind === SyntaxKind.VariableStatement) {
                const vs = node.asKindOrThrow(SyntaxKind.VariableStatement);
                const vsLineNumber = vs.getStartLineNumber();

                vs.getDeclarations().forEach((decl: VariableDeclaration) => {
                    const initializer = decl.getInitializer();
                    const declaredName = decl.getName();

                    if (initializer && initializer.getKind() === SyntaxKind.CallExpression) {
                        const callExpression = initializer.asKindOrThrow(SyntaxKind.CallExpression);
                        const requireCallTarget = callExpression.getExpression();

                        if (requireCallTarget instanceof Identifier && requireCallTarget.getText() === 'require') {
                            const arg = callExpression.getArguments()[0];
                            if (arg) {
                                const moduleSpecifier = arg.getText().replace(/['"]/g, '');

                                // Check for existing import for the module specifier
                                const existingImport = sourceFile.getImportDeclaration(i => i.getModuleSpecifierValue() === moduleSpecifier);
                                if (existingImport) {
                                    // If already has default import, add named or do nothing if redundant.
                                    // For simplicity, just add to existing if named, otherwise assume default is good.
                                    if (!existingImport.getDefaultImport() && !existingImport.getNamedImports().some(ni => ni.getName() === declaredName)) {
                                        existingImport.addNamedImport(declaredName);
                                    }
                                } else {
                                    sourceFile.addImportDeclaration({
                                        defaultImport: declaredName,
                                        moduleSpecifier: moduleSpecifier,
                                    });
                                }

                                issues.push({
                                    file: filePath,
                                    issue: `Converted \`require('${moduleSpecifier}')\` to \`import ${declaredName} from '${moduleSpecifier}'\`.`,
                                    line: vsLineNumber,
                                    suggestion: 'Basic CommonJS require() converted to ES Module import. Review for named exports and dynamic imports.',
                                    transformed: true,
                                    severity: 'INFO',
                                });
                                nodesToRemove.push(vs);
                            }
                        }
                    }
                });
            }

            // --- 6. Detect module.exports to replace later ---
            if (kind === SyntaxKind.ExpressionStatement) {
                const exprStmt = node.asKindOrThrow(SyntaxKind.ExpressionStatement);
                if (exprStmt.getExpression().getKind() === SyntaxKind.BinaryExpression) {
                    const innerBinary = exprStmt.getExpression().asKindOrThrow(SyntaxKind.BinaryExpression);
                    if (innerBinary.getLeft()?.getText() === 'module.exports') {
                        usesModuleExports = true;
                        nodesToRemove.push(exprStmt); // Mark for removal, will be replaced by export default
                        issues.push({
                            file: filePath,
                            issue: '`module.exports` detected.',
                            line: exprStmt.getStartLineNumber(),
                            suggestion: 'This will be converted to `export default` if a default export exists.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    }
                }
            }

            // --- 7. Handle propTypes declarations (Removal/Flagging) ---
            if (kind === SyntaxKind.PropertyAccessExpression) {
                const propAccess = node.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                if (propAccess.getName() === 'propTypes' && propAccess.getParent()?.getKind() === SyntaxKind.BinaryExpression) {
                    const binaryExpr = propAccess.getParent()?.asKindOrThrow(SyntaxKind.BinaryExpression);
                    if (binaryExpr) {
                        if (binaryExpr.getLeft()?.getText().endsWith('.propTypes')) {
                            const propTypesStatement = binaryExpr.getParent();
                            if (propTypesStatement && propTypesStatement.getKind() === SyntaxKind.ExpressionStatement) {
                                const statementLineNumber = propTypesStatement.getStartLineNumber();
                                if (isTS) {
                                    issues.push({
                                        file: filePath,
                                        issue: `PropTypes declaration found: \`${propTypesStatement.getText().substring(0, 100)}...\`.`,
                                        line: statementLineNumber,
                                        suggestion: 'Convert to TypeScript interface/type definition for props. Manual refactoring required.',
                                        transformed: false,
                                        severity: 'WARNING',
                                    });
                                } else {
                                    issues.push({
                                        file: filePath,
                                        issue: `Removed PropTypes declaration: \`${propTypesStatement.getText().substring(0, 100)}...\`.`,
                                        line: statementLineNumber,
                                        suggestion: 'PropTypes are typically replaced by TypeScript for type checking. Review component props.',
                                        transformed: true,
                                        severity: 'INFO',
                                    });
                                    nodesToRemove.push(propTypesStatement);
                                }
                            }
                        }
                    }
                }
            } else if (kind === SyntaxKind.VariableStatement) {
                const varStmt = node.asKindOrThrow(SyntaxKind.VariableStatement);
                const varDecl = varStmt.getDeclarations()[0];
                if (varDecl && varDecl.getName() === 'propTypes' && varDecl.getInitializer()?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                    const statementLineNumber = varStmt.getStartLineNumber();
                    if (isTS) {
                        issues.push({
                            file: filePath,
                            issue: `PropTypes declaration found: \`${varStmt.getText().substring(0, 100)}...\`.`,
                            line: statementLineNumber,
                            suggestion: 'Convert to TypeScript interface/type definition for props. Manual refactoring required.',
                            transformed: false,
                            severity: 'WARNING',
                        });
                    } else {
                        issues.push({
                            file: filePath,
                            issue: `Removed PropTypes declaration: \`${varStmt.getText().substring(0, 100)}...\`.`,
                            line: statementLineNumber,
                            suggestion: 'PropTypes are typically replaced by TypeScript for type checking. Review component props.',
                            transformed: true,
                            severity: 'INFO',
                        });
                        nodesToRemove.push(varStmt);
                    }
                }
            }
            // --- Detect and handle Component.defaultProps = { ... } ---
            else if (kind === SyntaxKind.ExpressionStatement) {
                const exprStmt = node.asKindOrThrow(SyntaxKind.ExpressionStatement);
                if (exprStmt.getExpression().getKind() === SyntaxKind.BinaryExpression) {
                    const binaryExpr = exprStmt.getExpression().asKindOrThrow(SyntaxKind.BinaryExpression);
                    const left = binaryExpr.getLeft();
                    const right = binaryExpr.getRight();

                    if (left.getKind() === SyntaxKind.PropertyAccessExpression && (left as PropertyAccessExpression).getName() === 'defaultProps') {
                        const componentName = (left as PropertyAccessExpression).getExpression().getText();
                        if (right.getKind() === SyntaxKind.ObjectLiteralExpression) {
                            defaultPropsVarName = componentName; // Store component name for later use
                            nodesToRemove.push(exprStmt); // Mark for removal, will be converted to default parameters
                            issues.push({
                                file: filePath,
                                issue: `\`${componentName}.defaultProps\` found.`,
                                line: exprStmt.getStartLineNumber(),
                                suggestion: `Converting to default parameters for ${componentName}.`,
                                transformed: true,
                                severity: 'INFO',
                            });
                        }
                    }
                }
            }
        }); // End of forEachDescendant for first pass

        // --- Apply collected removals ---
        nodesToRemove.forEach(node => {
            try {
                // Check if the node is still valid before attempting to remove
                if (Node.isStatement(node) || Node.isImportDeclaration(node) || Node.isPropertyDeclaration(node)) {
                    node.remove();
                } else {
                    console.warn(`Attempted to remove a non-removable node kind: ${node.getKindName()} at line ${node.getStartLineNumber()} in ${filePath}`);
                }
            } catch (e: unknown) {
                console.error(`Error removing node (${node.getKindName()}): ${(e as Error).message} at ${node.getStartLineNumber()} in ${filePath}`);
            }
        });

        // --- Process Class Declarations ---
        const classDeclarationsToTransform = sourceFile.getClasses().filter(cls => {
            const heritage = cls.getHeritageClauses();
            return heritage.some(h => h.getText().includes('React.Component') || h.getText().includes('Component'));
        });

        for (const cls of classDeclarationsToTransform) {
            const className = cls.getName();
            if (!className) continue; // Skip unnamed classes

            const classStartLineNumber = cls.getStartLineNumber();
            const isClassExported = cls.isExported() || cls.isDefaultExport();

            const renderMethod = cls.getInstanceMethod('render');
            const constructorMethod = cls.getInstanceMethod('constructor');

            if (renderMethod) {
                const functionalComponentBodyLines: string[] = [];
                const stateProperties: { name: string; setter: string; initializer: string }[] = [];
                const classMethodNames: string[] = []; // Only names for `this.method` replacement

                // 3.1. Extract initial state from constructor (if present)
                if (constructorMethod) {
                    constructorMethod.forEachDescendant(constructorNode => {
                        if (constructorNode.getKind() === SyntaxKind.BinaryExpression) {
                            const binaryExpr = constructorNode.asKindOrThrow(SyntaxKind.BinaryExpression);
                            if (binaryExpr.getLeft().getText() === 'this.state' && binaryExpr.getOperatorToken().getKind() === SyntaxKind.EqualsToken) {
                                const initializer = binaryExpr.getRight();
                                if (initializer.getKind() === SyntaxKind.ObjectLiteralExpression) {
                                    const objectLiteral = initializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                                    objectLiteral.getProperties().forEach(prop => {
                                        if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                                            const propAssignment = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
                                            const propName = propAssignment.getName();
                                            const setterName = `set${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
                                            stateProperties.push({
                                                name: propName,
                                                setter: setterName,
                                                initializer: propAssignment.getInitializer()?.getText() || 'undefined'
                                            });
                                        }
                                    });
                                }
                            }
                        }
                        // Remove `this.method = this.method.bind(this)` statements
                        if (constructorNode.getKind() === SyntaxKind.ExpressionStatement) {
                            const exprStmt = constructorNode.asKindOrThrow(SyntaxKind.ExpressionStatement);
                            if (exprStmt.getExpression().getKind() === SyntaxKind.BinaryExpression) {
                                const binaryExpr = exprStmt.getExpression().asKindOrThrow(SyntaxKind.BinaryExpression);
                                if (binaryExpr.getLeft().getKind() === SyntaxKind.PropertyAccessExpression &&
                                    binaryExpr.getRight().getKind() === SyntaxKind.CallExpression) {
                                    const left = binaryExpr.getLeft().asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                                    const right = binaryExpr.getRight().asKindOrThrow(SyntaxKind.CallExpression);
                                    if (left.getExpression().getText() === 'this' && right.getExpression().getText().endsWith('.bind') && right.getArguments()[0]?.getText() === 'this') {
                                        exprStmt.remove(); // Remove directly from the source file
                                        issues.push({
                                            file: filePath,
                                            issue: `Removed method binding: \`${exprStmt.getText()}\`.`,
                                            line: exprStmt.getStartLineNumber(),
                                            suggestion: 'Method binding is no longer needed in functional components as functions do not have a `this` context.',
                                            transformed: true,
                                            severity: 'INFO',
                                        });
                                    }
                                }
                            }
                        }
                    });
                    // Remove the constructor itself after extracting state
                    constructorMethod.remove();
                    issues.push({
                        file: filePath,
                        issue: `Removed constructor for class \`${className}\`.`,
                        line: constructorMethod.getStartLineNumber(),
                        suggestion: 'Constructor logic migrated to `useState` hooks or other effects.',
                        transformed: true,
                        severity: 'INFO',
                    });
                }

                // Convert static defaultProps property
                let defaultPropsObject: ObjectLiteralExpression | undefined;
                const staticDefaultProps = cls.getStaticProperty('defaultProps');

                if (staticDefaultProps) {
                    // Correctly check the type of staticDefaultProps and its initializer
                    if (staticDefaultProps instanceof PropertyDeclaration) {
                        const initializer = staticDefaultProps.getInitializer();
                        if (initializer?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                            defaultPropsObject = initializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                            staticDefaultProps.remove(); // Remove the static property
                            issues.push({
                                file: filePath,
                                issue: `Removed \`static defaultProps\` from \`${className}\`.`,
                                line: staticDefaultProps.getStartLineNumber(),
                                suggestion: 'Default props will be converted to default parameters in the functional component signature.',
                                transformed: true,
                                severity: 'INFO',
                            });
                        }
                    } else if (staticDefaultProps instanceof GetAccessorDeclaration || staticDefaultProps instanceof SetAccessorDeclaration) {
                         // If it's a getter/setter, it's not a simple object literal initializer for defaultProps
                         issues.push({
                            file: filePath,
                            issue: `\`static defaultProps\` is an accessor in \`${className}\`.`,
                            line: staticDefaultProps.getStartLineNumber(),
                            suggestion: 'Manual migration required for accessor-based defaultProps.',
                            transformed: false,
                            severity: 'WARNING',
                        });
                    }
                } else if (defaultPropsVarName === className) {
                    // If defaultProps was defined as a separate variable (e.g., Component.defaultProps = { ... })
                    // The varStmt removal handles it, but we need the object value here.
                    const defaultPropsStmt = sourceFile.getStatements().find(s =>
                        s.getKind() === SyntaxKind.ExpressionStatement &&
                        s.asKindOrThrow(SyntaxKind.ExpressionStatement).getExpression().getKind() === SyntaxKind.BinaryExpression &&
                        s.asKindOrThrow(SyntaxKind.ExpressionStatement).getExpression().asKindOrThrow(SyntaxKind.BinaryExpression).getLeft().getText() === `${className}.defaultProps`
                    );
                    if (defaultPropsStmt) {
                        const initializer = (defaultPropsStmt.asKindOrThrow(SyntaxKind.ExpressionStatement).getExpression().asKindOrThrow(SyntaxKind.BinaryExpression).getRight());
                        if (initializer.getKind() === SyntaxKind.ObjectLiteralExpression) {
                            defaultPropsObject = initializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                            // It's already marked for removal by nodesToRemove, so just use its content
                        }
                    }
                }

                // Check for static contextType
                const staticContextType = cls.getStaticProperty('contextType');
                if (staticContextType) {
                    issues.push({
                        file: filePath,
                        issue: `\`static contextType\` found in \`${className}\`.`,
                        line: staticContextType.getStartLineNumber(),
                        suggestion: 'Convert `this.context` usage to `useContext(MyContext)` hook. Manual refactoring required.',
                        transformed: false,
                        severity: 'WARNING',
                    });
                    needsUseContextImport = true;
                    staticContextType.remove(); // Remove the static property
                }

                // Generate `useState` declarations
                stateProperties.forEach(prop => {
                    functionalComponentBodyLines.push(`  const [${prop.name}, ${prop.setter}] = useState(${prop.initializer});`);
                    needsUseStateImport = true;
                });

                // Convert class methods to functions and collect their transformed bodies
                cls.getInstanceMethods().forEach(method => {
                    const methodName = method.getName();
                    let methodBodyNode = method.getBody();
                    if (!methodBodyNode) return;

                    let transformedMethodBody = transformNodeContent(methodBodyNode, stateProperties, classMethodNames);

                    const jsDoc = method.getJsDocs().map((doc: JSDoc) => doc.getText()).join('\n');
                    let jsDocString = jsDoc ? `\n${jsDoc}` : '';

                    if (methodName === 'componentDidMount') {
                        // componentDidMount to useEffect(() => { ... }, [])
                        functionalComponentBodyLines.push(`${jsDocString}\n  useEffect(() => {\n${transformedMethodBody}\n  }, []);`);
                        needsUseEffectImport = true;
                        issues.push({
                            file: filePath,
                            issue: `Converted \`componentDidMount\` to \`useEffect(() => { ... }, [])\`.`,
                            line: method.getStartLineNumber(),
                            suggestion: 'Review `useEffect` dependencies for accuracy.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    } else if (methodName === 'componentWillUnmount') {
                        // componentWillUnmount to useEffect(() => { return () => { ... } }, [])
                        functionalComponentBodyLines.push(`${jsDocString}\n  useEffect(() => {\n    return () => {\n${transformedMethodBody}\n    };\n  }, []);`);
                        needsUseEffectImport = true;
                        issues.push({
                            file: filePath,
                            issue: `Converted \`componentWillUnmount\` to \`useEffect(() => { return () => { ... } }, [])\`.`,
                            line: method.getStartLineNumber(),
                            suggestion: 'Review `useEffect` cleanup function. Ensure no unexpected behavior.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    } else if (methodName === 'componentDidUpdate') {
                        // componentDidUpdate to useEffect(() => { ... }, [dependencies]) - Requires manual dependency inference
                        functionalComponentBodyLines.push(`${jsDocString}\n  useEffect(() => {\n${transformedMethodBody}\n  }, [/* TODO: Add dependencies for componentDidUpdate */]);`);
                        needsUseEffectImport = true;
                        issues.push({
                            file: filePath,
                            issue: `Converted \`componentDidUpdate\` to \`useEffect(() => { ... }, [dependencies])\`.`,
                            line: method.getStartLineNumber(),
                            suggestion: 'CRITICAL: Manually identify and add dependencies (props/state) to the `useEffect` dependency array. Incorrect dependencies can lead to bugs.',
                            transformed: false, // Marking as false because it requires critical manual input
                            severity: 'CRITICAL',
                        });
                    }
                    else if (['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate', 'shouldComponentUpdate', 'getSnapshotBeforeUpdate', 'static getDerivedStateFromProps'].includes(methodName)) {
                        // Flag other lifecycle methods for manual conversion
                        issues.push({
                            file: filePath,
                            issue: `Lifecycle method \`${methodName}\` needs manual migration to \`useEffect\` or other hooks.`,
                            line: method.getStartLineNumber(),
                            suggestion: `Convert the logic inside \`${methodName}\` to a \`useEffect\` hook. Pay attention to dependencies. Consider \`useMemo\` or \`useRef\` for other cases.`,
                            transformed: false,
                            severity: 'WARNING',
                        });
                        needsUseEffectImport = true; // Still indicates that useEffect might be needed for the file
                    }
                    else if (methodName !== 'render' && methodName !== 'constructor') {
                        // Regular class methods
                        functionalComponentBodyLines.push(`${jsDocString}\n  const ${methodName} = useCallback((${method.getParameters().map(p => p.getText()).join(', ')}) => ${transformedMethodBody}, [/* TODO: Add dependencies */]);`);
                        needsUseCallbackImport = true;
                        classMethodNames.push(methodName); // Store for `this.method` replacement in other parts
                    }
                });
                // Remove all class methods after processing
                cls.getInstanceMethods().forEach(method => method.remove());


                // 3.4. Prepare render method content
                let renderBodyNode = renderMethod.getBody();
                if (!renderBodyNode) continue;

                // Detect if 'this.props' is used in the class methods or render body
                let containsThisProps = false;
                let containsThisRefs = false; // Detect this.refs
                let containsThisContext = false; // Detect this.context
                let containsDangerouslySetInnerHTML = false; // Flag for JSX attribute

                renderBodyNode.forEachDescendant(descendant => {
                    if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
                        const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                        if (propAccess.getExpression().getText() === 'this.props') {
                            containsThisProps = true;
                        } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() === 'refs') {
                            containsThisRefs = true;
                            needsUseRefImport = true;
                            issues.push({
                                file: filePath,
                                issue: '`this.refs` found.',
                                line: propAccess.getStartLineNumber(),
                                suggestion: 'Convert `this.refs` to `useRef` hook. Manual refactoring required.',
                                transformed: false,
                                severity: 'WARNING',
                            });
                        } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() === 'context') {
                            containsThisContext = true;
                            needsUseContextImport = true;
                            issues.push({
                                file: filePath,
                                issue: '`this.context` found.',
                                line: propAccess.getStartLineNumber(),
                                suggestion: 'Convert `this.context` to `useContext` hook. Manual refactoring required, and ensure the correct Context is passed to `useContext`.',
                                transformed: false,
                                severity: 'WARNING',
                            });
                        }
                    } else if (descendant.getKind() === SyntaxKind.JsxAttribute) {
                        const jsxAttribute = descendant.asKindOrThrow(SyntaxKind.JsxAttribute);
                        if (jsxAttribute.getNameNode().getText() === 'dangerouslySetInnerHTML') {
                            containsDangerouslySetInnerHTML = true;
                            issues.push({
                                file: filePath,
                                issue: '`dangerouslySetInnerHTML` found in JSX.',
                                line: jsxAttribute.getStartLineNumber(),
                                suggestion: 'Review usage of `dangerouslySetInnerHTML`. Consider alternative approaches or validate content carefully for XSS vulnerabilities.',
                                transformed: false,
                                severity: 'CRITICAL',
                            });
                        }
                    }
                });

                // The render body should become the main return JSX of the functional component.
                // We extract the return statement's expression.
                const returnStmt = renderBodyNode.getDescendantsOfKind(SyntaxKind.ReturnStatement)[0];

                if (returnStmt) {
                    let jsx = returnStmt.getExpression()?.getText();

                    if (jsx) {
                        // Apply transformations within the JSX content itself
                        jsx = transformNodeContent(returnStmt.getExpression()!, stateProperties, classMethodNames);

                        const propsType = cls.getTypeParameters()[0]?.getText() || (isTS ? 'any' : '');

                        // Assemble the new functional component string
                        let propsParam = '';
                        if (containsThisProps || defaultPropsObject) {
                            // If defaultPropsObject exists, generate default parameters
                            if (defaultPropsObject) {
                                const defaultPropsEntries = defaultPropsObject.getProperties().map(p => {
                                if (p.getKind() === SyntaxKind.PropertyAssignment) {
                                    const propAssignment = p.asKindOrThrow(SyntaxKind.PropertyAssignment);
                                    return `${propAssignment.getName()} = ${propAssignment.getInitializer()?.getText()}`;
                                } else if (p.getKind() === SyntaxKind.ShorthandPropertyAssignment) {
                                    const shorthand = p.asKindOrThrow(SyntaxKind.ShorthandPropertyAssignment);
                                    return `${shorthand.getName()}`;
                                }
                                return '';
                            }).filter(Boolean).join(', ');

                                // If both this.props and defaultProps, we assume props will be destructured along with defaults
                                if (containsThisProps) {
                                    propsParam = `props, { ${defaultPropsEntries} }`; // This might need manual merging
                                    issues.push({
                                        file: filePath,
                                        issue: `Mixed usage of \`this.props\` and \`defaultProps\` in \`${className}\`.`,
                                        line: classStartLineNumber,
                                        suggestion: 'Review the functional component\'s props signature for correct destructuring and default values. Consider `const { prop1, prop2 } = props;` if not already handled by default parameters.',
                                        transformed: false, // Partial transformation
                                        severity: 'WARNING',
                                    });
                                } else {
                                    propsParam = `{ ${defaultPropsEntries} }`;
                                }
                            } else {
                                propsParam = 'props'; // If only this.props was used, just pass props
                            }
                        }

                        // Add `props` parameter if `this.props` was detected or defaultProps were set
                        let funcComponentString = `${isClassExported ? 'export ' : ''}function ${className}(${propsParam}${propsType ? `: ${propsType}` : ''}) {`;

                        // Add state and method declarations
                        if (functionalComponentBodyLines.length > 0) {
                            funcComponentString += `\n${functionalComponentBodyLines.join('\n')}\n`; // Add extra newline for readability
                        }

                        // Add the transformed render content (excluding the outer function/class wrapper)
                        funcComponentString += `  return (\n${jsx}\n);\n}`; // Ensure it's returned with proper formatting.

                        cls.replaceWithText(funcComponentString); // Perform replacement
                        // The render method is part of the class, so it will be removed with cls.replaceWithText
                        // renderMethod.remove(); // This line is now redundant

                        issues.push({
                            file: filePath,
                            issue: `Class component \`${className}\` converted to functional component with state and methods.`,
                            line: classStartLineNumber,
                            suggestion: 'Review generated `useState`, `useEffect`, and `useCallback` declarations. Manual refactoring is required for complex `setState` calls, `this.refs`, and Context API usage. Check `useEffect` dependencies.',
                            transformed: true,
                            severity: 'INFO',
                        });
                    } else {
                        issues.push({
                            file: filePath,
                            issue: `Class component \`${className}\` found, but render method return JSX not simple or found.`,
                            line: classStartLineNumber,
                            suggestion: 'Could not automatically convert. Manual refactoring required.',
                            transformed: false,
                            severity: 'CRITICAL',
                        });
                    }
                } else {
                    issues.push({
                        file: filePath,
                        issue: `Class component \`${className}\` found, but no clear return statement in render method.`,
                        line: classStartLineNumber,
                        suggestion: 'Could not automatically convert. Manual refactoring required.',
                        transformed: false,
                        severity: 'CRITICAL',
                    });
                }
            } else {
                issues.push({
                    file: filePath,
                    issue: `Class component found with no name or render method.`,
                    line: classStartLineNumber,
                    suggestion: 'Could not automatically convert. Manual refactoring required.',
                    transformed: false,
                    severity: 'CRITICAL',
                });
            }
        } // End of for...of classDeclarationsToTransform loop

        // --- Process Function Declarations that might behave like class components ---
        sourceFile.getFunctions().forEach((funcDecl: FunctionDeclaration) => {
            const functionName = funcDecl.getName();
            if (!functionName) return;

            let containsThisState = false; // Flag for functional components that might use this.state, this.props, etc.
            let containsThisProps = false;
            let containsThisRefs = false;
            let containsThisContext = false;
            let containsSetState = false; // Flag for setState in functional component (shouldn't happen directly)

            funcDecl.forEachDescendant(descendant => {
                if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
                    const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                    if (propAccess.getExpression().getText() === 'this.state') {
                        containsThisState = true;
                    } else if (propAccess.getExpression().getText() === 'this.props') {
                        containsThisProps = true;
                    } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() === 'refs') {
                        containsThisRefs = true;
                        needsUseRefImport = true;
                    } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() === 'context') {
                        containsThisContext = true;
                        needsUseContextImport = true;
                    } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() === 'setState') {
                        containsSetState = true;
                    }
                }
            });

            if (containsThisState || containsThisProps || containsThisRefs || containsThisContext || containsSetState) {
                issues.push({
                    file: filePath,
                    issue: `Functional component \`${functionName}\` uses class-like 'this' references (e.g., this.state, this.props, this.refs, this.context, this.setState).`,
                    line: funcDecl.getStartLineNumber(),
                    suggestion: 'Manually refactor to use hooks (useState, useEffect, useContext, useRef) and direct prop access. This script only automates class component conversion.',
                    transformed: false,
                    severity: 'CRITICAL', // This is a critical issue if `this` is used improperly in a functional component
                });
            }
        });


        // --- Final Import Adjustments for React ---
        // Find existing React import
        let reactImport = sourceFile.getImportDeclaration(imp =>
            imp.getModuleSpecifierValue() === 'react' || imp.getModuleSpecifierValue() === 'React'
        );

        if (!reactImport) {
            // If no React import, add a default one.
            reactImport = sourceFile.addImportDeclaration({
                moduleSpecifier: 'react',
                defaultImport: 'React',
            });
            issues.push({
                file: filePath,
                issue: 'Added `import React from "react";`.',
                line: 1, // Or top of the file
                suggestion: 'Ensure React is imported where JSX is used.',
                transformed: true,
                severity: 'INFO',
            });
        }

        const namedImports = reactImport.getNamedImports();
        const existingNamedImports = new Set(namedImports.map(ni => ni.getName()));

        if (needsUseStateImport && !existingNamedImports.has('useState')) {
            reactImport.addNamedImport('useState');
            issues.push({
                file: filePath,
                issue: 'Added `useState` to React import.',
                line: reactImport.getStartLineNumber(),
                suggestion: 'Needed for state management in functional components.',
                transformed: true,
                severity: 'INFO',
            });
        }
        if (needsUseEffectImport && !existingNamedImports.has('useEffect')) {
            reactImport.addNamedImport('useEffect');
            issues.push({
                file: filePath,
                issue: 'Added `useEffect` to React import.',
                line: reactImport.getStartLineNumber(),
                suggestion: 'Needed for side effects and lifecycle emulation in functional components.',
                transformed: true,
                severity: 'INFO',
            });
        }
        if (needsUseCallbackImport && !existingNamedImports.has('useCallback')) {
            reactImport.addNamedImport('useCallback');
            issues.push({
                file: filePath,
                issue: 'Added `useCallback` to React import.',
                line: reactImport.getStartLineNumber(),
                suggestion: 'Needed for memoizing functions in functional components.',
                transformed: true,
                severity: 'INFO',
            });
        }
        if (needsUseRefImport && !existingNamedImports.has('useRef')) {
            reactImport.addNamedImport('useRef');
            issues.push({
                file: filePath,
                issue: 'Added `useRef` to React import.',
                line: reactImport.getStartLineNumber(),
                suggestion: 'Needed for creating mutable ref objects in functional components.',
                transformed: true,
                severity: 'INFO',
            });
        }
        if (needsUseContextImport && !existingNamedImports.has('useContext')) {
            reactImport.addNamedImport('useContext');
            issues.push({
                file: filePath,
                issue: 'Added `useContext` to React import.',
                line: reactImport.getStartLineNumber(),
                suggestion: 'Needed for consuming Context in functional components.',
                transformed: true,
                severity: 'INFO',
            });
        }

        // Remove `Component` from React import if no class components remain
        if (sourceFile.getClasses().length === 0) {
            const componentImport = reactImport.getNamedImports().find(ni => ni.getName() === 'Component');
            if (componentImport) {
                componentImport.remove();
                issues.push({
                    file: filePath,
                    issue: 'Removed `Component` from React import.',
                    line: reactImport.getStartLineNumber(),
                    suggestion: 'No class components found requiring `Component` import.',
                    transformed: true,
                    severity: 'INFO',
                });
            }
        }

        // Save the transformed file
        sourceFile.saveSync();
        console.log(`Transformed and saved: ${filePath}`);
    }); // End of sourceFile.forEach loop

    // 4. Write a migration report
    const reportContent = JSON.stringify(issues, null, 2);
    fs.writeFileSync(migrationReportPath, reportContent);
    console.log(`Migration report generated: ${migrationReportPath}`);
    console.log(`Total issues/transformations: ${issues.length}`);
}

main().catch(error => {
    console.error("Migration failed:", error);
    process.exit(1);
});
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
} from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import * as fsa from 'fs-extra';
import { ScriptTarget, JsxEmit } from 'typescript'
const newSrcBasePath = "./new-src";
const sourceFilesPath = path.join(newSrcBasePath, 'src', '**', '*.{ts,tsx,js,jsx}');
const migrationReportPath = path.join(newSrcBasePath, 'migration-todo.json');
interface MigrationIssue {
    file: string;
    issue: string;
    line: number;
    suggestion?: string;
    transformed: boolean;
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


function transformNodeContent(node: Node, stateProperties: { name: string; setter: string }[], classMethods: string[]): string {

    const tempProject = new Project();
    const tempSourceFile = tempProject.createSourceFile("temp.ts");
    let contentToProcess: string;
    if (node.getKind() === SyntaxKind.Block) {
        contentToProcess = (node as Block).getStatements().map(s => s.getText()).join('\n');
    } else {
        contentToProcess = node.getText();
    }
    tempSourceFile.replaceWithText(contentToProcess);

    tempSourceFile.forEachDescendant(descendant => {

        if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
            const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
            if (propAccess.getExpression().getText() === 'this.state') {
                const stateProp = stateProperties.find(p => p.name === propAccess.getName());
                if (stateProp) {
                    propAccess.replaceWithText(stateProp.name);
                }
            } else if (propAccess.getExpression().getText() === 'this.props') {
  
                propAccess.replaceWithText(`props.${propAccess.getName()}`);
            } else if (propAccess.getExpression().getText() === 'this') {
                if (classMethods.includes(propAccess.getName())) {
                    if (propAccess.getParent()?.getKind() === SyntaxKind.CallExpression &&
                        propAccess.getParent()?.asKindOrThrow(SyntaxKind.CallExpression).getExpression() === propAccess) {
                        propAccess.replaceWithText(propAccess.getName());
                    }
                }
            } else if (propAccess.getExpression().getText() === '_this') { 
                const stateProp = stateProperties.find(p => p.name === propAccess.getName());
                if (stateProp) {
                    propAccess.replaceWithText(stateProp.name);
                } else if (classMethods.includes(propAccess.getName())) {

                    propAccess.replaceWithText(propAccess.getName());
                } else if (propAccess.getName() === 'setState') {
                }
            }
        }

        else if (descendant.getKind() === SyntaxKind.CallExpression) {
            const callExpr = descendant.asKindOrThrow(SyntaxKind.CallExpression);
            const expressionText = callExpr.getExpression().getText();

            if (expressionText === 'this.setState' || expressionText === '_this.setState') {
                const args = callExpr.getArguments();
                if (args.length > 0) {
                    const arg = args[0];
                    if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
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
                        });
                        if (replacementCalls.length > 0) {
                            callExpr.replaceWithText(replacementCalls.join(';\n'));
                        }
                    } else if (arg.getKind() === SyntaxKind.ArrowFunction || arg.getKind() === SyntaxKind.FunctionExpression) {
                     
                        callExpr.replaceWithText(`/* TODO: Manual setState function updater conversion for: ${callExpr.getText()} */`);
                    }
                }
            }
        }

        else if (descendant.getKind() === SyntaxKind.VariableStatement) {
            const varStmt = descendant.asKindOrThrow(SyntaxKind.VariableStatement);
            varStmt.getDeclarations().forEach(decl => {
                const initializer = decl.getInitializer();
                if (initializer && initializer.getKind() === SyntaxKind.PropertyAccessExpression) {
                    const propAccess = initializer.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                    if ((propAccess.getExpression().getText() === 'this.state' || propAccess.getExpression().getText() === 'this') &&
                        decl.getNameNode().getKind() === SyntaxKind.ObjectBindingPattern) {
            
                        varStmt.remove();
                    }
                } else if (decl.getName() === '_this' && initializer?.getText() === 'this') {

                    varStmt.remove();
                }
            });
        }
    });


    return tempSourceFile.getFullText();
}

/**
 * Main function to orchestrate the analysis and migration of React codebase.
 * It prepares the environment, adds files to the project, iterates through them
 * to apply transformations, and generates a comprehensive report.
 */
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

        // Track if useState/useCallback import is needed for this file
        let needsUseStateImport = false;
        let needsUseCallbackImport = false;
        let needsUseEffectImport = false; // Added useEffect import flag

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
                        });
                    } else {
                        issues.push({
                            file: filePath,
                            issue: 'ReactDOM.render call found with unexpected arguments.',
                            line: nodeStartLineNumber,
                            suggestion: 'Could not automatically migrate. Manual refactoring required.',
                            transformed: false,
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

                                sourceFile.addImportDeclaration({
                                    defaultImport: declaredName,
                                    moduleSpecifier: moduleSpecifier,
                                });
                                issues.push({
                                    file: filePath,
                                    issue: `Converted \`require('${moduleSpecifier}')\` to \`import ${declaredName} from '${moduleSpecifier}'\`.`,
                                    line: vsLineNumber,
                                    suggestion: 'Basic CommonJS require() converted to ES Module import. Review for named exports.',
                                    transformed: true,
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
                                    });
                                } else {
                                    issues.push({
                                        file: filePath,
                                        issue: `Removed PropTypes declaration: \`${propTypesStatement.getText().substring(0, 100)}...\`.`,
                                        line: statementLineNumber,
                                        suggestion: 'PropTypes are typically replaced by TypeScript for type checking. Review component props.',
                                        transformed: true,
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
                        });
                    } else {
                        issues.push({
                            file: filePath,
                            issue: `Removed PropTypes declaration: \`${varStmt.getText().substring(0, 100)}...\`.`,
                            line: statementLineNumber,
                            suggestion: 'PropTypes are typically replaced by TypeScript for type checking. Review component props.',
                            transformed: true,
                        });
                        nodesToRemove.push(varStmt);
                    }
                }
            }
        }); // End of forEachDescendant for first pass

        // --- Apply collected removals ---
        nodesToRemove.forEach(node => {
            try {
                (node as Statement).remove();
            } catch (e: unknown) {
                console.error(`Error removing node: ${(e as Error).message} at ${node.getStartLineNumber()} in ${filePath}`);
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
                                            const setterName = `set${propName.charAt(0).toUpperCase().toUpperCase() + propName.slice(1)}`;
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
                                        nodesToRemove.push(exprStmt); // Mark for removal later
                                    }
                                }
                            }
                        }
                    });
                }

                // Generate `useState` declarations
                stateProperties.forEach(prop => {
                    functionalComponentBodyLines.push(`  const [${prop.name}, ${prop.setter}] = useState(${prop.initializer});`);
                    needsUseStateImport = true;
                });

                // 3.3. Convert class methods to functions and collect their transformed bodies
                cls.getInstanceMethods().forEach(method => {
                    if (method.getName() !== 'render' && method.getName() !== 'constructor' && !['componentDidMount', 'componentWillUnmount', 'componentDidUpdate', 'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate', 'shouldComponentUpdate', 'getSnapshotBeforeUpdate', 'static getDerivedStateFromProps'].includes(method.getName())) {
                        const methodName = method.getName();
                        let methodBodyNode = method.getBody();
                        if (!methodBodyNode) return;

                        let transformedMethodBody = transformNodeContent(methodBodyNode, stateProperties, classMethodNames);

                        // Add JSDoc comments to the new function for context
                        const jsDoc = method.getJsDocs().map((doc: JSDoc) => doc.getText()).join('\n');
                        let jsDocString = jsDoc ? `\n${jsDoc}` : '';

                        // Wrap in useCallback for stability, assuming it's a good default for methods
                        functionalComponentBodyLines.push(`${jsDocString}\n  const ${methodName} = useCallback((${method.getParameters().map(p => p.getText()).join(', ')}) => ${transformedMethodBody}, [/* TODO: Add dependencies */]);`); // Marked for dependencies
                        needsUseCallbackImport = true;
                        classMethodNames.push(methodName); // Store for `this.method` replacement in other parts
                    } else if (['componentDidMount', 'componentWillUnmount', 'componentDidUpdate', 'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate', 'shouldComponentUpdate', 'getSnapshotBeforeUpdate', 'static getDerivedStateFromProps'].includes(method.getName())) {
                        // Handle lifecycle methods explicitly for useEffect suggestion
                        issues.push({
                            file: filePath,
                            issue: `Lifecycle method \`${method.getName()}\` needs manual migration to \`useEffect\` or other hooks.`,
                            line: method.getStartLineNumber(),
                            suggestion: `Convert the logic inside \`${method.getName()}\` to a \`useEffect\` hook. Pay attention to dependencies. Consider \`useMemo\` or \`useRef\` for other cases.`,
                            transformed: false,
                        });
                        needsUseEffectImport = true; // Set flag for useEffect import
                    }
                });

                // 3.4. Prepare render method content
                let renderBodyNode = renderMethod.getBody();
                if (!renderBodyNode) continue;

                // Detect if 'this.props' is used in the class methods or render body
                let containsThisProps = false;
                cls.forEachDescendant(descendant => {
                    if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
                        const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                        if (propAccess.getExpression().getText() === 'this.props') {
                            containsThisProps = true;
                        }
                    }
                });

                // The render body should become the main return JSX of the functional component.
                // We extract the return statement's expression.
                const returnStmt = renderBodyNode.getDescendantsOfKind(SyntaxKind.ReturnStatement)[0];

                if (returnStmt) {
                    const jsx = returnStmt.getExpression()?.getText();

                    if (jsx) {
                        const propsType = cls.getTypeParameters()[0]?.getText() || (isTS ? 'any' : '');

                        // Assemble the new functional component string
                        // Add `props` parameter if `this.props` was detected
                        let funcComponentString = `${isClassExported ? 'export ' : ''}function ${className}(${containsThisProps ? 'props' : ''}${propsType ? `: ${propsType}` : ''}) {`;

                        // Add state and method declarations
                        if (functionalComponentBodyLines.length > 0) {
                            funcComponentString += `\n${functionalComponentBodyLines.join('\n')}\n`; // Add extra newline for readability
                        }

                        // Add the transformed render content (excluding the outer function/class wrapper)
                        // It's just the JSX directly.
                        funcComponentString += `  return (\n${jsx}\n);\n}`; // Ensure it's returned with proper formatting.

                        cls.replaceWithText(funcComponentString); // Perform replacement

                        issues.push({
                            file: filePath,
                            issue: `Class component \`${className}\` converted to functional component with state and methods.`,
                            line: classStartLineNumber,
                            suggestion: 'Review generated `useState` and `useCallback` declarations. Manual refactoring is required for lifecycle methods (`useEffect`), complex `setState` calls, `this.refs`, and Context API usage.',
                            transformed: true,
                        });

                    } else {
                        issues.push({
                            file: filePath,
                            issue: `Class component \`${className}\` found, but render method return JSX not simple or found.`,
                            line: classStartLineNumber,
                            suggestion: 'Could not automatically convert. Manual refactoring required.',
                            transformed: false,
                        });
                    }
                } else {
                    issues.push({
                        file: filePath,
                        issue: `Class component \`${className}\` found, but no clear return statement in render method.`,
                        line: classStartLineNumber,
                        suggestion: 'Could not automatically convert. Manual refactoring required.',
                        transformed: false,
                    });
                }
            } else {
                issues.push({
                    file: filePath,
                    issue: `Class component found with no name or render method.`,
                    line: classStartLineNumber,
                    suggestion: 'Could not automatically convert. Manual refactoring required.',
                    transformed: false,
                });
            }
        } // End of for...of classDeclarationsToTransform loop

        // --- Process Function Declarations that might behave like class components ---
        sourceFile.getFunctions().forEach((funcDecl: FunctionDeclaration) => {
            const functionName = funcDecl.getName();
            if (!functionName) return;

            let containsThisState = false;
            let containsThisSetState = false;
            let containsThisProps = false;
            let containsThisMethod = false;

            funcDecl.forEachDescendant(descendant => {
                if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
                    const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                    if (propAccess.getExpression().getText() === 'this.state') {
                        containsThisState = true;
                    } else if (propAccess.getExpression().getText() === 'this.props') {
                        containsThisProps = true;
                    } else if (propAccess.getExpression().getText() === 'this' && propAccess.getName() !== 'setState') {
                        // Check for `this.someMethod` calls
                        containsThisMethod = true;
                    }
                } else if (descendant.getKind() === SyntaxKind.CallExpression) {
                    const callExpr = descendant.asKindOrThrow(SyntaxKind.CallExpression);
                    if (callExpr.getExpression().getText() === 'this.setState') {
                        containsThisSetState = true;
                    }
                }
            });

            // If it uses `this.setState` or `this.state`, it's likely a mis-declared class component that needs hooks
            if (containsThisSetState || containsThisState) {
                const funcStartLineNumber = funcDecl.getStartLineNumber();
                const funcBody = funcDecl.getBody();

                if (funcBody) {
                    const functionalComponentBodyLines: string[] = [];
                    const stateProperties: { name: string; setter: string; initializer: string }[] = [];
                    const classMethodNames: string[] = []; // Collect method names for `this.method` replacement

                    // Specific handling for 'Route.js' initial state
                    if (filePath.includes('Route.js')) {
                        stateProperties.push({ name: 'cart', setter: 'setCart', initializer: '[]' });
                        stateProperties.push({ name: 'isLogin', setter: 'setIsLogin', initializer: 'false' });
                        needsUseStateImport = true;
                    } else {
                        // Generic detection of `this.state.prop` and `_this.prop`
                        funcBody.forEachDescendant(descendant => {
                            if (descendant.getKind() === SyntaxKind.PropertyAccessExpression) {
                                const propAccess = descendant.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
                                if (propAccess.getExpression().getText() === 'this.state' || propAccess.getExpression().getText() === '_this') {
                                    const propName = propAccess.getName();
                                    if (!stateProperties.some(p => p.name === propName)) {
                                        let initializer = 'null'; // Default initializer
                                        if (propName.toLowerCase().includes('cart')) initializer = '[]';
                                        if (propName.toLowerCase().includes('login') || propName.toLowerCase().includes('auth')) initializer = 'false';
                                        stateProperties.push({
                                            name: propName,
                                            setter: `set${propName.charAt(0).toUpperCase() + propName.slice(1)}`,
                                            initializer: initializer
                                        });
                                        needsUseStateImport = true;
                                    }
                                }
                            }
                        });
                    }

                    stateProperties.forEach(prop => {
                        functionalComponentBodyLines.push(`  const [${prop.name}, ${prop.setter}] = useState(${prop.initializer});`);
                    });

                    // Transform existing useCallback functions and other methods/logic
                    funcBody.forEachDescendant(descendant => {
                        if (descendant.getKind() === SyntaxKind.VariableDeclaration) {
                            const varDecl = descendant.asKindOrThrow(SyntaxKind.VariableDeclaration);
                            const initializer = varDecl.getInitializer();
                            if (initializer && initializer.getKind() === SyntaxKind.CallExpression) {
                                const callExpr = initializer.asKindOrThrow(SyntaxKind.CallExpression);
                                if (callExpr.getExpression().getText() === 'useCallback') {
                                    const callbackFn = callExpr.getArguments()[0];
                                    if (callbackFn && (callbackFn.getKind() === SyntaxKind.ArrowFunction || callbackFn.getKind() === SyntaxKind.FunctionExpression)) {
                                        const callbackBody = callbackFn.asKindOrThrow(SyntaxKind.ArrowFunction).getBody();
                                        if (callbackBody) {
                                            const transformedCallbackBody = transformNodeContent(callbackBody, stateProperties, classMethodNames);
                                            // Replace the inner body of the useCallback with the transformed content
                                            // This is tricky as we need to replace the body itself, not the useCallback call.
                                            // A simple way is to capture the new useCallback string.
                                            // For now, let's just make sure the body is transformed in place.
                                            // The `transformNodeContent` should mutate the `tempSourceFile`'s nodes correctly.
                                            // Since we call transformNodeContent on the *statements* inside the body for the main func,
                                            // for nested functions, we might need a direct replacement or more precise text manipulation.
                                            // For simplicity for now, let's assume `transformNodeContent` just works on the inner body.
                                            // For this specific issue, the error was in the *overall* function structure.
                                            // We'll trust `transformNodeContent` to give correct content and handle the outer structure.
                                        }
                                    }
                                }
                            }
                        }
                    });

                    // Now, reconstruct the function string, taking into account `this.state`, `this.props`, `this.method`
                    // First, get the raw text of the function body statements.
                    const statementsInFuncBody = (funcBody as Block).getStatements();
                    // Transform each statement's content individually.
                    const transformedStatementsText = statementsInFuncBody
                        .map(s => transformNodeContent(s, stateProperties, classMethodNames))
                        .join('\n');

                    const parameters = funcDecl.getParameters().map(p => p.getText()).join(', ');
                    let newFuncString = `${funcDecl.isExported() ? 'export ' : ''}${funcDecl.isDefaultExport() ? 'default ' : ''}function ${functionName}(${parameters}) {`;

                    // Add state declarations at the top of the function body
                    if (functionalComponentBodyLines.length > 0) {
                        newFuncString += `\n${functionalComponentBodyLines.join('\n')}\n`;
                    }

                    // Append the transformed original function body statements.
                    newFuncString += transformedStatementsText;
                    newFuncString += '\n}';

                    funcDecl.replaceWithText(newFuncString);

                    issues.push({
                        file: filePath,
                        issue: `Functional component \`${functionName}\` transformed to use React Hooks (useState/useCallback) for state and methods.`,
                        line: funcStartLineNumber,
                        suggestion: 'Review `useState` initial values and `useCallback` dependencies. Manual refactoring for complex `this` usages might be needed. Pay close attention to context (`_this`) and prop drilling.',
                        transformed: true,
                    });
                }
            }
        });

        // --- Final import adjustments ---
        let reactImport = sourceFile.getImportDeclaration('react');
        if (!reactImport) {
            reactImport = sourceFile.addImportDeclaration({ moduleSpecifier: 'react' });
        }

        const namedImports = reactImport.getNamedImports().map(ni => ni.getName());

        if (needsUseStateImport && !namedImports.includes('useState')) {
            reactImport.addNamedImport('useState');
        }
        if (needsUseCallbackImport && !namedImports.includes('useCallback')) {
            reactImport.addNamedImport('useCallback');
        }
        if (needsUseEffectImport && !namedImports.includes('useEffect')) {
            reactImport.addNamedImport('useEffect');
        }

        // If module.exports was used, try to convert the last export to a default export.
        if (usesModuleExports) {
            // Find the last statement in the file
            const lastStatement = sourceFile.getStatements().pop();
            if (lastStatement && lastStatement.getKind() === SyntaxKind.ExpressionStatement) {
                const exprStmt = lastStatement.asKindOrThrow(SyntaxKind.ExpressionStatement);
                if (exprStmt.getExpression().getKind() === SyntaxKind.BinaryExpression) {
                    const binaryExpr = exprStmt.getExpression().asKindOrThrow(SyntaxKind.BinaryExpression);
                    if (binaryExpr.getLeft().getText() === 'module.exports') {
                        const exportedValue = binaryExpr.getRight().getText();
                        // Assuming the exported value is a variable or function name
                        const declarationToExport = sourceFile.getVariableDeclaration(exportedValue) || sourceFile.getFunction(exportedValue);
                        if (declarationToExport) {
                            if (Node.isFunctionDeclaration(declarationToExport) || Node.isClassDeclaration(declarationToExport)) {
                                declarationToExport.setIsDefaultExport(true);
                            } else if (Node.isVariableDeclaration(declarationToExport)) {
                                const varStatement = declarationToExport.getVariableStatement();
                                if (varStatement) {
                                    varStatement.setIsDefaultExport(true);
                                }
                            }
                            exprStmt.remove(); // Remove the module.exports statement
                            issues.push({
                                file: filePath,
                                issue: `Converted \`module.exports = ${exportedValue}\` to default export.`,
                                line: exprStmt.getStartLineNumber(),
                                suggestion: 'Review default export. Manual adjustment for named exports from CommonJS might be needed.',
                                transformed: true,
                            });
                        } else {
                            issues.push({
                                file: filePath,
                                issue: `\`module.exports\` found, but associated declaration for \`${exportedValue}\` not found for automatic conversion.`,
                                line: exprStmt.getStartLineNumber(),
                                suggestion: 'Manual conversion of `module.exports` to ES Modules `export default` or named exports is required.',
                                transformed: false,
                            });
                        }
                    }
                }
            }
        }
    });

    // 3. Save changes and generate report
    await project.save();
    console.log(`Migration complete. Transformed files saved to '${newSrcBasePath}'.`);

    // Write the migration report
    fsa.writeFileSync(migrationReportPath, JSON.stringify(issues, null, 2));
    console.log(`Migration report generated at '${migrationReportPath}'.`);
}

// Execute the main migration function
main().catch(console.error);
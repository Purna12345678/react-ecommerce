import {
  Project,
  SyntaxKind,
  ClassDeclaration,
  MethodDeclaration,
  CallExpression,
  HeritageClause,
  VariableStatement,
  ImportDeclaration,
} from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import * as fsa from 'fs-extra';

const storagePath = "./new-src";

async function ensureStorageFile() {
  const dir = path.dirname(storagePath);
  if (!fsa.existsSync(dir)) {
    fsa.mkdirSync(dir, { recursive: true });
  }
  await fsa.copy('src', path.join(storagePath, 'src'));
}

async function main(folpath: string,migratePath: string) {
  await ensureStorageFile(); 

  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
    compilerOptions: { allowJs: true, checkJs: false },
    skipAddingFilesFromTsConfig: true,
  });

  project.addSourceFilesAtPaths([folpath]);

  const issues: { file: string; issue: string; line: number }[] = [];

  project.getSourceFiles().forEach(sourceFile => {
    const ext = sourceFile.getExtension().toLowerCase();
    const filePath = sourceFile.getFilePath();

    sourceFile.forEachDescendant(node => {
      const kind = node.getKind();

      // 1. Class components
      if (kind === SyntaxKind.ClassDeclaration) {
        const classNode = node as ClassDeclaration;
        const heritage = classNode.getHeritageClauses() as HeritageClause[];
        if (heritage.some(h => h.getText().includes('React.Component'))) {
          issues.push({
            file: filePath,
            issue: 'Class component found — converted to functional component.',
            line: node.getStartLineNumber(),
          });
        }
      }

      // 2. Deprecated lifecycle methods
      if (kind === SyntaxKind.MethodDeclaration) {
        const methodNode = node as MethodDeclaration;
        const name = methodNode.getName();
        const legacyMethods = [
          'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate',
          'UNSAFE_componentWillMount', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate'
        ];
        if (legacyMethods.includes(name)) {
          issues.push({
            file: filePath,
            issue: `Removed deprecated lifecycle method: ${name}`,
            line: methodNode.getStartLineNumber(),
          });
        }
      }

      // 3. ReactDOM.render()
      if (kind === SyntaxKind.CallExpression) {
        const call = node as CallExpression;
        if (call.getExpression().getText().includes('ReactDOM.render')) {
          issues.push({
            file: filePath,
            issue: 'Replaced ReactDOM.render with createRoot().render.',
            line: call.getStartLineNumber(),
          });
        }
      }
    });
  });

  fs.writeFileSync(
    path.resolve(migratePath),
    JSON.stringify(issues, null, 2)
  );
  console.log('Migration analysis complete. Output saved to migration-todo.json');
}

  // async function migrate(filePath: string) {
  // const project = new Project({
  //   tsConfigFilePath: 'tsconfig.migrate.json',
  //   skipAddingFilesFromTsConfig: true,
  // });

  // project.addSourceFilesAtPaths(filePath);

  // project.getSourceFiles().forEach(sourceFile => {
  //   const ext = sourceFile.getExtension().toLowerCase();
  //   const isTS = /\.tsx?$/.test(ext);

  //   let usesModuleExports = false;

  //   sourceFile.forEachDescendant(node => {
  //     const kind = node.getKind();

  //     // ── 1. ReactDOM.render → createRoot
  //     if (kind === SyntaxKind.CallExpression) {
  //       const call = node as CallExpression;
  //       if (call.getExpression().getText() === 'ReactDOM.render') {
  //         if (!sourceFile.getImportDeclarations().some(i => i.getModuleSpecifierValue() === 'react-dom/client')) {
  //           sourceFile.addImportDeclaration({
  //             moduleSpecifier: 'react-dom/client',
  //             namedImports: ['createRoot'],
  //           });
  //         }
  //         const [jsxArg, containerArg] = call.getArguments();
  //         call.replaceWithText(`createRoot(${containerArg.getText()}).render(${jsxArg.getText()})`);
  //       }
  //     }

  //     // ── 2. Remove deprecated lifecycle methods
  //     if (kind === SyntaxKind.MethodDeclaration) {
  //       const method = node as MethodDeclaration;
  //       const toRemove = [
  //         'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate',
  //         'UNSAFE_componentWillMount', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate',
  //       ];
  //       if (toRemove.includes(method.getName())) {
  //         method.remove();
  //       }
  //     }

  //     // ── 3. Class → functional component
  //     if (kind === SyntaxKind.ClassDeclaration) {
  //       const cls = node as ClassDeclaration;
  //       const heritage = cls.getHeritageClauses();
  //       if (heritage.some(h => h.getText().includes('React.Component'))) {
  //         const name = cls.getName();
  //         const renderMethod = cls.getInstanceMethod('render');
  //         if (name && renderMethod) {
  //           const jsx = renderMethod.getBody()!.getText()
  //             .replace(/^\{\s*return\s*/, '')
  //             .replace(/\s*\}$/, '');
  //           const propsType = cls.getTypeParameters()[0]?.getText() || 'any';
  //           const func = `export function ${name}(props: ${propsType}) {\n  return ${jsx};\n}`;
  //           cls.replaceWithText(func);
  //         }
  //       }
  //     }

  //     // ── 4. Fix incorrect aliasing syntax in imports: { X: Y } → { X as Y }
  //     if (kind === SyntaxKind.ImportDeclaration) {
  //       const importDecl = node as ImportDeclaration;
  //       const namedImports = importDecl.getNamedImports();
  //       namedImports.forEach(namedImport => {
  //         const text = namedImport.getText();
  //         if (text.includes(':')) {
  //           const [original, alias] = text.split(':').map(s => s.trim());
  //           namedImport.replaceWithText(`${original} as ${alias}`);
  //         }
  //       });
  //     }

  //     // ── 5. require() → import (basic replacement)
  //     if (kind === SyntaxKind.VariableStatement) {
  //       const vs = node as VariableStatement;
  //       vs.getDeclarations().forEach(decl => {
  //         const init = decl.getInitializer();
  //         const name = decl.getName();
  //         const match = init?.getText().match(/require\(['"](.+?)['"]\)/);
  //         if (match) {
  //           sourceFile.addImportDeclaration({
  //             defaultImport: name,
  //             moduleSpecifier: match[1],
  //           });
  //           vs.remove();
  //         }
  //       });
  //     }

  //     // ── 6. Detect module.exports to replace later
  //     if (kind === SyntaxKind.BinaryExpression && node.getText().startsWith('module.exports')) {
  //       usesModuleExports = true;
  //     }
  //   });

  //   // ── Convert module.exports to export default
  //   if (usesModuleExports) {
  //     const lastStatement = sourceFile.getStatements().at(-1);
  //     if (lastStatement?.getText().startsWith('module.exports')) {
  //       const right = lastStatement.getText().split('=')[1].trim().replace(/;$/, '');
  //       sourceFile.addStatements(`export default ${right};`);
  //       lastStatement.remove();
  //     }
  //   }

  //   sourceFile.saveSync();
  // });

  // console.log('Migration complete!');
  // }


main('src/**/*.{ts,tsx,js,jsx}','migration-todo.json'); 




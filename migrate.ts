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
import * as path from 'path';

const project = new Project({
  tsConfigFilePath: 'tsconfig.migrate.json',
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFilesAtPaths('new-src/src/**/*.{ts,tsx,js,jsx}');

project.getSourceFiles().forEach(sourceFile => {
  const ext = sourceFile.getExtension().toLowerCase();
  const isTS = /\.tsx?$/.test(ext);

  let usesModuleExports = false;

  sourceFile.forEachDescendant(node => {
    const kind = node.getKind();

    // ── 1. ReactDOM.render → createRoot
    if (kind === SyntaxKind.CallExpression) {
      const call = node as CallExpression;
      if (call.getExpression().getText() === 'ReactDOM.render') {
        if (!sourceFile.getImportDeclarations().some(i => i.getModuleSpecifierValue() === 'react-dom/client')) {
          sourceFile.addImportDeclaration({
            moduleSpecifier: 'react-dom/client',
            namedImports: ['createRoot'],
          });
        }
        const [jsxArg, containerArg] = call.getArguments();
        call.replaceWithText(`createRoot(${containerArg.getText()}).render(${jsxArg.getText()})`);
      }
    }

    // ── 2. Remove deprecated lifecycle methods
    if (kind === SyntaxKind.MethodDeclaration) {
      const method = node as MethodDeclaration;
      const toRemove = [
        'componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate',
        'UNSAFE_componentWillMount', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate',
      ];
      if (toRemove.includes(method.getName())) {
        method.remove();
      }
    }

    // 3. Class → functional component (safe conversion)
if (kind === SyntaxKind.ClassDeclaration) {
  const cls = node as ClassDeclaration;
  const heritage = cls.getHeritageClauses();
  if (heritage.some(h => h.getText().includes('React.Component'))) {
    const name = cls.getName();
    const renderMethod = cls.getInstanceMethod('render');
    if (name && renderMethod) {
      const returnStmt = renderMethod.getBodyOrThrow()
        .getDescendantsOfKind(SyntaxKind.ReturnStatement)[0];

      if (!returnStmt) return;

      const jsx = returnStmt.getExpression()?.getText() || '<div />';

      const propsType = cls.getTypeParameters()[0]?.getText() || 'any';

      const func = `export function ${name}(props: ${propsType}) {
  return ${jsx};
}`;
      cls.replaceWithText(func);
    }
  }
}

    
    


    // ── 4. Fix incorrect aliasing syntax in imports: { X: Y } → { X as Y }
    if (kind === SyntaxKind.ImportDeclaration) {
      const importDecl = node as ImportDeclaration;
      const namedImports = importDecl.getNamedImports();
      namedImports.forEach(namedImport => {
        const text = namedImport.getText();
        if (text.includes(':')) {
          const [original, alias] = text.split(':').map(s => s.trim());
          namedImport.replaceWithText(`${original} as ${alias}`);
        }
      });
    }

    // ── 5. require() → import (basic replacement)
    if (kind === SyntaxKind.VariableStatement) {
      const vs = node as VariableStatement;
      vs.getDeclarations().forEach(decl => {
        const init = decl.getInitializer();
        const name = decl.getName();
        const match = init?.getText().match(/require\(['"](.+?)['"]\)/);
        if (match) {
          sourceFile.addImportDeclaration({
            defaultImport: name,
            moduleSpecifier: match[1],
          });
          vs.remove();
        }
      });
    }

    // ── 6. Detect module.exports to replace later
    if (kind === SyntaxKind.BinaryExpression && node.getText().startsWith('module.exports')) {
      usesModuleExports = true;
    }
  });

  // ── Convert module.exports to export default
  if (usesModuleExports) {
    const lastStatement = sourceFile.getStatements().at(-1);
    if (lastStatement?.getText().startsWith('module.exports')) {
      const right = lastStatement.getText().split('=')[1].trim().replace(/;$/, '');
      sourceFile.addStatements(`export default ${right};`);
      lastStatement.remove();
    }
  }

  sourceFile.saveSync();
});

console.log('Migration complete!');

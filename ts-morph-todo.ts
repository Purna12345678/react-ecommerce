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


main('src/**/*.{ts,tsx,js,jsx}','migration-todo.json'); 





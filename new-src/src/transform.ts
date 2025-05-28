// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
export default function transformer(file: any, api: any, options: any) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const attributesToRemove = ['isDisabled', 'isLoading', 'isActive'];

  // Helper to get attribute name safely
  function getAttributeName(node: any) {
    if (node.type === 'JSXIdentifier') {
      return node.name;
    } else if (node.type === 'JSXNamespacedName') {
      return node.namespace.name + ':' + node.name.name;
    }
    return null;
  }

  // 1. Remove JSX attributes
  const jsxAttributes = root.find(j.JSXAttribute)
    .filter((path: any) => {
      const attrName = getAttributeName(path.node.name);
      return attributesToRemove.includes(attrName);
    });

  jsxAttributes.remove();

  // 2. Add `import React from 'react'` if not already imported
  const reactImports = root.find(j.ImportDeclaration, {
    source: { value: 'react' },
  });

  if (reactImports.size() === 0) {
    const firstImport = root.find(j.ImportDeclaration).at(0);
    const newImport = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('React'))],
      j.literal('react')
    );
    if (firstImport.size() > 0) {
      j(firstImport.get()).insertBefore(newImport);
    } else {
      root.get().node.program.body.unshift(newImport);
    }
  }

  // 3. Add `baz` to all imports from 'my-module'
  const myModuleImports = root.find(j.ImportDeclaration, {
    source: { value: 'my-module' },
  });

  myModuleImports.forEach((path: any) => {
    const hasBaz = path.node.specifiers.some(
      (spec: any) => spec.imported && spec.imported.name === 'baz'
    );
    if (!hasBaz) {
      path.node.specifiers.push(j.importSpecifier(j.identifier('baz')));
    }
  });

  return root.toSource(options.printOptions || { quote: 'single' });
}

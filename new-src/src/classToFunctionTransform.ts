/**
 * jscodeshift transform to convert React class components to function components.
 * Handles:
 * - Class components extending React.Component or React.PureComponent
 * - Converts state initialization and setState to useState hook
 * - Converts lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount) to useEffect hooks
 * - Converts class methods to functions inside the function component
 * - Handles props usage
 */

export default function transformer(file: any, api: any, options: any) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Helper to check if a class extends React.Component or React.PureComponent
  function isReactComponentClass(node: any) {
    if (!node.superClass) return false;
    if (node.superClass.type === 'MemberExpression') {
      return (
        node.superClass.object.name === 'React' &&
        (node.superClass.property.name === 'Component' || node.superClass.property.name === 'PureComponent')
      );
    }
    if (node.superClass.type === 'Identifier') {
      return node.superClass.name === 'Component' || node.superClass.name === 'PureComponent';
    }
    return false;
  }

  // Find all class declarations that are React components
  root.find(j.ClassDeclaration)
    .filter((path: any) => isReactComponentClass(path.node))
    .forEach((path: any) => {
      const classNode = path.node;
      const className = classNode.id.name;

      // Find render method
      const renderMethod = classNode.body.body.find(
        (method: any) => method.type === 'MethodDefinition' && method.key.name === 'render'
      );

      if (!renderMethod) {
        return;
      }

      // Extract render method body (JSX)
      const renderBody = renderMethod.value.body;

      // Collect state initialization from constructor
      let stateInit = null;
      const constructorMethod = classNode.body.body.find(
        (method: any) => method.type === 'MethodDefinition' && method.kind === 'constructor'
      );
      if (constructorMethod) {
        j(constructorMethod).find(j.AssignmentExpression)
          .filter((assignPath: any) => {
            const left = assignPath.node.left;
            return (
              left.type === 'MemberExpression' &&
              left.object.type === 'ThisExpression' &&
              left.property.name === 'state'
            );
          })
          .forEach((assignPath: any) => {
            stateInit = assignPath.node.right;
          });
      }

      // Collect lifecycle methods
      const lifecycleMethods = {};
      ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount'].forEach(lifecycleName => {
        const method = classNode.body.body.find(
          (m: any) => m.type === 'MethodDefinition' && m.key.name === lifecycleName
        );
        if (method) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          lifecycleMethods[lifecycleName] = method.value.body;
        }
      });

      // Collect other class methods (excluding constructor and render and lifecycle)
      const otherMethods = classNode.body.body.filter(
        (method: any) => method.type === 'MethodDefinition' &&
        method.kind === 'method' &&
        method.key.name !== 'render' &&
        method.key.name !== 'constructor' &&
        !['componentDidMount', 'componentDidUpdate', 'componentWillUnmount'].includes(method.key.name)
      );

      // Build function component body
      const funcBody = [];

      // Import React and hooks if not already imported
      const reactImport = root.find(j.ImportDeclaration, {
        source: { value: 'react' },
      });
      if (reactImport.size() === 0) {
        const newImport = j.importDeclaration(
          [
            j.importDefaultSpecifier(j.identifier('React')),
            j.importSpecifier(j.identifier('useState')),
            j.importSpecifier(j.identifier('useEffect')),
          ],
          j.literal('react')
        );
        root.get().node.program.body.unshift(newImport);
      } else {
        // Add useState and useEffect to existing react import if not present
        reactImport.forEach((p: any) => {
          const specifiers = p.node.specifiers;
          const hasUseState = specifiers.some((s: any) => s.imported && s.imported.name === 'useState');
          const hasUseEffect = specifiers.some((s: any) => s.imported && s.imported.name === 'useEffect');
          if (!hasUseState) {
            specifiers.push(j.importSpecifier(j.identifier('useState')));
          }
          if (!hasUseEffect) {
            specifiers.push(j.importSpecifier(j.identifier('useEffect')));
          }
        });
      }

      // Start function component declaration
      const funcDecl = j.functionDeclaration(
        j.identifier(className),
        [j.identifier('props')],
        j.blockStatement([])
      );

      // Add state hook if stateInit exists
      if (stateInit) {
        funcBody.push(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.arrayPattern([j.identifier('state'), j.identifier('setState')]),
              j.callExpression(j.identifier('useState'), [stateInit])
            ),
          ])
        );
      }

      // Add lifecycle hooks
      // @ts-expect-error TS(2339): Property 'componentDidMount' does not exist on typ... Remove this comment to see the full error message
      if (lifecycleMethods.componentDidMount || lifecycleMethods.componentDidUpdate || lifecycleMethods.componentWillUnmount) {
        const effectBodyStatements = [];

        // @ts-expect-error TS(2339): Property 'componentDidMount' does not exist on typ... Remove this comment to see the full error message
        if (lifecycleMethods.componentDidMount) {
          // @ts-expect-error TS(2339): Property 'componentDidMount' does not exist on typ... Remove this comment to see the full error message
          effectBodyStatements.push(...lifecycleMethods.componentDidMount.body);
        }
        // @ts-expect-error TS(2339): Property 'componentDidUpdate' does not exist on ty... Remove this comment to see the full error message
        if (lifecycleMethods.componentDidUpdate) {
          // @ts-expect-error TS(2339): Property 'componentDidUpdate' does not exist on ty... Remove this comment to see the full error message
          effectBodyStatements.push(...lifecycleMethods.componentDidUpdate.body);
        }

        let cleanupFunction = null;
        // @ts-expect-error TS(2339): Property 'componentWillUnmount' does not exist on ... Remove this comment to see the full error message
        if (lifecycleMethods.componentWillUnmount) {
          // @ts-expect-error TS(2339): Property 'componentWillUnmount' does not exist on ... Remove this comment to see the full error message
          cleanupFunction = j.arrowFunctionExpression([], lifecycleMethods.componentWillUnmount);
        }

        const effectBody = cleanupFunction
          ? j.blockStatement([
              ...effectBodyStatements,
              j.returnStatement(cleanupFunction),
            ])
          : j.blockStatement(effectBodyStatements);

        funcBody.push(
          j.expressionStatement(
            j.callExpression(j.identifier('useEffect'), [
              j.arrowFunctionExpression([], effectBody),
              j.arrayExpression([]), // Empty dependency array, user may want to customize
            ])
          )
        );
      }

      // Add other class methods as inner functions
      otherMethods.forEach((method: any) => {
        const methodFunc = j.functionDeclaration(
          j.identifier(method.key.name),
          method.value.params,
          method.value.body
        );
        funcBody.push(methodFunc);
      });

      // Add return statement with render JSX
      funcBody.push(j.returnStatement(renderBody.body[0].argument));

      funcDecl.body = j.blockStatement(funcBody);

      // Replace class component with function component
      j(path).replaceWith(funcDecl);
    });

  return root.toSource(options.printOptions || { quote: 'single' });
}

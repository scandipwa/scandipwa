/* eslint-disable prefer-destructuring */

const namespaceExtractor = /@namespace +(?<namespace>[^ ]+)/;

const extractNamespaceFromComments = (comments = []) => comments.reduce(
    (acquired, testable) => {
        if (acquired) {
            return acquired;
        }

        const { groups: { namespace } = {} } = testable.value.match(namespaceExtractor) || {};
        return namespace;
    },
    ''
);

module.exports = ({ types, traverse }) => ({
    name: 'comment-middlewares',
    visitor: {
        /* Transform leading comments of anonymous arrow functions */
        ArrowFunctionExpression: (path) => {
            const {
                node,
                node: { leadingComments }
            } = path;

            if (!leadingComments) {
                return;
            }

            const namespace = extractNamespaceFromComments(leadingComments);
            if (!namespace) {
                return;
            }

            path.replaceWith(
                types.callExpression(
                    types.identifier('middleware'),
                    [node, types.stringLiteral(namespace)]
                )
            );
        },

        /* Transform all encounters of decorated declaree except of declaration itself */
        'VariableDeclaration|FunctionDeclaration|ClassDeclaration|ExportNamedDeclaration': (path, state) => {
            const { node } = path;
            const { leadingComments } = node;
            if (!leadingComments) {
                return;
            }

            const namespace = extractNamespaceFromComments(leadingComments);
            if (!namespace) {
                return;
            }

            const declarationNode = ['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(node.type)
                ? node.declaration
                : node;

            // eslint-disable-next-line fp/no-let
            let name;
            if (declarationNode.type === 'VariableDeclaration') {
                name = declarationNode.declarations[0].id.name;
            } else if (['FunctionDeclaration', 'ClassDeclaration'].includes(declarationNode.type)) {
                name = declarationNode.id.name;
            }

            // TODO move to pre-plugin
            const {
                file: { ast }
            } = state;

            traverse(ast, {
                Identifier(path) {
                    const { node } = path;

                    // If one of these conditions fulfills - return
                    if ([
                        types.isDeclaration(path.parent) && !types.isExportDefaultDeclaration(path.parent),
                        types.isCallExpression(path.parent) && path.parent.callee.name === 'middleware',
                        path.parent.type === 'VariableDeclarator',
                        node.name !== name
                    ].filter(Boolean).length) {
                        return;
                    }

                    // Else middleware the node with corresponding namespace.
                    path.replaceWith(
                        types.callExpression(types.identifier('middleware'), [
                            path.node,
                            types.stringLiteral(namespace)
                        ])
                    );
                }
            });
        }
    }
});

const types = require('babel-types');

const namespaceExtractor = /@middleware +(?<namespace>[^ ]+)/;

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

module.exports = () => ({
    name: 'comment-middlewares',
    visitor: {
        ArrowFunctionExpression(path) {
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
        }
    }
});

const traverse = require("eslint-traverse");

function getIdentifierOccurrences(context, name) {
    const nodes = [];

    traverse(
        context,
        context.getSourceCode().ast,
        ({ node }) => {
            if (!node) {
                // if node is null, like in the code `const [, a] = b;`, then eslint-traverse crashes
                // skip null nodes
                return traverse.SKIP;
            }

            if (
                node.type !== 'Identifier'
                || node.name !== name
                || (node.parent && node.parent.type === 'ImportSpecifier')
            ) {
                return;
            }

            nodes.push(node);
        },
    );

    return nodes;
}

module.exports = {
    getIdentifierOccurrences,
};

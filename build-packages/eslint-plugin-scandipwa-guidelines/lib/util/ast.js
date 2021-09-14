const traverse = require("eslint-traverse");

function getIdentifierOccurrences(context, name) {
    const nodes = [];

    traverse(
        context,
        context.getSourceCode().ast,
        ({ node }) => {
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

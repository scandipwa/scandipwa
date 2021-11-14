/**
 * @fileoverview Forbid usage of empty PropTypes.shape
 * @author Tatiana Karamorina
 */
const isShapePropType = (node) => node.object.name === 'PropTypes' && node.property.name === 'shape';

module.exports = {
    meta: {
        docs: {
            description: 'Forbid usage of empty PropTypes.shape.',
            category: 'Coding standard',
            recommended: true
        }
    },
    create: (context) => ({
        MemberExpression(node) {
            if (isShapePropType(node)) {
                // Empty PropTypes.shape is forbidden (i.e. `PropTypes.shape` not even followed by curly braces)
                if (node.parent.arguments === undefined) {
                    context.report({
                        node: node.property,
                        message: `Empty PropTypes.shape is forbidden`
                    });
                }

                // PropTypes.shape with empty object as parameter is forbidden (i.e. `PropTypes.shape({})`)
                if (node.parent.arguments?.length === 1 && node.parent.arguments[0].properties?.length === 0) {
                    context.report({
                        node: node.property,
                        message: `PropTypes.shape with empty object as parameter is forbidden`
                    });
                }
            }
        }
    })
};

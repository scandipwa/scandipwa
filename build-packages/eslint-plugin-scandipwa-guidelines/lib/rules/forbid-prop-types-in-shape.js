/**
 * @fileoverview Forbid usage of empty PropTypes.shape
 * @author Tatiana Karamorina
 */

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
            function isShapePropType(node) {
                return node.object.name === 'PropTypes' && node.property.name === 'shape';
            }

            if (isShapePropType(node)) {
                // forbid `PropTypes.shape`
                if (node.parent.arguments === undefined) {
                    context.report({
                        node: node.property,
                        message: `Found empty PropTypes.shape`
                    });
                }

                // forbid `PropTypes.shape({})`
                if (node.parent.arguments?.length === 1 && node.parent.arguments[0].properties?.length === 0) {
                    context.report({
                        node: node.property,
                        message: `Found PropTypes.shape with empty object as parameter`
                    });
                }
            }
        }
    })
};

/**
 * @fileoverview Forbid arrow functions as class methods
 * @author Tatiana Karamorina
 */

module.exports = {
    meta: {
        docs: {
            description: 'Forbid arrow functions as class methods. Reason: they can\'t be overridden.',
            category: 'Coding standard',
            recommended: true
        }
    },
    create: (context) => ({
        ClassProperty(node) {
            if(node.value?.type === 'ArrowFunctionExpression') {
                context.report({
                    node: node.key,
                    message: `"${node.key.name}": arrow function is forbidden`
                });
            }
        }
    })
};

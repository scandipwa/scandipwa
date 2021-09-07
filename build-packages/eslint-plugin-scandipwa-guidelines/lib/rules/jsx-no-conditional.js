/**
 * @fileoverview Split your JSX into smaller functions, do not use conditional expressions in JSX
 * @author Alfreds Genkins
 */

module.exports = {
    meta: {
        docs: {
            description: 'Do not use conditional expressions to improve read-ability and complexity.',
            category: 'Coding standard',
            recommended: true,
        },
        fixable: 'code'
    },

    create: (context) => ({
        JSXExpressionContainer(node) {
            const {
                expression: {
                    type,
                    loc
                },
                parent: {
                    type: parentType
                }
            } = node;

            if (
                type !== 'ConditionalExpression'
                || parentType !== 'JSXElement'
            ) {
                return;
            }

            context.report({
                loc,
                message: 'Do not use conditional expressions in JSX.'
            });
        }
    }),
};

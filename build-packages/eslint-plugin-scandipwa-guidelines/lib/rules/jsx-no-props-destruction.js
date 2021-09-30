/**
 * @fileoverview Prevent JSX prop spreading
 * @author Alfreds Genkins
 */

const getIsValidCallExpression = (node) => {
    const {
        callee: {
            object: { type } = {},
            property: { name } = {}
        }
    } = node;

    return type === "ThisExpression" && name === "containerProps";
};

const getIsValidMemberExpression = (node) => {
    const {
        object: { type } = {},
        property: { name } = {}
    } = node;

    return type === "ThisExpression" && name === "containerFunctions";
};

module.exports = {
    meta: {
        docs: {
            description: 'Prevent JSX prop spreading',
            category: 'Coding standard',
            recommended: true,
        },
        fixable: 'code'
    },

    create: (context) => ({
        JSXSpreadAttribute(node) {
            const {
                argument,
                argument: { type }
            } = node;

            const validationMap = {
                // allow this.containerProps()
                CallExpression: getIsValidCallExpression,
                // allow this.containerFunctions
                MemberExpression: getIsValidMemberExpression
            };

            // expect those two rules, forbid everything else
            const validationFunction = validationMap[type] || (() => false);

            if (validationFunction(argument)) {
                return;
            }

            context.report({
                node,
                message: "Prop spreading is forbidden"
            });
        }
    }),
};

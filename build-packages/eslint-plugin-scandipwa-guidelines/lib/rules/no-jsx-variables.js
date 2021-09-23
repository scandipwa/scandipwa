/**
 * @fileoverview Setting JSX in state is not allowed
 * @author Alfreds Genkins
 */

const getName = (node) => {
    const {
        id: {
            name: varName = ''
        } = {},
        left: {
            property: {
                name: propName
            } = {}
        } = {}
    } = node;

    return varName || propName || '';
}

module.exports = {
    meta: {
        docs: {
            description: 'Prohibit assigning JSX to variables and object properties',
            category: 'Coding standard',
            recommended: false,
        },
        fixable: 'code',
    },
    create: (context) => ({
        VariableDeclarator(node) {
            const { init } = node;

            if (!init) {
                return;
            }

            const { type } = init;

            if (type !== 'JSXElement') {
                return;
            }

            context.report({
                node,
                message: 'Do not assign JSX to variables.',
            });
        },
        Property(node) {
            const { value: { type } = {} } = node;

            if (type !== 'JSXElement') {
                return;
            }

            const { parent: { parent } = {} } = node;

            if (parent) {
                const name = getName(parent);

                if (/(map|list)/.test(name.toLowerCase())) {
                    return;
                }
            }

            context.report({
                node: parent,
                message: 'Do not assign JSX to object properties.',
            });
        }
    })
};
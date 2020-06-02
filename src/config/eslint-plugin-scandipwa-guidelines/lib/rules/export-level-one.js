/**
 * @fileoverview Non-extensible components are not allowed.
 * @author Jegors Batovs
 */

module.exports = {
    meta: {
        docs: {
            description: 'Everything declared in module on the first nesting level should be exported.',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        VariableDeclaration(node) {
            const { parent, declarations: [{ id: { loc, name } }] } = node;
            const { type } = parent || {};

            if (parent.type !== 'Program') {
                return;
            }

            if (type !== 'ExportNamedDeclaration') {
                context.report({
                    loc,
                    message: `Variable ${name} must be exported (as non default) to allow proper extension.`,
                    fix: fixer => fixer.insertTextBefore(node, 'export ')
                });
            }
        },
        ClassDeclaration(node) {
            const { parent, id: { loc, name } } = node;
            const { type } = parent || {};

            if (type !== 'ExportNamedDeclaration') {
                context.report({
                    loc,
                    message: `Class ${name} must be exported (as non default) to allow proper extension.`,
                    fix: fixer => {
                        if (parent.type === 'Program') {
                            fixer.insertTextBefore(node, 'export ')
                        }
                    }
                });
            }
        }
    })
};

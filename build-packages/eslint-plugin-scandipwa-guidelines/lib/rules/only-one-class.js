/**
 * @fileoverview There should be only one class per file
 * @author Jegors Batovs
 */

module.exports = {
    meta: {
        docs: {
            description: 'There should be only one class per file',
            category: 'Coding standard',
            recommended: false,
        },
        fixable: 'code',
    },

    create: (context) => ({
        Program(node) {
            const classes = node.body
                .map((node) => node.type.match(/^Export/) ? node.declaration : node)
                .filter((val) => val && val.type === 'ClassDeclaration');

            if (classes.length > 1) {
                classes.slice(1).forEach((redundantClass) => {
                    context.report({
                        node: redundantClass,
                        message: 'Only one class per file is allowed',
                    });
                });
            }
        },
    }),
};

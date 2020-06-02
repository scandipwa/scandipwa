/**
 * @fileoverview There should be only one class per file
 * @author Jegors Batovs
 */

// eslint-disable-next-line fp/no-let, scandipwa-extensibility/no-non-extensible-components
let classCount;

module.exports = {
    meta: {
        docs: {
            description: 'There should be only one class per file',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        Program() {
            classCount = 0;
        },
        ClassDeclaration(node) {
            classCount += 1;
            if (classCount > 1) {
                context.report({
                    node,
                    message: 'Only one class per file is allowed',
                    fix: fixer => fixer.remove(node)
                });
            }
        }
    })
};

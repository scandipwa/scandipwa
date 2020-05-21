/**
 * @fileoverview All components should be extensible.
 * @author Alfreds Genkins
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'All components should be extensible.',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        ClassDeclaration(node) {
            const { superClass } = node;
            const { name, loc: superClassLoc } = superClass || {};
            const { id: declaration } = node;
            const { loc } = declaration;

            if (!name) {
                context.report({
                    loc,
                    message: 'Extend ExtensibleClass with this class to make it extensible',
                    fix: fixer => fixer.insertTextAfter(declaration, ' extends ExtensibleClass')
                });
            }

            if (name === 'PureComponent' || name === 'Component') {
                context.report({
                    superClassLoc,
                    message: `${name} is not allowed. Use 'Extensible${name}' instead`,
                    fix: fixer => fixer.replaceText(superClass, `Extensible${name}`)
                });
            }
        }
    })
};

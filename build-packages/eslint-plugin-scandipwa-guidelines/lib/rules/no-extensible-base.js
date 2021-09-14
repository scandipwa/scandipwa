/**
 * @fileoverview All components should be extensible.
 * @author Jegors Batovs
 */
"use strict";

module.exports = {
    meta: {
        docs: {
            description: 'Only namespaces are needed to make the classes extensible.',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        ClassDeclaration(node) {
            const { superClass } = node;
            const { name } = superClass || {};
            const { id: declaration } = node;
            const { loc: identifierLocation } = declaration;

            if (name === 'ExtensibleClass') {
                context.report({
                    node: superClass,
                    message: 'Inheritance from the ExtensibleClass is no longer necessary',
                    fix: fixer => {
                      const sourceCode = context.getSourceCode();
                      return fixer.removeRange([
                        sourceCode.getIndexFromLoc(node.id.loc.end),
                        sourceCode.getIndexFromLoc(node.body.loc.start)
                      ])
                    }
                });
            }

            if (name === 'ExtensiblePureComponent' || name === 'ExtensibleComponent') {
                const relevantName = name.replace('Extensible', '');
                context.report({
                    loc: identifierLocation,
                    message: `${name} is not necessary anymore. Use '${relevantName}' instead`,
                    fix: fixer => fixer.replaceText(superClass, relevantName)
                });
            }
        }
    })
};

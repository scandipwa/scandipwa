/**
 * @fileoverview Non-extensible components are not allowed.
 * @author Alfreds Genkins
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function keepOrDeleteNode(context, node) {
    const { name } = node.specifiers[0].local;
    if (name === 'PureComponent' || name === 'Component') {
        context.report({
            node,
            message: `${name} is not allowed. Use 'Extensible${name}' instead`,
            fix: fixer => fixer.remove(node)
        });
    }
}

function keepOrDeleteSpecifier(context, specifier, isCommaBeforeSpecifier) {
    const { name } = specifier.local;
    if (name === 'PureComponent' || name === 'Component') {
        const { loc } = specifier;
        context.report({
            loc,
            message: `${name} is not allowed. Use 'Extensible${name}' instead`,
            fix: (fixer) => {
                const sourceCode = context.getSourceCode();
                const index = sourceCode.text.indexOf(name);
                const afterPureComponent = index + name.length + 2;
                const beforePureComponent = index - 2;

                if (isCommaBeforeSpecifier) {
                    return fixer.removeRange([beforePureComponent, index + name.length]);
                }

                return fixer.removeRange([index, afterPureComponent]);
            }
        });
    }
}

module.exports = {
    meta: {
        docs: {
            description: 'Non-extensible components are not allowed.',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        ImportDeclaration(node) {
            if (node.specifiers.length === 1) {
                keepOrDeleteNode(context, node);
            } else {
                node.specifiers.forEach(
                    (specifier, index, { length }) => {
                        const isCommaBeforeSpecifier = index === length - 1;
                        keepOrDeleteSpecifier(context, specifier, isCommaBeforeSpecifier);
                    }
                );
            }
        },
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

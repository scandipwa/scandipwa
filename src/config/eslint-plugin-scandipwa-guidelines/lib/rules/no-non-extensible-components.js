/**
 * @fileoverview Non-extensible components are not allowed.
 * @author Jegors Batovs
 */

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
        }
    })
};

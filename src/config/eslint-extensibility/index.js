/* eslint-disable fp/no-let */
/* eslint-disable no-magic-numbers */

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function checkCall(context, callee) {
    const { type, name } = callee;
    if (type === 'Identifier' && name === 'middleware') {
        return true;
    }
    if (type === 'CallExpression') {
        const { callee: nextCallee, arguments: args } = callee;
        if (checkCall(context, nextCallee)) {
            return true;
        }

        // eslint-disable-next-line fp/no-loops, no-restricted-syntax
        for (const arg of args) {
            if (checkCall(context, arg)) {
                return true;
            }
        }
    }

    return false;
}

function constructNamespace(filePath) {
    const exploded = filePath.split('/');
    const fileName = exploded[exploded.length - 1];
    const fileDirectory = exploded[exploded.length - 2];
    const [resName] = fileName.split('.');
    const oneMoreDirectoryUp = exploded[exploded.length - 3];

    return `${capitalize(oneMoreDirectoryUp)}/${capitalize(fileDirectory)}/${capitalize(resName)}`;
}

function keepOrDeleteNode(context, node) {
    if (node.specifiers[0].local.name === 'PureComponent') {
        context.report({
            node,
            message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead",
            fix: fixer => fixer.remove(node)
        });
    }
}

function keepOrDelete(context, specifier, isCommaBeforeSpecifier) {
    if (specifier.local.name === 'PureComponent') {
        const { loc } = specifier;

        context.report({
            loc,
            message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead",
            fix: (fixer) => {
                const sourceCode = context.getSourceCode();
                const index = sourceCode.text.indexOf('PureComponent');
                const afterPureComponent = index + 'PureComponent'.length + 2;
                const beforePureComponent = index - 2;

                if (isCommaBeforeSpecifier) {
                    return fixer.removeRange([beforePureComponent, index + 'PureComponent'.length]);
                }

                return fixer.removeRange([index, afterPureComponent]);
            }
        });
    }
}

let classCount;
let classExists = false;

module.exports = {
    rules: {
        'no-pure-component': {
            create: context => ({
                ImportDeclaration(node) {
                    if (node.specifiers.length === 1) {
                        keepOrDeleteNode(context, node);
                    } else {
                        node.specifiers.forEach(
                            (specifier, index, { length }) => {
                                const isCommaBeforeSpecifier = index === length - 1;
                                keepOrDelete(context, specifier, isCommaBeforeSpecifier);
                            }
                        );
                    }
                },
                ClassDeclaration(node) {
                    const { superClass } = node;
                    const { name, loc } = superClass || {};
                    if (name === 'PureComponent' || name === 'Component') {
                        context.report({
                            loc,
                            message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead",
                            fix: fixer => fixer.replaceText(superClass, 'ExtensiblePureComponent')
                        });
                    }
                }
            })
        },
        'only-one-class': {
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
        },
        'use-extensible-base': {
            create: context => ({
                ClassDeclaration(node) {
                    const { superClass } = node;
                    const { name } = superClass || {};
                    const { id: declaration } = node;
                    const { loc } = declaration;
                    if (!name) {
                        context.report({
                            loc,
                            message: 'Extend ExtensibleClass with this class to make it extensible',
                            fix: fixer => fixer.insertTextAfter(declaration, ' extends ExtensibleClass')
                        });
                    }
                }
            })
        },
        'use-middleware': {
            create: context => ({
                Program() {
                    classExists = false;
                },
                ClassDeclaration() {
                    classExists = true;
                },
                ExportDefaultDeclaration(node) {
                    if (!classExists) {
                        return;
                    }

                    if (node.declaration.type === 'ClassDeclaration') {
                        context.report({
                            node,
                            message: 'Use middleware function when exporting extensible class. Declare it separately.'
                        });
                    }
                    if (node.declaration.type === 'Identifier') {
                        context.report({
                            node,
                            message: 'Use middleware function when exporting class',
                            fix: (fixer) => {
                                const { declaration } = node;
                                const namespace = constructNamespace(context.getFilename());

                                return [
                                    fixer.insertTextBefore(declaration, 'middleware('),
                                    fixer.insertTextAfter(declaration, `, '${namespace}')`)
                                ];
                            }
                        });
                    }
                    if (node.declaration.type === 'CallExpression') {
                        const { declaration } = node;
                        if (!checkCall(context, declaration)) {
                            context.report({
                                node,
                                message: 'Use middleware function when wrapping exporting value in other functions'
                            });
                        }
                    }
                }
            })
        }
    }
};

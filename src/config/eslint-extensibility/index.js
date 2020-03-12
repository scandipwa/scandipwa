/* eslint-disable */

var exDfShouldBeMiddlewared;

function reportPureComponent(context, node) {
    context.report({
        node,
        message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead"
    });
}

function checkExDfCall(context, callee) {
    const { type, name } = callee;
    if (type === 'Identifier' && name === 'middleware') {
        return true;
    }
    if (type === 'CallExpression') {
        const { callee: nextCallee, arguments: args } = callee;
        if (checkExDfCall(context, nextCallee)) {
            return true;
        }

        for (const arg of args) {
            if (checkExDfCall(context, arg)) {
                return true;
            }
        }
    }

    return false;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

module.exports = {
    rules: {
        'no-pure-component': {
            create: context => ({
                ImportDefaultSpecifier(node) {
                    const {
                        local: { name }
                    } = node;

                    if (name === 'PureComponent') {
                        reportPureComponent(context, node);
                    }
                },
                ImportSpecifier(node) {
                    const { imported } = node;
                    const { name } = imported || {};
                    if (name === 'PureComponent') {
                        reportPureComponent(context, node);
                    }
                },
                ClassDeclaration(node) {
                    const { superClass } = node;
                    const { name } = superClass || {};
                    if (name === 'PureComponent') {
                        reportPureComponent(context, node);
                    }
                }
            })
        },
        'use-middleware': {
            create: context => ({
                Program() {
                    exDfShouldBeMiddlewared = false;
                },
                ClassDeclaration() {
                    exDfShouldBeMiddlewared = true;
                },
                ExportDefaultDeclaration(node) {
                    if (!exDfShouldBeMiddlewared) {
                        return;
                    }

                    const { declaration: { type } } = node;
                    if (type === 'ClassDeclaration') {
                        context.report({ node, message: 'Use middleware function when exporting extensible class' });
                    }
                    if (type === 'NewExpression') {
                        context.report({ node, message: 'Use middleware function when exporting extensible instance' });
                    }
                    if (type === 'Identifier') {
                        context.report({
                            node,
                            message: 'Use middleware function when exporting class',
                            fix: (fixer) => {
                                const { declaration } = node;
                                const exploded = context.getFilename().split('/');
                                const fileName = exploded[exploded.length - 1];
                                const fileType = exploded[exploded.length - 2];
                                const [resName, filePostfix] = fileName.split('.');
                                // eslint-disable-next-line prefer-template
                                const namespace = capitalize(fileType)
                                                    + '/' + capitalize(resName)
                                                    + '/' + capitalize(filePostfix);

                                return [
                                    fixer.insertTextBefore(declaration, 'middleware('),
                                    fixer.insertTextAfter(declaration, `, ${namespace})`)
                                ];
                            }
                        });
                    }
                    if (type === 'CallExpression') {
                        const { declaration } = node;
                        if (!checkExDfCall(context, declaration)) {
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

/* eslint-disable */

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

        for (const arg of args) {
            if (checkCall(context, arg)) {
                return true;
            }
        }
    }

    return false;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function constructNamespace(filePath) {
    const exploded = filePath.split('/');
    const fileName = exploded[exploded.length - 1];
    const fileDirectory = exploded[exploded.length - 2];
    const [resName] = fileName.split('.');
    const oneMoreDirectoryUp = exploded[exploded.length - 3];

    return capitalize(oneMoreDirectoryUp) + '/' + capitalize(fileDirectory) + '/' + capitalize(resName);
}

let classCount;

module.exports = {
    rules: {
        'no-importing-pure-component': {
            create: context => ({
                ImportSpecifier(node) {
                    const { imported } = node;
                    const { name } = imported || {};
                    if (name === 'PureComponent') {
                        context.report({
                            node,
                            message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead",
                            fix: fixer => fixer.remove(node)
                        });
                    }
                }
            })
        },
        'no-extending-pure-component': {
            create: context => ({
                ClassDeclaration(node) {
                    const { superClass } = node;
                    const { name } = superClass || {};
                    if (name === 'PureComponent' || name === 'Component') {
                        context.report({
                            node,
                            message: "PureComponent is not allowed. Use 'ExtensiblePureComponent' instead",
                            fix: fixer => fixer.replaceText(superClass, 'ExtensiblePureComponent')
                        });
                    }
                }
            })
        },
        'use-middleware': {
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
                        });
                    }
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
                },
                ExportDefaultDeclaration(node) {
                    if (!classCount) {
                        return;
                    }
                    const { declaration: { type } } = node;
                    if (type === 'ClassDeclaration') {
                        context.report({ node, message: 'Use middleware function when exporting extensible class. Declare it separately.' });
                    }
                    if (type === 'Identifier') {
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
                    if (type === 'CallExpression') {
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

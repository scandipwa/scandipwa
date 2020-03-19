/* eslint-disable max-len */
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

function checkDepth(exploded) {
    switch (exploded[0]) {
    case 'route':
    case 'component':
    case 'store':
    case 'util':
        return exploded.length <= 3;
    case 'query':
    case 'type':
        return exploded.length <= 2;
    default:
        return true;
    }
}

/**
 * Returns name of the directory, if file postfix does not match expected.
 */
function checkPostfix(exploded) {
    const [filename, postfix] = exploded[exploded.length - 1].split('.');

    if (filename === 'index' && postfix === 'js') {
        return false;
    }
    // Check if postfix is expected for the directory
    switch (exploded[0]) {
    case 'component':
    case 'route':
        if (!(['component', 'container', 'style'].includes(postfix))) {
            return exploded[0];
        }
        break;
    case 'store':
        if (!(['action', 'dispatcher', 'reducer'].includes(postfix))) {
            return exploded[0];
        }
        break;
    case 'query':
        if (!(postfix === 'query')) {
            return exploded[0];
        }
        break;
    case 'style':
        if (!(postfix === 'scss')) {
            return exploded[0];
        }
        break;
    case 'type':
        if (!(postfix === 'js')) {
            return exploded[0];
        }
        break;
    default:
        // no naming convention for util
        // others cases unexpected, ignoring.
        break;
    }

    return false;
}

function checkFileName(exploded) {
    const fullFileName = exploded[exploded.length - 1];
    // Index.js is always OK
    if (fullFileName === 'index.js') {
        return true;
    }

    // Do not check paths containing these directories in them
    if (exploded.some(elem => ['style', 'query', 'type', 'util'].includes(elem))) {
        return true;
    }

    const directoryName = exploded[exploded.length - 2];
    const [pureFileName] = fullFileName.split('.');

    // Is OK when file name matches directory name
    if (pureFileName === directoryName) {
        return true;
    }

    return false;
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
        'derived-class-names': {
            create: context => ({
                ClassDeclaration(node) {
                    const filePath = context.getFilename();
                    const exploded = filePath.split('/');
                    const [fileName, postfix] = exploded[exploded.length - 1].split('.');
                    if (fileName === 'index' && postfix === 'js') {
                        return;
                    }

                    const expectedClassName = capitalize(fileName)
                        + (['js', 'component'].includes(postfix)
                            ? ''
                            : capitalize(postfix));
                    const actualClassName = node.id.name;

                    if (expectedClassName !== actualClassName) {
                        context.report({
                            node,
                            message: 'Class name must be derived from the file name, using postfix.',
                            fix: fixer => fixer.replaceText(node.id, expectedClassName)
                        });
                    }
                }
            })
        },
        'file-structure': {
            create: context => ({
                Program(node) {
                    const filePath = context.getFilename();
                    if (filePath.indexOf('src/app') !== -1) {
                        const relativeToApp = filePath.slice(filePath.indexOf('src/app') + 'src/app'.length + 1);
                        const exploded = relativeToApp.split('/');

                        if (!([
                            'component', 'query', 'route', 'store', 'style', 'type', 'util', 'index.js'
                        ].includes(exploded[0]))) {
                            context.report({
                                node,
                                message: 'Extending app directory with custom directories is prohibited.'
                            });
                        }

                        if (!checkFileName(exploded)) {
                            context.report({
                                node,
                                message: 'File name should match directory name + postfix (if postfix is needed)'
                            });
                        }

                        if (!checkDepth(exploded)) {
                            context.report({
                                node,
                                message: 'Nesting directories is against the principle of flat file structure and is prohobited'
                            });
                        }

                        const fileName = exploded[exploded.length - 1];
                        if (fileName !== 'index.js') {
                            const directoryThatDoesNotFit = checkPostfix(exploded);
                            if (directoryThatDoesNotFit) {
                                context.report({
                                    node,
                                    message: `Postfix of this file does not comply with the ScandiPWA naming convention for the '${directoryThatDoesNotFit}' directory`
                                });
                            }
                        }
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

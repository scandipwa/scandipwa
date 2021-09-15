/**
* @fileoverview Use namespace decorators for exports
* @author Jegors Batovs
*/

const path = require('path');
const { getPackageJson } = require('@tilework/mosaic-dev-utils/package-json');
const fixNamespaceLack = require('@tilework/eslint-plugin-mosaic/lib/util/fix-namespace-lack.js');
const getLeadingCommentsForNode = require('@tilework/eslint-plugin-mosaic/lib/util/get-leading-comments');

const types = {
    ExportedClass: [
        'ExportNamedDeclaration',
        'ClassDeclaration'
    ].join(' > '),

    ExportedArrowFunction: [
        'ExportNamedDeclaration',
        'VariableDeclaration',
        'VariableDeclarator',
        'ArrowFunctionExpression'
    ].join(' > '),

    ExportedFunction: [
        'ExportNamedDeclaration',
        'FunctionDeclaration'
    ].join(' > '),

    isExportedClass: node => node.type === 'ClassDeclaration'
        && node.parent.type === 'ExportNamedDeclaration',

    isExportedArrowFunction: node => node.type === 'ArrowFunctionExpression'
        && node.parent.type === 'VariableDeclarator'
        && node.parent.parent.type === 'VariableDeclaration'
        && node.parent.parent.parent.type === 'ExportNamedDeclaration',

    isExportedFunction: node => node.type === 'FunctionDeclaration'
        && node.parent.type === 'ExportNamedDeclaration',

    PromiseHandlerArrowFunction: [
        [
            "CallExpression",
            "[callee.type='MemberExpression']",
            "[callee.object.name!=/.+Dispatcher/]",
            ":matches(",
            [
                "[callee.property.name='then']",
                "[callee.property.name='catch']",
                "[callee.property.name='finally']"
            ].join(', '),
            ")"
        ].join(''),
        'ArrowFunctionExpression'
    ].join(' > '),

    isPromiseHandlerArrowFunction: (node) => {
        const { parent } = node;
        const promiseHandlerNames = ['then', 'catch', 'finally'];

        return (
            node.type === 'ArrowFunctionExpression'
            && parent.type === 'CallExpression'
            && parent.callee.type === 'MemberExpression'
            && !(parent.callee.object.name || "").endsWith('Dispatcher')
            && promiseHandlerNames.includes(parent.callee.property.name)
        );
    },

    isHandleableArrowFunction: node => types.isExportedArrowFunction(node)
        || types.isPromiseHandlerArrowFunction(node),

    detectType: node => {
        if (types.isPromiseHandlerArrowFunction(node)) {
            return 'promise handler arrow function';
        }

        if (types.isExportedArrowFunction(node)) {
            return 'exported arrow function';
        }

        if (types.isExportedClass(node)) {
            return 'exported class';
        }

        if (types.isExportedFunction(node)) {
            return 'exported function';
        }
    }
};

const getProperParentNode = (node) => {
    if (types.isExportedClass(node)) {
        return node.parent;
    }

    if (types.isExportedArrowFunction(node)) {
        return node.parent.parent.parent;
    }

    if (types.isPromiseHandlerArrowFunction(node)) {
        return node;
    }

    if (types.isExportedFunction(node)) {
        return node.parent;
    }

    return {};
};

const getNamespaceCommentForNode = (node, sourceCode) => {
    const getNamespaceFromComments = (comments = []) => comments.find(
        comment => comment.value.includes('@namespace')
    );

    return getNamespaceFromComments(
        getLeadingCommentsForNode(getProperParentNode(node), sourceCode)
    );
};

const collectFunctionNamespace = (node, stack) => {
    const { type } = node;

    switch (type) {
        case 'ArrowFunctionExpression':
            const name = node.body?.callee?.name;

            if (node.parent?.arguments?.indexOf(node) === 1) {
                stack.push('catch');
            }

            if (name) {
                stack.push(name);
            }

            break;
        case 'CallExpression':
            if (node.callee.type === 'MemberExpression') {
                stack.push(
                    node.callee?.property?.name,
                    node.callee?.object?.name
                        || node.callee?.object?.callee?.name
                        || node.callee?.object?.callee?.property?.name
                );
            } else {
                stack.push(node.callee.name);
            }

            break;
        case 'Identifier':
            stack.push(node.name);
            break;
        case 'MethodDefinition':
            stack.push(node.key.name);
            break;
        case 'VariableDeclarator':
        case 'FunctionDeclaration':
        case 'ClassDeclaration':
            stack.push(node.id.name);
    }

    if (node.parent) {
        collectFunctionNamespace(node.parent, stack);
    }
};

const getNodeNamespace = (node) => {
    const stack = [];

    if (node.parent.type === 'VariableDeclarator') {
        stack.push(node.parent.id.name);
    } else if (node.type === 'ClassDeclaration') {
        // stack.push(node.id.name);
    } else {
        collectFunctionNamespace(node, stack);
    }

    // not using path.sep on purpose
    return stack.filter(Boolean).reverse().join('/');
};

const prepareFilePath = (pathname) => {
    const {
        name: filename,
        dir
    } = path.parse(pathname);

    const [name, postfix = ''] = filename.split('.');

    /**
    * We do not want the \\ paths on Windows, rather / =>
    * split and then join with correct delimiter
    **/
    return path.join(
        dir,
        // If dir name === file name without postfix => do not repeat it
        new RegExp(`${path.sep}${name}$`).test(dir) ? '' : name,
        postfix
        ).split(path.sep)
        // Filter out empty strings if they exist
        .filter(x => !!x);
};

const preparePackageName = (packageName) => {
    // This is on purpose not a path.sep (windows support)
    const [org = '', name = ''] = packageName.split('/');

    if (!name) {
        // if there is no name => there is not ORG
        if (packageName === '<%= name %>') {
            return 'placeholder';
        }

        return packageName;
    }

    if (org === '@scandipwa') {
        // Legacy support
        if (name === 'scandipwa') {
            return '';
        }

        return name;
    }

    return `${org.slice(1)}/${name}`;
};

const generateNamespace = (node, context) => {
    const filename = context.getFilename();
    const splitted = filename.split('src');
    const toFile = splitted.pop();
    const toPackage = path.normalize(splitted.join('src'));
    const { name: packageName } = getPackageJson(toPackage);

    // Not using path.join to support windows
    const pathname = [
        // remove @ from organization, support @scandipwa legacy namespaces
        preparePackageName(packageName),
        // Trim post-fixes if they are not present
        ...prepareFilePath(toFile)
    ].filter(Boolean).join('/').replace(
        // Convert to pascal-case, and trim "-"
        /\b[a-z](?=[a-z]{2})/g,
        (letter) => letter.toUpperCase()
        ).split('-').join('');

    // Do not transform code to uppercase / lowercase it should be written alright
    return [pathname, getNodeNamespace(node)].filter(Boolean).join('/');
};

const extractNamespaceFromComment = ({ value: comment = '' }) => {
    const {
        groups: {
            namespace
        } = {}
    } = comment.match(/@namespace +(?<namespace>[^ ]+)/) || {};

    return namespace;
};

module.exports = {
    meta: {
        docs: {
            description: 'Use @namespace comment-decorators',
            category: 'Extensibility',
            recommended: true
        },
        fixable: 'code'
    },

    create: context => ({
        [[
            types.ExportedClass,
            types.PromiseHandlerArrowFunction,
            types.ExportedArrowFunction,
            types.ExportedFunction
        ].join(',')](node) {
            const namespaceComment = getNamespaceCommentForNode(node, context.getSourceCode()) || { value: '' };
            const namespaceCommentString = namespaceComment.value.split('@namespace').pop().trim();

            const namespace = extractNamespaceFromComment(namespaceComment);
            const generatedNamespace = generateNamespace(node, context);

            if (!namespaceCommentString) {
                context.report({
                    node,
                    message: `Provide namespace for ${types.detectType(node)} by using @namespace magic comment`,
                    fix: fixer => fixNamespaceLack(
                        fixer,
                        getProperParentNode(node),
                        context,
                        generatedNamespace
                        ) || []
                });
            } else if (generatedNamespace !== namespaceCommentString) {
                context.report({
                    node,
                    message: `Namespace for this node is not valid! Consider changing it to ${generatedNamespace}`,
                    fix: fixer => {
                        const newNamespaceCommentContent = namespaceComment.value.replace(namespace, generatedNamespace);
                        const newNamespaceComment = namespaceComment.type === 'Block'
                            ? `/*${newNamespaceCommentContent}*/`
                            : `// ${newNamespaceCommentContent}`;

                        return fixer.replaceText(
                            namespaceComment,
                            newNamespaceComment
                        );
                    }
                });
            }
        }
    })
};

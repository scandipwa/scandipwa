/**
 * @fileoverview Use namespace decorators for exports
 * @author Jegors Batovs
 */

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

    isExportedClass: node => node.type === 'ClassDeclaration'
    && node.parent.type === 'ExportNamedDeclaration',

    isExportedArrowFunction: node => node.type === 'ArrowFunctionExpression'
    && node.parent.type === 'VariableDeclarator'
    && node.parent.parent.type === 'VariableDeclaration'
    && node.parent.parent.parent.type === 'ExportNamedDeclaration',

    PromiseHandlerArrowFunction: [
        "CallExpression[callee.type='MemberExpression']".concat(
            ":matches([callee.property.name='then'], [callee.property.name='catch'])"
        ),
        'ArrowFunctionExpression'
    ].join(' > '),

    isPromiseHandlerArrowFunction: (node) => {
        const { parent } = node;
        const promiseHandlerNames = ['then', 'catch'];

        return (
            node.type === 'ArrowFunctionExpression'
        && parent.type === 'CallExpression'
        && parent.callee.type === 'MemberExpression'
        && promiseHandlerNames.includes(parent.callee.property.name)
        );
    },

    isHandleableArrowFunction: node => types.isExportedArrowFunction(node)
      || types.isPromiseHandlerArrowFunction(node),

    detectType: node => {
        if (types.isPromiseHandlerArrowFunction(node)) return 'promise handler arrow function';
        if (types.isExportedArrowFunction(node)) return 'exported arrow function';
        if (types.isExportedClass(node)) return 'exported class';
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

    return {};
};

const getNamespaceForNode = (node) => {
    const getNamespaceFromComments = (comments = []) => comments.find(
        comment => comment.value.includes('@namespace')
    );

    return getNamespaceFromComments(
        getProperParentNode(node).leadingComments
    );
}

const generateNamespace = (node, context) => {
    const capitalise = word => word.charAt(0).toUpperCase() + word.slice(1);
    const generateBaseNamespace = () => {
        const splitReverseFilePath = context.getFilename().split('/').reverse();
        const postfix = capitalise(splitReverseFilePath[0].split('.')[1]);

        return splitReverseFilePath.slice(1).reduce(
            (acc, cur, _, array) => {
                if (cur === 'app' || cur === 'sw') {
                    // Mutate the initial array to break cycle
                    array.splice(1);
                    return acc;
                }

                return [capitalise(cur), acc].join('/');
            },
            ['JS', 'QUERY'].includes(postfix.toUpperCase()) ? '' : postfix
        );
    };

    const toCamelCase = (...args) => {
        const decapitalise = word => word.charAt(0).toLowerCase() + word.slice(1);

        return args.slice(1).reduce(
            (acc, cur) => {
              acc = acc.concat(capitalise(cur));

              return acc;
            },
            decapitalise(args[0])
        )
    };

    let stack = [];
    const collect = (node, namespaceContainer) => {
        if (node.type === 'CallExpression') {
            if (node.callee.type === 'MemberExpression') {
                stack.push(node.callee.property.name);
                collect(node.callee.object);
            } else if (node.callee.type === 'Identifier') {
                stack.push(node.callee.name);
            }
        }
    }

    if (node.parent.type === 'VariableDeclarator') {
        stack.push(node.parent.id.name)
    } else if (node.type === 'ClassDeclaration') {
        stack.push(node.id.name);
    } else {
        collect(node.parent);
    }
    return [generateBaseNamespace(), toCamelCase(...stack.reverse())].join('/');
}

module.exports = {
    meta: {
        docs: {
            description: 'Use @namespace comment-decorators',
            category: 'Extensibility',
            recommended: true
        },
        // Non-fixable.
        fixable: 'code'
    },

    create: context => ({
        [[
            types.ExportedClass,
            types.PromiseHandlerArrowFunction,
            types.ExportedArrowFunction
        ].join(',')](node) {
            const namespace = getNamespaceForNode(node);
            if (!namespace) {
                const newNamespace = generateNamespace(node, context);

                context.report({
                    node,
                    message: `Provide namespace for ${types.detectType(node)} by using @namespace magic comment`,
                    fix: fixer => {
                        const afterCommentNode = getProperParentNode(node);
                        return fixer.insertTextBefore(afterCommentNode, `/** @namespace ${newNamespace} */\n`);
                    }
                });
            }
        }
    })
};

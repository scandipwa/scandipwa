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
      || types.isPromiseHandlerArrowFunction(node)
};

const getNamespaceForNode = (node) => {
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

    const getNamespaceFromComments = (comments = []) => comments.find(
        comment => comment.value.includes('@namespace')
    );

    return getNamespaceFromComments(
        getProperParentNode(node).leadingComments
    );
};


module.exports = {
    meta: {
        docs: {
            description: 'Use @namespace comment-decorators',
            category: 'Extensibility',
            recommended: true
        }
        // Non-fixable.
        // fixable: 'code'
    },

    create: context => ({
        [[
            types.ExportedClass,
            types.PromiseHandlerArrowFunction,
            types.ExportedArrowFunction
        ].join(',')](node) {
            const namespace = getNamespaceForNode(node);
            if (!namespace) {
                context.report({
                    node,
                    message: 'Provide namespace by using @namespace magic comment'
                });
            }
        }
    })
};

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable no-param-reassign, new-cap */
// TODO comment
// TODO add examples of transformations
const namespaceExtractor = /@namespace +(?<namespace>[^ ]+)/;

const extractNamespaceFromComments = (comments = []) => comments.reduce(
    (acquired, testable) => {
        if (acquired) {
            return acquired;
        }
        const { groups: { namespace } = {} } = testable.value.match(namespaceExtractor) || {};
        return namespace;
    },
    ''
);

const getLeadingComments = (path) => {
    const { node: { leadingComments } } = path;
    if (leadingComments) {
        return leadingComments;
    }

    if (
        path.parent.type === 'ExportNamedDeclaration'
        && path.parent.leadingComments
    ) {
        return path.parent.leadingComments;
    }

    return null;
};

const getNamespaceFromPath = (path) => {
    const leadingComments = getLeadingComments(path);
    if (!leadingComments) {
        return null;
    }

    return extractNamespaceFromComments(leadingComments);
};

const addSuperToConstructor = (path, types) => {
    const constructor = path
        .get('body')
        .get('body')
        .find((member) => member.get('key').node.name === 'constructor');

    if (!constructor) {
        return;
    }

    const superCall = types.expressionStatement(
        types.callExpression(types.super(), [])
    );

    constructor.get('body').unshiftContainer('body', superCall);
};

module.exports = ({ types, parse }) => ({
    name: 'middleware-decorators',
    visitor: {
        /* Transform leading comments of anonymous arrow functions */
        ArrowFunctionExpression: (path) => {
            const namespace = getNamespaceFromPath(path);
            if (!namespace) {
                return;
            }

            path.replaceWith(
                types.callExpression(
                    types.identifier('middleware'),
                    [path.node, types.stringLiteral(namespace)]
                )
            );
        },

        VariableDeclaration: (path) => {
            const namespace = getNamespaceFromPath(path);
            if (!namespace) {
                return;
            }

            const declarator = path.get('declarations')[0];
            const init = declarator.get('init');

            init.replaceWith(
                types.callExpression(
                    types.identifier('middleware'),
                    [init.node, types.stringLiteral(namespace)]
                )
            );
        },

        FunctionDeclaration: (path) => {
            const namespace = getNamespaceFromPath(path);
            if (!namespace) {
                return;
            }

            const { node: { id: { name }, params, body } } = path;

            const functionExpression = types.functionExpression(
                types.identifier(name),
                params,
                body
            );

            const middlewaredFunctionExpression = types.callExpression(
                types.identifier('middleware'),
                [functionExpression, types.stringLiteral(namespace)]
            );

            const declarator = types.variableDeclarator(
                types.identifier(name),
                middlewaredFunctionExpression
            );

            const declaration = types.variableDeclaration('let', [declarator]);
            path.replaceWith(declaration);
        },

        ClassDeclaration: (path) => {
            const namespace = getNamespaceFromPath(path);
            if (!namespace) {
                return;
            }

            const superClass = path.get('superClass');
            const superExpression = types.callExpression(
                types.Identifier('Extensible'),
                [types.Identifier(superClass.node ? superClass.node.name : '')]
            );

            if (!superClass.node) {
                addSuperToConstructor(path, types);
            }

            superClass.replaceWith(superExpression);

            const { node: { name } } = path.get('id');
            const newName = path.scope.generateUidIdentifier(name);
            path.get('id').node.name = newName.name;

            const wrappedInMiddeware = types.callExpression(
                types.identifier('middleware'),
                [newName, types.stringLiteral(namespace.trim())]
            );

            const declarator = types.variableDeclarator(
                types.identifier(name),
                wrappedInMiddeware
            );

            const newDeclaration = types.variableDeclaration('const', [declarator]);
            const newExport = types.exportNamedDeclaration(newDeclaration, []);
            const renaming = parse(
                `Object.defineProperty(${newName.name}, 'name', { value: '${name}' })`
            );

            path.insertAfter(newExport);
            path.insertAfter(renaming);

            // Remove export from initial classes declaration
            // TODO fix
            // AST explorer handles this OK, but our babel throws
            // if (path.parentPath.type === 'ExportNamedDeclaration') {
            //     path.parentPath.skip();
            //     path.parentPath.replaceWith(path);
            // }
        },
    },
});

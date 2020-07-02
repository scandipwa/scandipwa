/**
 * @fileoverview Use namespace decorators for exports
 * @author Jegors Batovs
 */

const traverse = require('eslint-traverse');
const fixNamespaceLack = require('../util/fix-namespace-lack.js');

const getDeclarationForNode = (declarableName, context) => {
    let returnNode;
    traverse(
        context,
        context.getSourceCode().ast,
        ({ node }) => {
            if (!![
                // Handle class declaration
                (node.type === 'ClassDeclaration' && node.id.name === declarableName) ||
                // Handle arrow function declaration
                (node.type === 'VariableDeclaration' && node.declarations[0].id.name === declarableName)
            ].filter(Boolean).length) {
                if (node.parent.type === 'ExportNamedDeclaration') {
                    returnNode = node.parent
                } else {
                    returnNode = node;
                }
                return traverse.STOP;
            }
        }
    );

    return returnNode;
};

module.exports = {
    meta: {
        docs: {
            description: 'Use @namespace comment-decorators instead of deprecated `middleware(...)` syntax',
            category: 'Extensibility',
            recommended: true
        },
        fixable: 'code'
    },

    create: context => ({
        CallExpression(node) {
            if (node.callee.name === 'middleware') {
                context.report({
                    node,
                    message: '`middleware` syntax is deprecated. Consider using @namespace.',
                    fix: fixer => {
                        const [{ name: middlewarableName }, { value: namespace }] = node.arguments;
                        const declaration = getDeclarationForNode(middlewarableName, context);

                        if (!declaration) {
                            return;
                        }

                        return [
                            fixer.replaceText(node, middlewarableName),
                            fixNamespaceLack(fixer, declaration, context, namespace)
                        ].filter(value => value);
                    }
                });
            }
        }
    })
};

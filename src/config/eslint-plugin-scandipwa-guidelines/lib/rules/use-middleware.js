/**
 * @fileoverview Wrap default export classes in middleware function
 * @author Jegors Batovs
 */
"use strict";

function checkCall(context, callee) {
    const { type, name } = callee;
    if (type === 'Identifier' && name === 'middleware') {
        return true;
    }
    if (type === 'CallExpression' || type === 'NewExpression') {
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

let classExists = false;

module.exports = {
    meta: {
        docs: {
            description: "Wrap default export classes in middleware function",
            category: "Fill me in",
            recommended: false
        },
        fixable: 'code',
    },

    create: context => ({
        Program() {
            classExists = false;
        },
        ClassDeclaration() {
            classExists = true;
        },
        ExportDefaultDeclaration(node) {
            if (!classExists && node.declaration.type !== 'ClassDeclaration') {
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

                        return [
                            fixer.insertTextBefore(declaration, 'middleware('),
                            fixer.insertTextAfter(declaration, ", 'NAMESPACE')")
                        ];
                    }
                });
            }

            if (node.declaration.type === 'CallExpression' || node.declaration.type === 'NewExpression') {
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
};

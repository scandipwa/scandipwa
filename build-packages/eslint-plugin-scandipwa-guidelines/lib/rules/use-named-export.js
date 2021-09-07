/**
 * @fileoverview
 * @author Jegors Batovs
 */

module.exports = {
    meta: {
        docs: {
            description: '',
            category: 'Coding standard',
            recommended: true,
        },
		fixable: 'code'
    },

    create: (context) => ({
        ExportDefaultDeclaration(node) {
            if (node.declaration.type === 'ClassDeclaration') {
                context.report({
                    node,
                    message:
                        'Declare the default export separately from the named export!',
                    fix: (fixer) => {
                        const className = node.declaration.id.name;
                        const exportedClass = context
                            .getSourceCode()
                            .text.slice(node.start, node.end)
                            .replace(/^export default class/, 'export class');
                        const exportDefault = `export default ${className};`;
                        return [
                            fixer.insertTextAfter(
                                node,
                                '\n\n'.concat(exportDefault)
                            ),
                            fixer.replaceText(node, exportedClass),
                        ];
                    },
                });
            }
        },
    }),
};

/**
 * @fileoverview Class name must match the name of the file it is declared in.
 * @author Jegors Batovs
 */

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

module.exports = {
    meta: {
        docs: {
            description: 'Class name must match the name of the file it is declared in.',
            category: 'Coding standard',
            recommended: true
        },
        fixable: 'code'
    },

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
                const { id: { loc } } = node;
                context.report({
                    loc,
                    message: 'Class name must be derived from the file name, using postfix.',
                    fix: fixer => fixer.replaceText(node.id, expectedClassName)
                });
            }
        }
    })
};

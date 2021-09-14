/**
 * @fileoverview Create a configuration file for your component in favor to declaring configuration right inside of it.
 * @author Jegors Batovs
 */
const path = require('path');

const extractDeclaration = (declarationOrExport) => {
    if (declarationOrExport.type.includes('Export')) {
        return declarationOrExport.declaration;
    }

    return declarationOrExport;
};

const prohibitedOnLevelOne = [
    'Literal'
];

const prohibitedInPostfixes = [
    'container',
    'component'
];

module.exports = {
    meta: {
        docs: {
            description:
                'Create a configuration file for your component in favor to declaring configuration right inside of it.',
            category: 'Coding standard',
            recommended: true,
        },
    },

    create: (context) => ({
        Program(node) {
            const filePath = context.getFilename();
            const exploded = filePath.split(path.sep);
            const [fileName, postfix] = exploded[exploded.length - 1].split('.');

            /**
             * Skip all non "component" and "container" files
             */
            if (!prohibitedInPostfixes.includes(postfix)) {
                return;
            }

            const { body } = node;

            body.forEach((declarationOrExport) => {
                const declaration = extractDeclaration(declarationOrExport);

                // Only variables are prohibited
                if (!declaration || declaration.type !== 'VariableDeclaration') {
                    return;
                }

                // Process all first level declarations
                declaration.declarations.forEach((declarator) => {
                    if (prohibitedOnLevelOne.includes(declarator.init.type)) {
                        context.report({
                            node: declarationOrExport,
                            message: 'Move the configuration constants to .config file',
                        });
                    }
                });
            });
        },
    }),
};

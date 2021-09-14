/**
 * @fileoverview Class name must match the name of the file it is declared in.
 * @author Jegors Batovs
 */
const { getIdentifierOccurrences } = require('../util/ast.js');
const { getExpectedClassNameFromFilename, shouldClassNameBeEnforced, getUnexpectedNameMessage } = require('../util/derived-class-name.js');
const { getFilenameFromPath } = require("../util/path.js");

module.exports = {
    meta: {
        docs: {
            description: 'Class name must match the name of the file it is declared in.',
            category: 'Coding standard',
            recommended: true,
        },
        fixable: 'code',
    },

    create: context => ({
        ClassDeclaration(node) {
            const filePath = context.getFilename();
            const fileName = getFilenameFromPath(filePath);

            if (!shouldClassNameBeEnforced(fileName)) {
                return;
            }

            const expectedClassName = getExpectedClassNameFromFilename(fileName);
            const actualClassName = node.id.name;

            if (expectedClassName !== actualClassName) {
                const wrongNodes = getIdentifierOccurrences(context, actualClassName);

                wrongNodes.forEach((node) => {
                    const { loc } = node;

                    context.report({
                        loc,
                        message: getUnexpectedNameMessage(fileName, expectedClassName, actualClassName),
                        fix: fixer => fixer.replaceText(node, expectedClassName),
                    });
                })
            }
        },
    }),
};

const { constructMessage } = require("./messages.js");

const { getNamePartsFromFilename } = require("./path");

function withCapitalizedInitial(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function shouldClassNameBeEnforced(filename) {
    const parts = getNamePartsFromFilename(filename);
    return parts.length > 1;
}

function getExpectedClassNameFromFilename(filename) {
    const parts = getNamePartsFromFilename(filename);

    if (parts.length > 1) {
        const [baseName, type] = parts;
        return withCapitalizedInitial(baseName) + withCapitalizedInitial(type);
    }

    const [baseName] = parts;
    return withCapitalizedInitial(baseName);
}

function getUnexpectedNameMessage(filename, expectedName, actualName) {
    const error = `In Scandi, class names need to be based on the file name. Since the filename is ${ filename } the class name should be ${ expectedName }.`;
    const help = `To fix this error, rename ${ actualName } to ${ expectedName }.`;
    const documentationLink =
        "https://github.com/scandipwa/eslint/blob/master/docs/rules/derived-class-names.md";

    return constructMessage(error, help, documentationLink);
}

module.exports = {
    shouldClassNameBeEnforced,
    getExpectedClassNameFromFilename,
    getUnexpectedNameMessage,
};

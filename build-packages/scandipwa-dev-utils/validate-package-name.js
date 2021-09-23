const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const validatePackageName = require('validate-npm-package-name');

const isValidName = (packageName) => {
    if (!packageName) {
        logger.error(
            'The package name must not be an empty string.',
            'Please choose a different one to proceed the bootstrap.',
            `Read more about package naming rules here: ${ logger.style.link('https://docs.npmjs.com/files/package.json#name') }`
        );

        return false;
    }

    const {
        validForNewPackages: isValid = true
    } = validatePackageName(packageName);

    if (isValid) {
        return true;
    }

    logger.error(
        `The name you choose ${ logger.style.misc(packageName) } is not a valid package name.`,
        'Please choose a different one to proceed the bootstrap.',
        `Read more about package naming rules here: ${ logger.style.link('https://docs.npmjs.com/files/package.json#name') }`
    );

    return false;
};

module.exports = isValidName;

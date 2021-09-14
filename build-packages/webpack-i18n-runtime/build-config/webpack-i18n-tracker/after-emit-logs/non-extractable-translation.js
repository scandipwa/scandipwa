const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const relativeToCwd = (pathname) => path.relative(process.cwd(), pathname);

module.exports = (nonExtractableList) => {
    const nonExtractable = nonExtractableList.map(
        (resource) => `${logger.style.file(relativeToCwd(resource))}`
    );

    return {
        type: 'warn',
        args: [
            'Non-extractable translations found in your application!',
            'Consider refactoring them so that they are translatable.',
            'See a list of files containing them below:',
            ...nonExtractable
        ]
    };
};

const path = require('path');

module.exports = () => {
    const {
        scandipwa: {
            locales = {}
        } = {}
    } = require(path.join(process.cwd(), 'package.json'));

    return Object
        .entries(locales)
        .filter(([, isEnabled]) => isEnabled)
        .map(([localeCode]) => localeCode);
};

const path = require('path');
const loadJson = require('./loadJson');

/**
 * Load translation from array of package root paths
 * @param {string[]} packagePaths
 * @param {string} locale
 */
module.exports = (packagePaths, localeCode) => packagePaths.map(
    (packagePath) => loadJson(path.join(packagePath, 'i18n', `${localeCode}.json`))
);

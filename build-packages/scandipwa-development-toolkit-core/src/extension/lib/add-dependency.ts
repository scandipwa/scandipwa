import * as path from 'path';

const getLatestVersion = require('@scandipwa/scandipwa-dev-utils/latest-version');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');

/**
 * Adds a dependency to the module
 * 
 * @param contextPathname module to add dep to
 * @param packageName package to add to the deps
 * @param version version (can be path)
 * @param isDev devDependency ?
 */
const addDependency = async (
    contextPathname: string, 
    packageName: string, 
    version?: string, 
    isDev?: boolean
) => {
    const packagePath = path.join(contextPathname, 'package.json');
    const packageJson = require(packagePath);
    const depKey = isDev ? 'devDependencies' : 'dependencies';

    // prefer latest version, if version is falsy
    const realVersion = version || await getLatestVersion(packageName);

    if (!packageJson[depKey]) {
        packageJson[depKey] = {};
    }

    packageJson[depKey][packageName] = realVersion;

    writeJson(
        packagePath,
        packageJson
    );
};

export default addDependency;
const path = require('path');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');
const { getPackageJson } = require('@scandipwa/scandipwa-dev-utils/package-json');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const injectScripts = (
    contextPathname: string
) => {
    const packagePath = path.join(contextPathname, 'package.json');
    const packageJson = getPackageJson(contextPathname);
    const linkCommand = 'scandipwa-scripts link';
    const scripts = ['postinstall', 'postupdate'];

    if (!packageJson.scripts) {
        // Add scripts field to package.json
        packageJson.scripts = {};
    }

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        if (packageJson.scripts[script] === linkCommand) {
            // Skip other checks if everything is already set
            // eslint-disable-next-line no-continue
            continue;
        }

        if (packageJson.scripts[script]) {
            /**
             * Make sure package.json does not have include preinstall
             * command which does not match neccessary command
             */

            logger.error(
                'Can not install Lerna (which is required to symlink local package).',
                `Please remove current ${ logger.style.misc(`scripts.${ script }`) } field from ${ logger.style.file('package.json') }.`
            );

            process.exit(1);
        }

        packageJson.scripts[script] = linkCommand;
    }

    // Update package json with new scripts.preinstall field
    writeJson(packagePath, packageJson);
};

export default injectScripts;
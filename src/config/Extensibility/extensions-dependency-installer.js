/* eslint-disable */
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

const projectRoot = path.resolve(__dirname, '../../..');
const magentoRoot = (function() {
    if (projectRoot.includes('app/design/frontend')) {
        return path.resolve(projectRoot, '../../../../..');
    }

    if (projectRoot.includes('localmodules')) {
        return path.resolve(projectRoot, '../..');
    }

    throw new Error(
        'Cannot locate Magento root automatically!\n'
        + 'Probably your theme is in some unusual location.\n'
    )
})()
const configuration = require(path.resolve(projectRoot, 'scandipwa.json'));
const { extensions } = configuration;

const roots = Object.values(extensions).reduce(
    (acc, rootPath) => acc.concat(path.resolve(magentoRoot, rootPath)),
    []
);

const NO_PACKAGE_JSON = 254;
const NO_PACKAGE_LOCK = 1;

const NO_PACKAGE_JSON_NOTIFICATION = 'proceeding: no package.json found'

const logOutput = (target, message) => console.log(
    `\n${target} says:\n${message}\n`
)

const uniqueRoots = [...new Set(roots)];
uniqueRoots.forEach(
    (cwd) => {
        execAsync('npm ci', { cwd })
            .then(({ stdout }) => logOutput(cwd, stdout))
            .catch(error => {
                // Handle no package.json
                if (error.code === NO_PACKAGE_JSON) {
                    logOutput(cwd, NO_PACKAGE_JSON_NOTIFICATION)
                    return;
                }

                // Package.json exists, but no package-lock
                execAsync('npm i', { cwd })
                    .then(stdout => logOutput(cwd, stdout))
                    .catch(error => logOutput(cwd, error.message));
            });
    }
);

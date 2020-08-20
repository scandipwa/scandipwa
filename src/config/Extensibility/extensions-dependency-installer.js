/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable no-console */
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

const projectRoot = path.resolve(__dirname, '../../..');

const getMagentoRoot = () => {
    if (projectRoot.includes('app/design/frontend')) {
        return path.resolve(projectRoot, '../../../../..');
    }

    if (projectRoot.includes('localmodules')) {
        return path.resolve(projectRoot, '../..');
    }

    // Add some colour with the first string!
    console.log('\x1b[36m%s\x1b[0m',
        'Cannot locate Magento root automatically!\n'
        + 'Probably your theme is in some unusual location.\n'
        + 'Cannot install plugins\' dependencies hence');

    return null;
};

const magentoRoot = getMagentoRoot();
if (!magentoRoot) {
    return;
}

// eslint-disable-next-line import/no-dynamic-require
const { extensions } = require(path.resolve(projectRoot, 'scandipwa.json'));

const roots = Object.values(extensions).reduce(
    (acc, rootPath) => acc.concat(path.resolve(magentoRoot, rootPath)),
    []
);

const NO_PACKAGE_JSON = 254;

const NO_PACKAGE_JSON_NOTIFICATION = 'proceeding: no package.json found';

const logOutput = (target, message) => console.log('\n%ssays:\n%s\n', target, message);

// Add some colour with the first string!
console.log('\x1b[36m%s\x1b[0m', 'Installing extensions\' dependencies');

const uniqueRoots = Array.from(new Set(roots));

if (!uniqueRoots.length) {
    console.log('\x1b[36m%s\x1b[0m', 'No extensions found in scandipwa.json, skipping this step');
    return;
}

uniqueRoots.forEach(
    (cwd) => {
        execAsync('npm ci', { cwd })
            .then(({ stdout }) => logOutput(cwd, stdout))
            .catch((error) => {
                // Handle no package.json
                if (error.code === NO_PACKAGE_JSON) {
                    logOutput(cwd, NO_PACKAGE_JSON_NOTIFICATION);
                    return;
                }

                // Package.json exists, but no package-lock
                execAsync('npm i', { cwd })
                    .then((stdout) => logOutput(cwd, stdout))
                    .catch(({ message }) => logOutput(cwd, message));
            });
    }
);

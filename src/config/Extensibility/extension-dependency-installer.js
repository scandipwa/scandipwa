/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const { exec } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..', '..', '..');
const { rootsForDeps } = require(`${projectRoot}/extensions.json`);

const ENOENT = -2;

// Handle no installation needed
if (!rootsForDeps.length) {
    console.log('No dependency installation for extensions needed');
    return;
}

console.log('Installing dependencies for extensions');

/**
 * Wrapper for child_process.exec to work with modern async
 * @param {String} cmd
 * @param {Object} options
 * @returns {Promise}
 */
function execAsync(cmd, options) {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (error, stdout) => {
            if (error) reject(error);
            resolve(stdout);
        });
    });
}

/**
 * Log success for specific directory dependency installation and provide stdout
 * @param {String} directory
 * @param {String} stdout
 */
function logSuccess(directory, stdout) {
    console.log(`Successfully installed dependencies in ${directory}: ${stdout}`);
}

/**
 * Asynchronously install node dependencies into certain directory
 * @param {String} directory where to run `npm ci` or `npm i`
 */
function installDepsAsync(absolutePath) {
    execAsync('npm ci', { cwd: absolutePath })
        .then(stdout => logSuccess(absolutePath, stdout))
        .catch((err) => {
            // Explain ENOENT = no directory and return if so
            if (err.errno === ENOENT) {
                console.log(
                    `Directory does not exist: ${
                        absolutePath
                    }\nMake sure you are referencing it correctly in extensions.json`
                );

                return;
            }
            // Handle no package-lock: run `npm i`
            if (err.code === 1) {
                execAsync('npm i', { cwd: absolutePath })
                    .then(stdout => logSuccess(absolutePath, stdout))
                    .catch(err => console.error(err.message));

                return;
            }
            // Log error if unhandled
            console.error(err.message);
        });
}

execAsync('pwd')
    .then((currentPath) => {
        // in .local or .frontend
        if (!!currentPath.match(/app\/design\/frontend/) || !!currentPath.match(/\/vendor\//)) {
            return path.resolve(projectRoot, '..', '..', '..', '..', '..');
        }
        // host or .core
        if (currentPath.match(/\/localmodules\//)) {
            return path.resolve(projectRoot, '..', '..');
        }
        throw new Error('Cannot resolve path to magento root');
    })
    .then((magentoRoot) => {
        rootsForDeps.forEach(dir => installDepsAsync(`${path.join(magentoRoot, dir)}`));
    })
    .catch(err => console.error(err));

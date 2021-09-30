/**
 * @fileoverview File structure must comply to the strict guidelines of ScandiPWA
 * @author Jegors Batovs
 */

const path = require('path');

/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
function checkFileName(exploded) {
    const fullFileName = exploded[exploded.length - 1];
    // Index.js is always OK
    if (fullFileName === 'index.js') {
        return true;
    }

    // Do not check paths containing these directories in them
    if (exploded.some(elem => ['style', 'query', 'type', 'util'].includes(elem))) {
        return true;
    }

    const directoryName = exploded[exploded.length - 2];
    const [pureFileName] = fullFileName.split('.');

    // Is OK when file name matches directory name
    if (pureFileName === directoryName) {
        return true;
    }

    return false;
}


/**
 * Returns name of the directory, if file postfix does not match expected.
 */
function checkPostfix(exploded) {
    const [filename, postfix] = exploded[exploded.length - 1].split('.');

    if (filename === 'index' && postfix === 'js') {
        return false;
    }
    // Check if postfix is expected for the directory
    switch (exploded[0]) {
    case 'component':
    case 'route':
        if (!(['component', 'container', 'style', 'config', 'unstated'].includes(postfix))) {
            return exploded[0];
        }
        break;
    case 'store':
        if (!(['action', 'dispatcher', 'reducer'].includes(postfix))) {
            return exploded[0];
        }
        break;
    case 'query':
        if (!(postfix === 'query')) {
            return exploded[0];
        }
        break;
    case 'style':
        if (!(postfix === 'scss')) {
            return exploded[0];
        }
        break;
    case 'type':
        if (!(postfix === 'js')) {
            return exploded[0];
        }
        break;
    default:
        // no naming convention for util
        // others cases unexpected, ignoring.
        break;
    }

    return false;
}

/**
 * Checks file structure depth for specific path
 */
function checkDepth(exploded) {
    switch (exploded[0]) {
    case 'route':
    case 'component':
    case 'store':
    case 'util':
        return exploded.length <= 3;
    case 'query':
    case 'type':
        return exploded.length <= 2;
    default:
        return true;
    }
}

module.exports = {
    meta: {
        docs: {
            description: 'File structure must comply to the strict guidelines of ScandiPWA',
            category: 'Coding standard',
            recommended: false
        },
        fixable: 'code'
    },

    create: context => ({
        Program(node) {
            const filePath = context.getFilename();
            if (filePath.indexOf('pwa/src/app') !== -1 || filePath.indexOf('base-theme/src/app') !== -1) {
                const pathKey = filePath.indexOf('pwa/src/app') !== -1 ? 'pwa/src/app' : 'base-theme/src/app';
                const relativeToApp = filePath.slice(filePath.indexOf(pathKey) + pathKey.length + 1);
                const exploded = relativeToApp.split(path.sep);

                if (!([
                    'component', 'query', 'route', 'store', 'style', 'type', 'util', 'index.js'
                ].includes(exploded[0]))) {
                    context.report({
                        node,
                        message: 'Extending app directory with custom directories is prohibited.'
                    });
                }

                if (!checkFileName(exploded)) {
                    context.report({
                        node,
                        message: 'File name should match directory name + postfix (if postfix is needed)'
                    });
                }

                if (!checkDepth(exploded)) {
                    context.report({
                        node,
                        message: 'Nesting directories is against the principle of flat file structure and is prohobited'
                    });
                }

                const fileName = exploded[exploded.length - 1];
                if (fileName !== 'index.js') {
                    const directoryThatDoesNotFit = checkPostfix(exploded);
                    if (directoryThatDoesNotFit) {
                        context.report({
                            node,
                            message: `Postfix of this file does not comply with the ScandiPWA naming convention for the '${directoryThatDoesNotFit}' directory`
                        });
                    }
                }
            }
        }
    })
};

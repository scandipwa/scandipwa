/* eslint-disable guard-for-in, fp/no-let, no-console, max-len, import/no-dynamic-require, global-require, fp/no-loops, no-restricted-syntax */
const path = require('path');
const semver = require('semver');
const { getPackageJson } = require('@scandipwa/scandipwa-dev-utils/package-json');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

let visitedDeps = [];

/**
 * Recursively get "composer" field from all package.json,
 * do the same for all module dependencies.
 *
 * @param {string} modulePath
 * @return {array} an array of object entries.
 */
const getComposerDeps = (modulePath, context = modulePath) => {
    if (visitedDeps.indexOf(modulePath) !== -1) {
        return [];
    }

    visitedDeps.push(modulePath);

    const {
        dependencies = {},
        scandipwa: {
            composer = []
        } = {}
    } = getPackageJson(modulePath, context);

    return Object.keys(dependencies).reduce(
        (acc, dependency) => acc.concat(getComposerDeps(dependency, context)),
        Object.entries(composer)
    );
};

/**
 * Validate composer.json (ensure it requires all requested by npm dependencies modules)
 *
 * @param {string} [pathname=process.cwd()]
 * @return {boolean} is composer is valid or not
 */
const isValidComposer = (pathname = process.cwd()) => {
    // reset visited deps, in case it's the second call to this function
    visitedDeps = [];

    const requestedComposerDeps = getComposerDeps(pathname);

    // Index the composer deps from array of object entries.
    // Object should contain the ranges requested by requested module name
    const indexedComposerDeps = requestedComposerDeps.reduce((acc, [module, version]) => {
        if (!acc[module]) {
            acc[module] = [];
        }

        if (acc[module].indexOf(version) === -1) {
            acc[module].push(version);
        }

        return acc;
    }, {});

    let composerContent = {};

    try {
        // Try loading the composer file in - if failed, show error.
        composerContent = require(path.join(pathname, 'composer.json'));
    } catch (e) {
        if (e.message.includes('Unexpected end of JSON input')) {
            logger.error(`The required file ${ logger.style.file('composer.json') } contains invalid JSON!`);
        } else {
            logger.error(`The required file ${ logger.style.file('composer.json') } was not found!`);
        }

        return false;
    }

    const { require: composerDeps } = composerContent;

    if (!composerDeps) {
        logger.error(`The required field ${ logger.style.misc('require') } is missing in ${ logger.style.file('composer.json') }.`);
        return false;
    }

    for (const composerModule in indexedComposerDeps) {
        // Loop over the indexed composer dependencies, check:
        // - if the version requested is valid
        // - if the version requested is possible to satisfy
        // - if the version requested is present in composer
        // - if the version requested satisfies version required

        const userDepVersion = composerDeps[composerModule];
        let rangeRequested = [];

        // Validate if the version required is valid
        if (userDepVersion && !semver.validRange(userDepVersion)) {
            logger.error(`Required composer module ${ logger.style.misc(composerModule) } version ${ logger.style.misc(userDepVersion) } is invalid.`);
            return false;
        }

        // Validate if the version requested is valid
        for (let i = 0; i < indexedComposerDeps[composerModule].length; i++) {
            const version = indexedComposerDeps[composerModule][i];

            if (semver.validRange(version)) {
                rangeRequested.push(version);
            } else {
                logger.error(`The requested version ${ logger.style.misc(version) } of ${ logger.style.misc(composerModule) } is invalid.`);
                return false;
            }
        }

        rangeRequested = rangeRequested.join(' ');

        // This one is unstable and can not calculate value properly.
        // An issue to track: https://github.com/npm/node-semver/issues/340
        const { raw: minVersionRaw } = semver.minVersion(rangeRequested) || {};

        // Validate if the version requested is possible to satisfy
        if (!minVersionRaw) {
            logger.error(
                'The requested composer package versions conflict!',
                `There are no versions of ${ logger.style.misc(composerModule) } matching the range ${ logger.style.misc(rangeRequested) }!`
            );
        }

        const minVersionString = logger.style.code(`"${ composerModule }": "${ minVersionRaw }"`);

        // Validate if the version requested is present in composer + shwo notice about minimum version
        if (!composerDeps[composerModule]) {
            logger.error(
                'The requested composer package is missing!',
                `Please add ${ minVersionString } to ${ logger.style.misc('require') } section of ${ logger.style.file('composer.json') }!`
            );

            logger.note(
                `The ${ logger.style.misc(minVersionRaw) } version is the minimum requested version.`,
                `Update it at you own risk! The version of choice must meet following constraints: ${ logger.style.misc(rangeRequested) }!`
            );

            return false;
        }

        if (rangeRequested === '*') {
            // eslint-disable-next-line no-continue
            continue;
        }

        const { raw: minUserDepVersion } = semver.minVersion(userDepVersion);

        // Check if the version requested satisfies version required
        // if the version required is a range, take min version of it and
        // validate it agains the range.
        if (!semver.satisfies(minUserDepVersion, rangeRequested)) {
            logger.error(
                'Composer module required is conflicting with requested module versions.',
                `Please update ${ logger.style.misc(composerModule) } version to ${ logger.style.misc(minVersionRaw) }.`
            );

            logger.note(
                `The ${ logger.style.misc(minVersionRaw) } version is the minimum requested version.`,
                `Update it at you own risk! The version of choice must meet following constraints: ${ logger.style.misc(rangeRequested) }!`
            );

            return false;
        }
    }

    return true;
};

module.exports = {
    isValidComposer,
    getComposerDeps,
    getPackageJson
};

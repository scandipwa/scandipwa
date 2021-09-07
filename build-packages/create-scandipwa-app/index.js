#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const isValidPackageName = require('@scandipwa/scandipwa-dev-utils/validate-package-name');
const semver = require('semver');
const getLatestVersion = require('@scandipwa/scandipwa-dev-utils/latest-version');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

const templateMap = {
    theme: require('@scandipwa/csa-generator-theme'),
    blank: require('@scandipwa/csa-generator-blank'),
    cra: require('@scandipwa/csa-generator-cra')
};

const createApp = async (options) => {
    const { template } = options;

    try {
        const generator = templateMap[template];
        const timeStamp = Date.now() / 1000;

        if (generator) {
            // Run generator if it is available
            generator(options);
            return;
        }

        // show error log if non-existing template was passed
        const templatesAvailable = Object.keys(templateMap).map(
            (key) => logger.style.misc(key)
        );

        logger.error(
            `The required template ${ logger.style.misc(template) } does not exist.`,
            `The available templates are: ${ templatesAvailable.join(', ') }.`
        );

        googleAnalytics.trackTiming('CSA installation time', Date.now() / 1000 - timeStamp);
        googleAnalytics.printAboutAnalytics();
    } catch (e) {
        logger.logN(e);
        logger.error('Something went wrong during setup. Error log above.');
        logger.logN();
        googleAnalytics.printAboutAnalytics();
        googleAnalytics.trackError((e.message || e));
    }
};

const init = async (options) => {
    try {
        // Validate we are on the latest version of the application
        const latest = await getLatestVersion('create-magento-app');
        const packageJson = require('./package.json');

        if (semver.lt(packageJson.version, latest)) {
            logger.error(
                `You are running ${logger.style.misc('create-scandipwa-app')} ${logger.style.misc(packageJson.version)}, which is behind the latest release ${logger.style.misc(latest)}.`,
                'We no longer support global installation of Create ScandiPWA App.'
            );

            logger.log('Please remove any global installs with one of the following commands:');
            logger.logT('npm uninstall -g create-scandipwa-app');
            logger.logT('yarn global remove create-scandipwa-app');

            process.exit(1);
        }
    } catch (e) {
        logger.warn(
            `Package ${ logger.style.misc('create-scandipwa-app') } is not yet published.`
        );
    }

    await createApp(options);
};

// eslint-disable-next-line no-unused-expressions
yargs.command(
    '$0 <destination>',
    'Create ScandiPWA App',
    (yargs) => {
        yargs.example(
            '$0 my-app',
            `Creates a new ScandiPWA application in the "my-app" folder relative to current
             working directory. The application package name would be "my-app".`
        );

        yargs.example(
            '$0 packages/@scandipwa/theme',
            `Creates a new ScandiPWA application in the "packages/theme" folder relative
             to current working directory. The application package name would be "@scandipwa/theme".`
        );

        yargs.option(
            'template',
            {
                alias: 't',
                describe: 'Template to create ScandiPWA app from.',
                type: 'string',
                default: 'theme',
                nargs: 1
            }
        );
    },
    async (args) => {
        const { destination, template } = args;

        const pathArr = destination.split(path.sep);
        const orgPathArray = pathArr.slice(-2);
        const isOrg = orgPathArray[0].startsWith('@');

        const packageName = isOrg
            ? path.join(...orgPathArray)
            : pathArr[pathArr.length - 1];

        if (!isValidPackageName(packageName)) {
            process.exit(1);
        }

        const pathToDist = isOrg
            ? path.join(...pathArr.slice(0, -2), orgPathArray[1])
            : path.join(...pathArr);

        const options = {
            template,
            /**
             * In case pathArr is something like ['projects', '@scandipwa', 'test']
             * it should return '@scandipwa/test' as name as 'projects/test' as path.
             */
            name: packageName,
            path: pathToDist
        };

        await init(options);
    }
).argv;

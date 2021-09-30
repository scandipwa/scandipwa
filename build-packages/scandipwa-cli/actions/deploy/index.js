const fs = require('fs');
const path = require('path');

const shouldUseYarn = require('@scandipwa/scandipwa-dev-utils/should-use-yarn');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const execCommandAsync = require('@scandipwa/scandipwa-dev-utils/exec-command');
const { getPackageJson } = require('@scandipwa/scandipwa-dev-utils/package-json');
const { walkDirectoryUp, contextTypes: { THEME_TYPE } } = require('@tilework/mosaic-dev-utils/get-context');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

const compressDirectory = require('./lib/compress-directory');
const triggerPortal = require('./lib/trigger-portal');
const uploadFile = require('./lib/upload-file');

const deploy = async (argv) => {
    const {
        branch: branchName = 'master'
    } = argv;

    const { type: context, pathname: contextPathname } = walkDirectoryUp(process.cwd(), THEME_TYPE);

    if (!context) {
        // make sure we are in ScandiPWA theme context
        logger.error(
            'To deploy your code you must be located in ScandiPWA theme directory.',
            `We looked up six folders up starting from ${ logger.style.file(process.cwd()) }!`,
            `There was no folders containing ${ logger.style.file('package.json') }, where ${ logger.style.misc('scandipwa.type') } field was equal to ${ logger.style.misc('theme') }.`
        );

        process.exit(1);
    }

    // prepare application data
    const packageJson = getPackageJson(contextPathname);
    const appData = {
        appId: process.env.APP_ID || packageJson.scandipwa.staticDeploy || '',
        branchName,
        proxyServer: packageJson.proxy || ''
    };
    let archivePath;

    try {
        // build theme and compress it
        const command = shouldUseYarn() ? 'yarnpkg' : 'npm';
        await execCommandAsync(command, ['run', 'build'], contextPathname);
        archivePath = await compressDirectory(contextPathname, 'build');
    } catch (e) {
        logger.log(e);

        logger.error(
            'Failed to build and compress your code.',
            'See the error log above.'
        );

        googleAnalytics.trackError(e);
        googleAnalytics.printAboutAnalytics();

        process.exit(1);
    }

    try {
        // trigger application creation and get deployment data from portal
        const registerResponse = await triggerPortal('register-deployment', appData);

        const {
            appId,
            jobId,
            zipUploadUrl,
            domain
        } = await registerResponse.json();

        // upload new build version to provided url
        await uploadFile(archivePath, zipUploadUrl);

        // clean tmp folder
        fs.unlink(archivePath, (err) => {
            if (err) {
                logger.error(err);
                googleAnalytics.trackError(err);
                googleAnalytics.printAboutAnalytics();
                process.exit(1);
            }

            logger.log('Build archive successfully removed.');
        });

        // start deployment
        await triggerPortal(
            'deploy',
            {
                appId,
                branchName,
                jobId
            }
        );

        // save appId if it doesn't exist
        if (!packageJson.scandipwa.staticDeploy) {
            packageJson.scandipwa.staticDeploy = appId;
            writeJson(
                path.join(contextPathname, 'package.json'),
                packageJson
            );
        }

        logger.log(`Congrats, your code will be deployed in a few minutes! You can access it here: ${ logger.style.link(domain) }`);
    } catch (e) {
        logger.log(e);

        logger.error(
            'Failed to deploy your code. Most probably there is an issue on our side.',
            'See the error log above.'
        );

        googleAnalytics.trackError(e);
        googleAnalytics.printAboutAnalytics();
        process.exit(1);
    }
};

module.exports = (yargs) => {
    yargs.command('deploy', 'Deploy an application.', () => {
        // TODO: implement new branch creation
        // yargs.option('branch', {
        //     describe: 'Branch name. Default: master.'
        // });
    }, deploy);
};

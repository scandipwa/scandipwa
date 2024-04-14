const path = require('path');
const installDeps = require('@scandipwa/scandipwa-dev-utils/install-deps');
const createFilesystem = require('@scandipwa/scandipwa-dev-utils/create-filesystem');
const getLatestVersion = require('@scandipwa/scandipwa-dev-utils/latest-version');
const shouldUseYarn = require('@scandipwa/scandipwa-dev-utils/should-use-yarn');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { getComposerDeps } = require('@scandipwa/scandipwa-dev-utils/composer');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');

const DEFAULT_PROXY = 'https://40kskudemo.scandipwa.com/';

const ensureLatestComposer = (pathname) => {
    const composerDeps = getComposerDeps(pathname);
    const composerPath = path.join(pathname, 'composer.json');
    const composerJson = require(composerPath);
    composerJson.require = Object.fromEntries(composerDeps);
    writeJson(composerPath, composerJson);
};

const greet = (
    name,
    pathname
) => {
    const relativePathname = `.${ path.sep }${ pathname }`;
    const displayedCommand = shouldUseYarn() ? 'yarn' : 'npm run';

    logger.logN(`Success! Created ScandiPWA theme "${ logger.style.misc(name) }" at ${ logger.style.file(relativePathname) }!`);

    logger.log('Inside that directory, you can run several commands:');
    logger.logT(
        logger.style.command(`${displayedCommand} start`),
        logger.style.comment('Starts the development server')
    );
    logger.logT(
        logger.style.command(`${displayedCommand} build`),
        logger.style.comment('Bundles the app into static files for production')
    );

    logger.note(
        'To bundle your application as the Magento 2 theme',
        `add ${ logger.style.command('BUILD_MODE=magento') } environment variable before running the script!`,
        '',
        `Your Magento 2 theme name is "${ logger.style.misc(`scandipwa/${ name }`) }"!`
    );

    logger.log('We suggest that you begin by typing:');
    logger.logT(logger.style.command('cd'), relativePathname);
    logger.logT(logger.style.command(`${displayedCommand} start`));

    logger.log(); // add empty line
    logger.logN('Happy coding! <3');
};

const fileSystemCreator = (templateOptions) => (
    (
        filesystem,
        templatePath,
        destinationPath
    ) => {
        filesystem.copyTpl(
            templatePath('package.json'),
            destinationPath('package.json'),
            templateOptions
        );

        filesystem.copyTpl(
            templatePath('tsconfig.json'),
            destinationPath('tsconfig.json'),
            templateOptions
        );

        filesystem.copyTpl(
            templatePath('.eslintrc.js'),
            destinationPath('.eslintrc.js'),
            templateOptions
        );

        filesystem.copyTpl(
            templatePath('yarn.lock.cached'),
            destinationPath('yarn.lock'),
            templateOptions
        );

        filesystem.copyTpl(
            templatePath('composer.json'),
            destinationPath('composer.json'),
            templateOptions
        );

        filesystem.copy(
            templatePath('sample.gitignore'),
            destinationPath('.gitignore')
        );

        filesystem.copy(
            templatePath('README.md'),
            destinationPath('README.md')
        );

        filesystem.copyTpl(
            templatePath('magento/**/*'),
            destinationPath('magento'),
            templateOptions
        );

        filesystem.copy(
            templatePath('i18n/**/*'),
            destinationPath('i18n'),
            { globOptions: { dot: true } }
        );

        filesystem.copy(
            templatePath('public/**/*'),
            destinationPath('public'),
            { globOptions: { dot: true } }
        );

        filesystem.copy(
            templatePath('src/**/*'),
            destinationPath('src'),
            { globOptions: { dot: true } }
        );
    }
);

const run = async (options) => {
    const {
        name,
        path: pathname,
    } = options;

    const destination = path.join(process.cwd(), pathname);

    let scandipwaVersion = '0.0.0';
    let scandipwaScriptsVersion = '0.0.0';
    let mosaicVersion = '0.0.0';
    let eslintConfigVersion = '0.0.0';
    let mosaicCracoVersion = '0.0.0';
    let tsServerPluginVersion = '0.0.0';
    const postcssVersion = '8.4.5';
    const reactVersion = '18.2.0';
    const reactDomVersion = '18.2.0';
    const reactTypesVersion = '18.2.74';
    const reactReduxVersion = '8.0.2';
    const nodeTypesVersion = '20.12.4';
    const typescriptTransformPluginVersion = '7.20.2';
    const proposalPrivatePropertyInObjectPluginVersion = '7.21.11';
    const transformPrivatePropertyInObjectPluginVersion = '7.24.1';

    try {
        scandipwaVersion = await getLatestVersion('@scandipwa/scandipwa');
    } catch (e) {
        logger.warn(
            `Package ${ logger.style.misc('@scandipwa/scandipwa') } is not yet published.`
        );
    }

    try {
        scandipwaScriptsVersion = await getLatestVersion('@scandipwa/scandipwa-scripts');
    } catch (e) {
        logger.warn(
            `Package ${ logger.style.misc('@scandipwa/scandipwa-scripts') } is not yet published.`
        );
    }

    try {
        tsServerPluginVersion = await getLatestVersion('@scandipwa/ts-server-plugin');
    } catch (e) {
        logger.warn(
            `Package ${ logger.style.misc('@scandipwa/ts-server-plugin') } is not yet published.`
        );
    }

    try {
        mosaicVersion = await getLatestVersion('@tilework/mosaic');
    } catch (e) {
        logger.warn(
            `Unable to determine the latest version of package ${logger.style.misc('@tilework/mosaic')}`
        );
    }

    try {
        eslintConfigVersion = await getLatestVersion('@scandipwa/eslint-config');
    } catch (e) {
        logger.warn(
            `Unable to determine the latest version of package ${logger.style.misc('@tilework/mosaic')}`
        );
    }

    try {
        mosaicCracoVersion = await getLatestVersion('@tilework/mosaic-craco');
    } catch (e) {
        logger.warn(
            `Unable to determine the latest version of package ${logger.style.misc('@tilework/mosaic-craco')}`
        );
    }

    const templateOptions = {
        scandipwaVersion,
        scandipwaScriptsVersion,
        tsServerPluginVersion,
        name,
        mosaicVersion,
        mosaicCracoVersion,
        postcssVersion,
        reactVersion,
        reactDomVersion,
        reactTypesVersion,
        reactReduxVersion,
        nodeTypesVersion,
        proxy: DEFAULT_PROXY,
        eslintConfigVersion,
        typescriptTransformPluginVersion,
        proposalPrivatePropertyInObjectPluginVersion,
        transformPrivatePropertyInObjectPluginVersion,
    };

    // create filesystem from template
    await createFilesystem(
        destination,
        path.join(__dirname, 'template'),
        fileSystemCreator(templateOptions)
    );

    // install dependencies
    await installDeps(destination);

    ensureLatestComposer(destination);

    // greet the user
    greet(name, pathname);
};

module.exports = run;

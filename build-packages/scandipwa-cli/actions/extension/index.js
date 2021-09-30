const { createExtension, installExtension } = require('@scandipwa/scandipwa-development-toolkit-core');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const googleAnalytics = require('@scandipwa/scandipwa-dev-utils/analytics');

module.exports = (yargs) => {
    yargs.command('extension <command>', 'Interact with extension', (yargs) => {
        yargs.command('install <name>', 'Install and enable ScandiPWA extension', (yargs) => {
            yargs.option('no-enable', {
                describe: 'Do not enable installed extension.'
            });

            yargs.option('local', {
                alias: 'l',
                describe: `Use a local module from ${logger.style.file('packages/<name>')}`,
                type: 'boolean',
                default: false
            });

            yargs.option('use', {
                alias: 'u',
                describe: 'Use a local module from the specified path',
                type: 'string'
            });

            yargs.option('version', {
                alias: 'v',
                describe: 'Define a specific version to use',
                type: 'string'
            });

            yargs.option('save-dev', {
                alias: 'D',
                describe: 'Install the package as a devDependency',
                type: 'boolean'
            });
        }, async ({
            name,
            noEnable,
            use: explicitlyDefinedPath,
            local: useLocalPackage,
            version,
            saveDev
        }) => {
            const installedSuccessfully = await installExtension(
                name,
                version,
                saveDev,
                !noEnable,
                process.cwd(),
                logger,
                explicitlyDefinedPath,
                useLocalPackage
            );

            if (!installedSuccessfully) {
                return;
            }

            logger.note(
                'Success!',
                `Package ${logger.style.misc(name)} has been installed!`
            );

            googleAnalytics.trackEvent('cli-extension-installation', name, 0, 'extension');
            googleAnalytics.printAboutAnalytics();
        });

        /* yargs.command('search <query>', 'Search for available extension.', () => {}, (argv) => {
            // TODO: implement search extension
            console.log('srch', argv);
        }); */

        yargs.command('create <name>', 'Create and enable new ScandiPWA extension', (yargs) => {
            yargs.option('no-enable', {
                describe: 'Do not enable installed extension.',
                default: false
            });
        }, async ({ name, noEnable }) => {
            const isCreatedSuccessfully = await createExtension(name, !noEnable, process.cwd(), logger);

            if (isCreatedSuccessfully) {
                googleAnalytics.trackEvent('cli-extension-creation', name, 0, 'extension');
                googleAnalytics.printAboutAnalytics();
            }
        });

        yargs.demandCommand();
    });
};

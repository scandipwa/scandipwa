const withTargetDirectory = (yargs) => yargs
    .option('target-module', {
        describe: 'Path to the module to generate functionality in',
        alias: 't',
        type: 'string'
    });

module.exports = withTargetDirectory;

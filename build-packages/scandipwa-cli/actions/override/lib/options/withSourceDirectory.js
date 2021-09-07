const withSourceDirectory = (yargs) => yargs
    .option('source-module', {
        describe: 'Path to the module to override functionality of',
        alias: 's',
        type: 'string'
    });

module.exports = withSourceDirectory;

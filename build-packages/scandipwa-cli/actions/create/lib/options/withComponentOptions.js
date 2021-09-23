const withComponentOptions = (yargs) => yargs
    .option('container', {
        describe: 'Create a container',
        alias: 'c',
        type: 'boolean',
        default: false
    })
    .option('redux', {
        describe: 'Connect to redux',
        alias: 'r',
        type: 'boolean',
        default: false
    });

module.exports = withComponentOptions;

const withStoreOptions = (yargs) => yargs
    .option('dispatcher-type', {
        describe: 'Type of dispatcher to create',
        alias: 'd',
        choices: ['query', 'regular', 'no'],
        default: 'no'
    });

module.exports = withStoreOptions;

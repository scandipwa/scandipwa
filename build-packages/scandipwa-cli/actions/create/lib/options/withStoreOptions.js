const withStoreOptions = (yargs) => yargs
    .option('dispatcher-type', {
        describe: 'Type of dispatcher to create',
        alias: 'd',
        choices: ['query', 'regular', 'no'],
        default: 'no',
    })
    .option('typescript', {
        describe: 'Should component be creates as TypeScript file',
        alias: 'ts',
        type: 'boolean',
    });

module.exports = withStoreOptions;

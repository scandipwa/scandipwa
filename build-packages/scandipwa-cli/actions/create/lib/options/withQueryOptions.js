const withQueryOptions = (yargs) => yargs
    .option('typescript', {
        describe: 'Should component be creates as TypeScript file',
        alias: 'ts',
        type: 'boolean',
    });

module.exports = withQueryOptions;

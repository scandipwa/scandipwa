const withTypescript = (yargs) => yargs
    .option('typescript', {
        describe: 'Should component be overridden as TypeScript file',
        alias: 'ts',
        type: 'boolean',
        default: false,
    });

module.exports = withTypescript;

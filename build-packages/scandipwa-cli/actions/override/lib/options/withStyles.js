const { StylesOption } = require('@scandipwa/scandipwa-development-toolkit-core');

const withStyles = (yargs) => yargs
    .option('styles', {
        describe: 'Styles option',
        alias: 'S',
        type: 'string',
        choices: Object.values(StylesOption)
    });

module.exports = withStyles;

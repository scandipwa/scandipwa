const { StylesOption } = require('@scandipwa/scandipwa-development-toolkit-core');

const withStyles = (yargs) => yargs
    .option('styles', {
        describe: 'Styles option',
        alias: 'S',
        type: 'string',
        choices: Object.values(StylesOption)
    })
    .option('style-postfix', {
        describe: 'Styles postfix (default: "override")',
        alias: 'P',
        type: 'string',
        default: 'override'
    });

module.exports = withStyles;

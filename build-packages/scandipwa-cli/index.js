#!/usr/bin/env node
const checkForUpdates = require('@scandipwa/scandipwa-dev-utils/check-for-updates');
const yargs = require('yargs');

const actions = [
    require('./actions/extension'),
    require('./actions/create'),
    require('./actions/override'),
    require('./actions/deploy')
];

(async () => {
    // Ensure update banner for outdated installations
    const { name, version } = require('./package.json');
    await checkForUpdates(name, version);

    yargs
        .scriptName('scandipwa')
        .demandCommand();

    yargs
        .alias('v', 'version');

    // Initialize program actions
    actions.forEach((action) => action(yargs));

    // eslint-disable-next-line no-unused-expressions
    yargs.argv;
})();

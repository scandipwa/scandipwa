/* eslint-disable */
const { ResourceType } = require('@scandipwa/scandipwa-development-toolkit-core');
const withTargetDirectory = require('../../common/options/withTargetDirectory');
const withSourceDirectory = require('./lib/options/withSourceDirectory');
const withStyles = require('./lib/options/withStyles');

const extender = require('./lib/extender');

module.exports = (yargs) => {
    yargs.command('override <resource type>', 'Override an existing resource', (yargs) => {
        yargs.command(
            'component <name>',
            'Override a component',
            (yargs) => withStyles(withTargetDirectory(withSourceDirectory(yargs))),
            extender(ResourceType.Component)
        );

        yargs.command(
            'route <name>',
            'Override a route',
            (yargs) => withStyles(withTargetDirectory(withSourceDirectory(yargs))),
            extender(ResourceType.Route)
        );

        yargs.command(
            'store <name>',
            'Override a store',
            (yargs) => withSourceDirectory(withTargetDirectory(yargs)),
            extender(ResourceType.Store)
        );

        yargs.command(
            'query <name>',
            'Override a query',
            (yargs) => withSourceDirectory(withTargetDirectory(yargs)),
            extender(ResourceType.Query)
        );
    });
};

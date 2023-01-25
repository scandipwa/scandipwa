/* eslint-disable no-console */
const { ResourceType } = require('@scandipwa/scandipwa-development-toolkit-core');

const creator = require('./lib/creator');
const componentOptions = require('./lib/options/withComponentOptions');
const storeOptions = require('./lib/options/withStoreOptions');
const queryOptions = require('./lib/options/withQueryOptions');
const withTargetDirectory = require('../../common/options/withTargetDirectory');

module.exports = (yargs) => {
    yargs.command('create <resource type>', 'Create a new resource', (yargs) => {
        yargs.command(
            'component <name>',
            'Create a component',
            (yargs) => componentOptions(withTargetDirectory(yargs)),
            creator(ResourceType.Component)
        );

        yargs.command(
            'route <name>',
            'Create a route',
            (yargs) => componentOptions(withTargetDirectory(yargs)),
            creator(ResourceType.Route)
        );

        yargs.command(
            'store <name>',
            'Create a store',
            (yargs) => storeOptions(withTargetDirectory(yargs)),
            creator(ResourceType.Store)
        );

        yargs.command(
            'query <name>',
            'Create a query',
            (yargs) => queryOptions(withTargetDirectory(yargs)),
            creator(ResourceType.Query)
        );
    });
};

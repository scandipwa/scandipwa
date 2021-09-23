const path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const originalCWD = process.cwd();
process.chdir(path.resolve(`../../node_modules/@tilework/mosaic-cra-scripts`));

const { initialize } = require('@tilework/mosaic-craco/scripts/script');

const { overrideWebpackDev } = require('@tilework/mosaic-craco/lib/features/webpack/override');
const { overrideDevServer } = require('@tilework/mosaic-craco/lib/features/dev-server/override');

process.chdir(originalCWD);

const {craco, context} = initialize();

const config = craco.then(
    (cracoConfig) => {
        overrideWebpackDev(cracoConfig, context);
        overrideDevServer(cracoConfig, context);
        return cracoConfig
    }
);

module.exports = config;

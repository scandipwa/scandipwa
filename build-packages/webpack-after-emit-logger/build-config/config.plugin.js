const WebpackAfterEmitLogger = require('./webpack-after-emit-logger');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            webpackConfig.plugins.push(new WebpackAfterEmitLogger());

            return webpackConfig;
        }
    }
};

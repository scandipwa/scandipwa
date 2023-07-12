/* eslint-disable no-param-reassign */

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            webpackConfig.resolve.alias.react = 'preact/compat';
            webpackConfig.resolve.alias['react-dom'] = 'preact/compat';

            // For development mode add preact debug library.
            if (process.env.NODE_ENV === 'development') {
                const { entry } = webpackConfig;
                webpackConfig.entry = ['preact/debug'].concat(entry);
            }

            webpackConfig.plugins.forEach((plugin) => {
                if (plugin.definitions?.PureComponent) {
                    // plugin.definitions.PureComponent[0] = 'preact/compat';
                    delete plugin.definitions.PureComponent;
                }
            });

            return webpackConfig;
        },
    },
};

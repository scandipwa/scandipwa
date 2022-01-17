const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    plugin: {
        overrideCracoConfig: ({
            cracoConfig
        }) => {
            cracoConfig.webpack.plugins.push(new StylelintPlugin({
                threads: true,
                files: ['src']
            }));

            return cracoConfig;
        }
    }
};

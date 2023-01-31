const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugin: {
        overrideCracoConfig: async ({
            cracoConfig,
        }) => {
            cracoConfig.webpack.plugins.push(new BundleAnalyzerPlugin(
                process.env.NODE_ENV === 'production'
                    ? {
                        analyzerMode: 'static',
                        reportFilename: 'report.html',
                        defaultSizes: 'gzip',
                    }
                    : {
                        defaultSizes: 'gzip',
                    }
            ));

            return cracoConfig;
        },
    },
};

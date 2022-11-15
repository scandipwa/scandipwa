const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugin: {
        overrideCracoConfig: async ({
            cracoConfig,
        }) => {
            if (process.env.NODE_ENV === 'production') {
                return cracoConfig;
            }

            const HOST = process.env.HOST || '0.0.0.0';
            const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

            cracoConfig.webpack.plugins.push(new BundleAnalyzerPlugin({
                analyzerHost: HOST,
                analyzerPort: DEFAULT_PORT,
            }));

            return cracoConfig;
        },
    },
};

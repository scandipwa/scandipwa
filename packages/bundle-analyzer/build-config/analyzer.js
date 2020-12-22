const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

module.exports = {
    plugin: {
        overrideCracoConfig: async ({
            cracoConfig
        }) => {
            if (process.env.NODE_ENV === 'production') {
                return cracoConfig;
            }

            const HOST = process.env.HOST || '0.0.0.0';
            const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
            const analyzerPort = await choosePort(HOST, DEFAULT_PORT);

            cracoConfig.webpack.plugins.push(new BundleAnalyzerPlugin({
                analyzerHost: HOST,
                analyzerPort
            }));

            return cracoConfig;
        }
    }
};

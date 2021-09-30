// Load the locale map with import injector
const addTemplatesMiddleware = (webpackConfig, templatePath) => {
    webpackConfig.module.rules.push({
        test: templatePath,
        loader: require.resolve('../webpack-template-plugin-loader')
    });
};

const addDefaultHtmlLoader = (webpackConfig) => {
    webpackConfig.module.rules.push({
        test: /\.(p?html|php)$/,
        loader: require.resolve('../default-html-loader')
    });
};

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
            const templatePath = cracoConfig.paths.appHtml;

            // Ensure that the HTML template itself is handled
            // The loader coming from the HtmlWebpackPlugin is disabled from within itself
            // Because "some other" HTML loader (the middleware one) is enabled
            addDefaultHtmlLoader(webpackConfig, templatePath);

            // Add the loader (middleware) that ensures template plugins
            addTemplatesMiddleware(webpackConfig, templatePath);

            return webpackConfig;
        }
    }
};

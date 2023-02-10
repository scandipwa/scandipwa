/* eslint-disable no-param-reassign */
const path = require('path');

class PreloadPlugin {
    addPreloadConfig(compilation, htmlPluginData) {
        const stats = compilation.getStats().toJson({ all: false, chunkGroups: true });
        const cacheGroupWhitelist = ['widget-slider', 'render', 'cms', 'product', 'category'];
        const localeCacheGroup = Object.keys(stats.namedChunkGroups).filter((cacheGroup) => /[a-z]{2}_[A-Z]{2}/.test(cacheGroup));

        const preloadData = [
            ...cacheGroupWhitelist,
            ...localeCacheGroup,
        ].reduce((acc, cacheGroup) => ({
            ...acc,
            [cacheGroup]: stats.namedChunkGroups[cacheGroup].assets.map(
                (asset) => (process.env.PUBLIC_URL
                    ? path.join(process.env.PUBLIC_URL, asset)
                    : `/${asset}`)
            ),
        }), {});

        const scriptHtml = `<script>window.preloadData = ${JSON.stringify(preloadData)};</script>`;
        htmlPluginData.html = htmlPluginData.html.replace('<head>', `<head>${scriptHtml}`);

        return htmlPluginData;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            this.constructor.name,
            (compilation) => {
                // This is set in html-webpack-plugin pre-v4.
                let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;

                if (!hook) {
                    const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
                        (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
                    );
                    // console.log('Unable to find an instance of '
                    //     + 'HtmlWebpackPlugin in the current compilation.');
                    hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
                }

                hook.tapAsync(
                    this.constructor.name,
                    (htmlPluginData, callback) => {
                        try {
                            callback(null, this.addPreloadConfig(compilation, htmlPluginData));
                        } catch (error) {
                            callback(error);
                        }
                    }
                );
            }
        );
    }
}

module.exports = { PreloadPlugin };

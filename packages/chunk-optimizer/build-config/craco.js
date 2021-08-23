/* eslint-disable no-param-reassign */

const fetchModuleParent = (issuer) => {
    const { type } = issuer;
    if (type === 'css/mini-extract') {
        const { issuer: parent } = issuer;
        return fetchModuleParent(parent);
    }

    return issuer;
};

// Styles for plugins are loaded differently into react project,
// because of the way that they are injected, webpack requires them to be stored into main style
// otherwise there will be multiple chunks that are added to header. (all that contain plugin styles).
const isPlugin = (module) => {
    const name = (module.nameForCondition && module.nameForCondition()) || module.resource;

    if (!name) {
        return false;
    }

    // Name based check
    if (!name.endsWith('.plugin.css') && !name.endsWith('.plugin.scss')) {
        // Path based check
        if (!name.indexOf('/plugin/') || name.indexOf('/plugin/') < name.indexOf('/src/')) {
            return false;
        }
    }

    const {
        _chunks: chunks
    } = fetchModuleParent(module);

    // Check if plugin need to go to the main chunk.
    return Array.from(chunks).some(({ name: chunkName = '' }) => chunkName === 'main');
};

// Disables chunk-optimizer rules for specific files and uses Rect/Webpack specific chunks:
// * if file name follows: [name].manual.style.[scss/css] or [name].manual.extended.style.[scss/css]
// * if file is imported via webpackChunkName
const isChunkOptimizationDisabled = (module) => {
    const name = (module.nameForCondition && module.nameForCondition()) || module.resource;

    // If not a style element skip
    if (!name || (!name.endsWith('.css') && !name.endsWith('.scss'))) {
        return false;
    }

    // Support implementation for name tags based chunk:
    if (name.endsWith('.manual.style.scss')
        || name.endsWith('.manual.style.css')
        || name.endsWith('.manual.extended.style.scss')
        || name.endsWith('.manual.extended.style.css')) {
        return true;
    }

    // Support implementation for import via webpackChunkName
    const {
        rawRequest,
        _chunks: chunks,
        issuer: {
            _source: {
                _value: value
            } = {}
        }
    } = fetchModuleParent(module);

    if (!rawRequest || !chunks || !value) {
        return false;
    }

    return Array.from(chunks).some(({ name: chunkName = '' }) => {
        const match = new RegExp(
            `webpackChunkName:\\s*("|')${ chunkName }("|')\\s*\\*\\/\\s*("|')${ rawRequest }`,
            'g'
        );

        return !!match.exec(value);
    });
};

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            // For chunk optimization:
            // JS chunks:
            webpackConfig.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendors: {
                        test: /node_modules[\\/][^(scandipwa|@scandipwa)]/,
                        chunks: 'initial',
                        filename: 'vendors.[contenthash].js',
                        priority: 1,
                        maxInitialRequests: 2, // create only one vendor
                        minChunks: 1
                    },
                    react: {
                        test(module) {
                            return (
                                module.resource
                                && module.resource.includes('node_modules/react')
                            );
                        },
                        chunks: 'initial',
                        filename: 'react.[contenthash].js',
                        priority: 1,
                        maxInitialRequests: 2,
                        minChunks: 1
                    }
                }
            };

            // Style chunks (SCSS/CSS):
            const styleChunks = [{
                name: 'products',
                match: /((p|P)roduct).*\.s?css$/
            }, {
                name: 'checkout',
                match: /((c|C)heckout).*\.s?css$/
            }, {
                name: 'cart',
                match: /((c|C)art).*\.s?css$/
            }, {
                name: 'widget',
                match: /((w|W)idget).*\.s?css$/
            }, {
                name: 'account',
                match: /((a|A)ccount).*\.s?css$/
            }, {
                name: 'category',
                match: /((c|C)ategory).*\.s?css$/
            }, {
                name: 'misc',
                match: /(store|query|util)[\\/].*\.s?css$/
            }, {
                name: 'wishlist',
                match: /((w|W)ish).*\.s?css$/
            }, {
                name: 'main',
                match: /\.s?css$/
            }];

            styleChunks.forEach(({ name, match }, index) => {
                webpackConfig.optimization.splitChunks.cacheGroups[`${name}_style`] = {
                    name: `${name}_style`,
                    test(module) {
                        if (isPlugin(module) && name !== 'main') {
                            return false;
                        }

                        if (isChunkOptimizationDisabled(module)) {
                            return false;
                        }

                        const fileName = (module.nameForCondition && module.nameForCondition()) || module.resource;
                        return !!match.exec(fileName);
                    },
                    chunks: 'all',
                    minChunks: 1,
                    priority: styleChunks.length - index,
                    reuseExistingChunk: true,
                    enforce: true
                };
            });

            return webpackConfig;
        }
    }
};

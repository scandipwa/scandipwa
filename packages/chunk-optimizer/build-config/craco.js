/* eslint-disable no-param-reassign */
// Disables chunk-optimizer rules for specific files and uses Rect/Webpack specific chunks:
// * if file name follows: [name].manual.[scss/css] or [name].manual.extended.[scss/css]
// * if file is imported via webpackChunkName
const isChunkOptimizationDisabled = (module) => {
    const {
        resource,
        type,
        issuer = {}
    } = module;
    const name = module.nameForCondition() || resource;

    // If not a style element skip
    if (!name || (!name.endsWith('.css') && !name.endsWith('.scss'))) {
        return false;
    }

    // Support implementation for name tags based chunk:
    if (name.endsWith('.manual.scss')
        || name.endsWith('.manual.css')
        || name.endsWith('.manual.extended.scss')
        || name.endsWith('.manual.extended.css')) {
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
    } = type === 'css/mini-extract' ? issuer : module;

    if (!rawRequest || !chunks || !value) {
        return false;
    }

    const chunk = chunks.values().next().value;

    const {
        name: chunkName = ''
    } = chunk || {};

    const match = new RegExp(
        `webpackChunkName:\\s*("|')${ chunkName }("|')\\s*\\*\\/\\s*("|')${ rawRequest }`,
        'g'
    );

    return !!match.exec(value);
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
                        if (isChunkOptimizationDisabled(module)) {
                            return false;
                        }

                        const name = module.nameForCondition();
                        return !!match.exec(name);
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

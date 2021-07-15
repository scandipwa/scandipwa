/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

const postcssLogical = require('postcss-logical');
const postcssDirPseudoClass = require('postcss-dir-pseudo-class');

module.exports = {
    plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
            if (!cracoConfig.style) {
                Object.assign(cracoConfig, { style: {} });
            }

            if (!cracoConfig.style.postcss) {
                Object.assign(cracoConfig.style, { postcss: {} });
            }

            if (!cracoConfig.style.postcss.plugins) {
                Object.assign(cracoConfig.style.postcss, { plugins: [] });
            }

            cracoConfig.style.postcss.plugins.push(
                postcssLogical(),
                postcssDirPseudoClass()
            );

            return cracoConfig;
        }
    }
};

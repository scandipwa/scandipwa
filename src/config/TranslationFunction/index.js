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

const mockTranslations = (format, ...args) => {
    // eslint-disable-next-line fp/no-let
    let i = 0;
    return format.replace(/%s/g, () => args[i++]);
};

module.exports = mockTranslations;

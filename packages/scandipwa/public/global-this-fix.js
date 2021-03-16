/* eslint-disable */
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
// Polyfill for missing globalThis in old browsers, see https://blog.logrocket.com/what-is-globalthis-why-use-it/
(function() {
    if (typeof globalThis === 'object') return;
    Object.prototype.__defineGetter__('__magic__', function() {
        return this;
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
}());

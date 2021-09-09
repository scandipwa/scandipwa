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

/** @namespace NextEmulator/Util/Next/Index/trim */
export const trim = (str) => str.trim().replace(/^\/+/, '').replace(/\/+$/, '');

/** @namespace NextEmulator/Util/Next/Index/isMatchingRoute */
export const isMatchingRoute = (route, pathname) => {
    const routeRe = route
        .replace(/\[[^\]]+\]/ig, '[^\\/]+')
        .replace(/index/ig, '/')
        .replace(/\/+$/, '');

    const re = new RegExp(`^${routeRe}$`, 'i');

    return re.test(trim(pathname));
};

/** @namespace NextEmulator/Util/Next/Index/getRouteId */
export const getRouteId = (route) => route.replace(/\W/g, '_');

/** @namespace NextEmulator/Util/Next/Index/getQuery */
export const getQuery = (route, pathname) => {
    const reText = route
        .replace(/\[([^\]]+)\]/ig, '(?<$1>[^\\/]+)')
        .replace('/index/ig', '/')
        .replace(/\/+$/, '');

    const re = new RegExp(`^${reText}$`, 'i');
    const result = trim(pathname).match(re);

    if (result) {
        return result.groups;
    }

    return {};
};

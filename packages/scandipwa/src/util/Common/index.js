/* eslint-disable import/prefer-default-export */
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

import { BACKSLASH, SPECIAL_CHAR } from 'Route/SearchPage/SearchPage.config';

/**
 * No-operate function.
 * Can be used as a fallback if real function wasn't passed.
 * In this case instead of creating empty function every time we can reuse existing.
 * Examples: default props, argument default values.
 * @namespace Util/Common/Index/noopFn
 */
export const noopFn = () => {};

/** @namespace Util/Common/Index/decodeString */
export const decodeString = (string) => {
    try {
        return decodeURIComponent(string);
    } catch (e) {
        return string;
    }
};

/** @namespace Util/Common/Index/formatSearch */
export const formatSearch = (search) => search.trim().replace(SPECIAL_CHAR, (special) => `${BACKSLASH}${ special}`);

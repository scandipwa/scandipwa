/* eslint-disable import/prefer-default-export */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

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

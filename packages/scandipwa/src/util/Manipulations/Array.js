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

/** @namespace Util/Manipulations/Array/range */
export const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
};

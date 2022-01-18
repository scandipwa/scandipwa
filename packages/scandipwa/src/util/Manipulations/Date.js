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

/** @namespace Util/Manipulations/Date/convertStringToDate */
export const convertStringToDate = (stringDate, options) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(stringDate.replace(/\s/, 'T'));
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return date.toLocaleDateString(language, options || defaultOptions);
};

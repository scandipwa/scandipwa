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

import { getDateValue } from 'Util/Form/Extract';

export const MILLISECONDS_PER_MINUTE = 60000;

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

/** @namespace Util/Manipulations/Date/getTimeInCurrentTimezone */
export const getTimeInCurrentTimezone = (timestamp) => {
    const currentDate = new Date();
    const timezone = currentDate.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    const timeInCurrentTimezone = new Date(timestamp).getTime() - timezone;

    return getDateValue(timeInCurrentTimezone);
};

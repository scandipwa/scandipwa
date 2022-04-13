/* eslint-disable no-magic-numbers */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export const AMPM_FORMAT = {
    AM: __('AM'),
    PM: __('PM')
};

export enum HourFormat {
    H12 = 12,
    H24 = 24
}

export enum DateFieldAttr {
    NAME = 'data-field',
    TYPE = 'data-type'
}

export const DEFAULT_MONTH_DAYS = 31;
export const MONTHS_COUNT = 12;
export const MINUTES_COUNT = 60;

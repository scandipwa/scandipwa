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

/* eslint-disable import/prefer-default-export */

export const formatCurrency = (currency = 'USD') => {
    const { value: symbol } = new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency }
    ).formatToParts(0).find(({ type }) => type === 'currency');

    return symbol;
};

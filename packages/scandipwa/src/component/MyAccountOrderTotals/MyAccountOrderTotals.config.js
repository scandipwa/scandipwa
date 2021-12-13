/* eslint-disable import/prefer-default-export */
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
import { ORDER_REFUNDS } from 'Component/MyAccountOrder/MyAccountOrder.config';

export const colSpanCounts = {
    [ORDER_REFUNDS]: {
        colSpanPriceCount: '1',
        colSpanLabelCount: '6'
    }
};

export const colSpanCountsMobile = {
    [ORDER_REFUNDS]: {
        colSpanPriceCount: '2',
        colSpanLabelCount: '5'
    }
};

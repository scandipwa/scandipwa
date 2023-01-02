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

import { Children, Mods } from 'Type/Common.type';

export interface CheckoutOrderSummaryPriceLineProps {
    price: number | string;
    currency: string;
    itemsQty: number | null;
    title: string;
    coupon_code: string;
    mods: Mods;
    subPrice: string | number | null;
    children: Children;
}

export interface CheckoutOrderSummaryPriceLineComponentState {}

export interface CheckoutOrderSummaryPriceLineContainerState {}

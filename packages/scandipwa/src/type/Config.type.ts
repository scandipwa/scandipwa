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

export type Region = {
    code?: string;
    name?: string;
    id?: number;
};

export type Regions = Region[];

export type Country = {
    label: string;
    id: string;
    available_regions?: Region[];
};

export type CartConfig = {
    display_tax_in_price?: any; // TODO: Props.oneOf(Object.values(DISPLAY_CART_TAX_IN_PRICE))
    display_tax_in_subtotal?: any; // TODO: Props.oneOf(Object.values(DISPLAY_CART_TAX_IN_SUBTOTAL))
    display_tax_in_shipping_amount?: any; // TODO: Props.oneOf(Object.values(DISPLAY_CART_TAX_IN_SHIPPING))
    include_tax_in_order_total: boolean;
    display_full_tax_summary: boolean;
    display_zero_tax_subtotal: boolean;
};

export type StoreItem = {
    id?: string;
    value?: string;
    storeUrl?: string;
    storeLinkUrl?: string;
    label?: string;
};

export type Stores = StoreItem[];

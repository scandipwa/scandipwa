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

import { MetaTitle } from 'Type/Common.type';

import {
    GQLSelectedBundleOption,
    GQLSelectedCustomizableOption,
    GQLSelectedDownloadableLinks,
    GQLTotalsItem
} from './Graphql.type';
import { Product } from './ProductList.type';

export type Page = {
    title?: string;
    content?: string;
    meta_title?: MetaTitle;
    meta_description?: string;
    meta_keywords?: string;
};

export type QuantitySelector = {
    increase?: () => void; // TODO
    decrease?: () => void; // TODO
    quantity?: number;
};

export type Totals = {
    count?: number;
    subTotalPrice?: string;
    taxPrice?: string;
    grandTotalPrice?: string;
    items?: GQLTotalsItem[];
    applied_rule_ids?: string;
    discount_amount?: number;
    coupon_code?: string;
    tax_amount?: number;
    grand_total?: number;
    quote_currency_code: string;
};

export type CartItem = {
    discount_amount?: number;
    discount_percent?: number;
    item_id?: number;
    price?: number;
    product?: Product;
    qty?: number;
    row_total?: number;
    row_total_incl_tax?: number;
    sku?: string;
    tax_amount?: number;
    tax_percent?: number;
    customizable_options?: GQLSelectedCustomizableOption[];
    bundle_options?: GQLSelectedBundleOption[];
    downloadable_links?: GQLSelectedDownloadableLinks[];
};

export type CartDisplay = {
    display_tax_in_price?: string;
    display_tax_in_subtotal?: string;
    display_tax_in_shipping_amount?: string;
    include_tax_in_order_total?: boolean;
    display_full_tax_summary?: boolean;
    display_zero_tax_subtotal?: boolean;
};

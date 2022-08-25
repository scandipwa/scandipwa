/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import {
    GQLCartUserInputErrorType,
    GQLProductStockStatus
} from 'Type/Graphql.type';

import {
    AttributeWithValue,
    ConfigurableCartProductFragment,
    ConfigurableProductOptions,
    ConfigurableVariant,
    OptimizedProductImage,
    ProductLink,
    ProductStockItem
} from './ProductList.type';

export interface SelectedDownloadableLinks {
    id: number;
    label: string;
}

export interface AppliedTaxItemRate {
    percent: number;
    title: string;
}

export interface AppliedTaxItem {
    rates: AppliedTaxItemRate[];
}

export interface CartDisplayConfig {
    display_tax_in_price: string;
    display_tax_in_subtotal: string;
    display_tax_in_shipping_amount: string;
    include_tax_in_order_total: boolean;
    display_full_tax_summary: boolean;
    display_zero_tax_subtotal: boolean;
}

export interface SelectedCustomizableOptionValue {
    id: number;
    label: string;
    value: string;
}

export interface SelectedCustomizableOption {
    id: number;
    label: string;
    values: SelectedCustomizableOptionValue[];
}

export interface SelectedBundleOptionValue {
    id: number;
    label: string;
    quantity: number;
    price: number;
}

export interface SelectedBundleOption {
    id: number;
    label: string;
    values: SelectedBundleOptionValue[];
}

export interface CartProductItem {
    uid: string;
    id: number;
    sku: string;
    name: string;
    type_id: string;
    stock_status: GQLProductStockStatus;
    url: string;
    salable_qty: number;
    stock_item: ProductStockItem;
    thumbnail: OptimizedProductImage;
    attributes: AttributeWithValue[];
    product_links: ProductLink[];
    ConfigurableProduct: ConfigurableCartProductFragment;
    configurable_options: ConfigurableProductOptions[];
    variants: ConfigurableVariant[];
}

export interface TotalsItem {
    qty: number;
    sku: string;
    price: number;
    item_id: number;
    row_total: number;
    row_total_incl_tax: number;
    tax_amount: number;
    tax_percent: number;
    discount_amount: number;
    discount_percent: number;
    customizable_options: SelectedCustomizableOption[];
    downloadable_links: SelectedDownloadableLinks[];
    bundle_options: SelectedBundleOption[];
    product: CartProductItem;
}

export interface QuoteData {
    id: string;
    subtotal: number;
    subtotal_incl_tax: number;
    items_qty: number;
    tax_amount: number;
    grand_total: number;
    discount_amount: number;
    quote_currency_code: string;
    subtotal_with_discount: number;
    coupon_code: string;
    shipping_amount: number;
    shipping_incl_tax: number;
    shipping_tax_amount: number;
    is_virtual: boolean;
    applied_rule_ids: string;
    shipping_method: string;
    is_in_store_pickup_available: boolean;
    items: TotalsItem[];
    applied_taxes: AppliedTaxItem[];
}

export interface CartUserInputError {
    code: GQLCartUserInputErrorType;
    message: string;
}

export interface CartWithId {
    id: string;
}

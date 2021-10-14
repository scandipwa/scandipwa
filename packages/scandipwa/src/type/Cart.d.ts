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

import { Product } from './Product';

export interface TaxRate {
    percent: number;
    title: string;
}

export interface CartItem {
    bundle_options: unknown[]
    customizable_options: unknown[]
    discount_amount: number
    discount_percent: number
    downloadable_links: unknown[]
    item_id: number
    price: number
    product: Product
    variants: Product[]
    qty: number
    row_total: number
    row_total_incl_tax: number
    sku: string
    tax_amount: number
    tax_percent: number
}

export interface CartData {
    applied_rule_ids: string
    applied_taxes: {
        rates: TaxRate
    }[]
    base_currency_code: string
    base_grand_total: string
    coupon_code?: string
    discount_amount: number
    grand_total: number
    is_virtual: boolean
    items?: CartItem[]
    items_qty: number
    quote_currency_code: string
    shipping_amount: number
    shipping_incl_tax: number
    shipping_method?: string
    subtotal: number
    subtotal_incl_tax: number
    subtotal_with_discount: number
    tax_amount: number
}

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

import { AppliedTaxItem } from './Cart.type';
import { PaymentMethodAdditionalData } from './Order.type';

export interface TotalsItem {
    qty: number;
    name: string;
    price: number;
    item_id: number;
    options: string;
    tax_amount: number;
    tax_percent: number;
    price_incl_tax: number;
    discount_amount: number;
    discount_percent: number;
}

export interface TotalsObject {
    applied_rule_ids: string;
    applied_taxes: AppliedTaxItem[];
    coupon_code: string;
    subtotal: number;
    tax_amount: number;
    items_qty: number;
    base_grand_total: number;
    grand_total: number;
    discount_amount: number;
    shipping_amount: number;
    subtotal_incl_tax: number;
    shipping_incl_tax: number;
    quote_currency_code: string;
    shipping_tax_amount: number;
    subtotal_with_discount: number;
    shipping_discount_amount: number;
    items: TotalsItem[];
}

export interface PaymentMethod {
    code: string;
    title?: string;
    additional_data?: PaymentMethodAdditionalData;
    purchase_order_number?: string;
}

export interface PaymentDetails {
    payment_methods: PaymentMethod[];
    totals: TotalsObject;
}

export interface ShippingMethod {
    amount: number;
    available: boolean;
    base_amount: number;
    method_code: string;
    carrier_code: string;
    method_title: string;
    carrier_title: string;
    error_message: string;
    price_excl_tax: number;
    price_incl_tax: number;
}

export interface SetGuestEmailOnCartOutput {
    cart: {
        email: string;
    };
}

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

import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface CustomerDownloadableProduct {
    order_id: string;
    order_increment_id: number;
    date: string;
    status: string;
    download_url: string;
    link_title: string;
    remaining_downloads: number;
    title: string;
}

export interface PaymentMethodAdditionalData {
    name: string;
    value: string;
}

export interface OrderPaymentMethod {
    name: string;
    type: string;
    purchase_number: string;
    additional_data: PaymentMethodAdditionalData;
}

export interface Money {
    value?: string;
    currency?: GQLCurrencyEnum;
}

export interface BundleOption {
    title: string;
    qty: number;
    price: number;
}

export interface OrderProductSelectedOption {
    label: string;
    value: string;
    items: BundleOption[];
    linkItems: string[];
}

export interface BaseOrderItemProduct {
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
}

export interface CheckoutUserInputError {
    code: string;
    message: string;
    path: string;
}

export interface SalesCommentItem {
    timestamp: string;
    message: string;
}

export interface Discount {
    label: string;
    amount: Money;
}

export interface TaxItem {
    rate: number;
    title: string;
    amount: Money;
}

export interface ShippingHandling {
    amount_excluding_tax: Money;
    amount_including_tax: Money;
    discounts: Discount[];
    total_amount: Money;
    taxes: TaxItem[];
}

export interface OrderTotal {
    grand_total: Money;
    discounts: Discount[];
    base_grand_total: Money;
    subtotal: Money;
    total_shipping: Money;
    total_tax: Money;
    shipping_handling: ShippingHandling;
    taxes: TaxItem[];
}

export interface ShipmentTracking {
    carrier: string;
    number: string;
    title: string;
}

export interface ShipmentItemInterface {
    quantity_shipped: number;
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
}

export interface OrderShipment {
    id: number;
    number: string;
    comments: SalesCommentItem[];
    tracking: ShipmentTracking[];
    items: ShipmentItemInterface[];
}

export interface OrderItemProduct {
    product_url_key: string;
    quantity_ordered: number;
    quantity_shipped: number;
    quantity_refunded: number;
    quantity_canceled: number;
    quantity_returned: number;
    entered_options: OrderProductSelectedOption[];
    selected_options: OrderProductSelectedOption[];
    row_subtotal: Money;
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
}

export interface RefundItem {
    quantity_refunded: number;
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
    order_item: OrderItemProduct;
    row_subtotal: Money;
    discounts: Discount[];
}

export interface CreditMemo {
    id: number;
    number: string;
    comments: SalesCommentItem[];
    items: RefundItem[];
    total: OrderTotal;
}

export interface InvoiceItem {
    quantity_invoiced: number;
    row_subtotal: Money;
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
}

export interface Invoice {
    id: number;
    number: string;
    comments: SalesCommentItem[];
    items: InvoiceItem[];
    total: OrderTotal;
}

export interface OrderAddress {
    city: string;
    country_id: number;
    firstname: string;
    lastname: string;
    postcode: string;
    region: string;
    region_id: number;
    telephone: string;
    vat_id: string;
    street: string[];
}

export interface OrderItem {
    id: string;
    increment_id: string;
    created_at: string;
    order_date: string;
    status: string;
    can_reorder: boolean;
    rss_link: string;
    total: OrderTotal;
    carrier: string;
    shipments: OrderShipment[];
    items: OrderItemProduct[];
    invoices: Invoice[];
    credit_memos: CreditMemo[];
    shipping_address: OrderAddress;
    billing_address: OrderAddress;
    payment_methods: OrderPaymentMethod[];
    shipping_method: string;
    comments: SalesCommentItem[];
}

export interface SearchResultPageInfo {
    current_page: number;
    page_size: number;
    total_pages: number;
}

export interface CustomerOrders {
    total_count: number;
    items: OrderItem[];
    page_info: SearchResultPageInfo;
}

export interface OrdersOptions {
    orderId: number;
    page: number;
}

export interface ReorderOutput {
    userInputErrors: CheckoutUserInputError[];
}

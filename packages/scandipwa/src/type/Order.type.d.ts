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

export interface OrderGrandTotalType {
    value?: number;
    currency?: string;
}

export interface OrderTotalType {
    grand_total?: OrderGrandTotalType;
}

export interface OrderInfoType {
    id?: number;
    increment_id?: string;
    created_at?: string;
    status_label?: string;
    grand_total?: number;
    subtotal?: string;
}

export interface OrderPaymentInfo {
    name?: string;
    type?: string;
    additional_data?: {
        name: string
        value: string
    };
}

export type OrderPaymentsInfo = OrderPaymentInfo[];

export interface OrderAddressType {
    city?: string;
    country_code?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    region?: string;
    region_id?: string;
    street?: string[];
    telephone?: string;
}

export interface orderItemQtyType {
    quantity_ordered?: number;
    quantity_canceled?: number;
    quantity_invoiced?: number;
    quantity_refunded?: number;
    quantity_returned?: number;
    quantity_shipped?: number;
}

export interface MoneyType {
    currency?: string;
    value?: number;
}

export interface DiscountType {
    amount?: MoneyType;
    value?: number;
}

export interface OptionItemType {
    title?: string;
    qty?: number;
    price?: number;
}

export type OptionItemsType = OptionItemType[];

export interface OptionType {
    label?: string;
    value?: string;
    items?: OptionItemsType;
    linkItems?: string[];
}

export type OptionsType = OptionType[];

export interface OrderProductType {
    discounts?: DiscountType[];
    id?: string;
    selected_options?: OptionsType;
    entered_options?: OptionsType;
    product_name?: string;
    product_sale_price?: MoneyType;
    product_sku?: string;
    product_type?: string;
    product_url_key?: string;
    quantity_ordered?: number;
    quantity_canceled?: number;
    quantity_invoiced?: number;
    quantity_refunded?: number;
    quantity_returned?: number;
    quantity_shipped?: number;
}

export type OrderProductsType = OrderProductType[];

export interface OrderTabType {
    items?: OrderProductsType;
    id?: string | number;
    number?: string;
    total?: OrderTotalType;
    quantity_ordered?: number;
    quantity_canceled?: number;
    quantity_invoiced?: number;
    quantity_refunded?: number;
    quantity_returned?: number;
    quantity_shipped?: number;
}

export type OrderTabsType = OrderTabType[];

export interface OrderType {
    can_reorder?: boolean;
    carrier?: string;
    id?: string;
    order_date?: string;
    credit_memos?: string;
    invoices?: string;
    items?: OrderProductsType;
    shipments?: string;
    payment_methods?: OrderPaymentsInfo;
    rss_link?: string;
    shipping_address?: OrderAddressType;
    billing_address?: OrderAddressType;
    shipping_method?: string;
    status?: string;
    total?: OrderTotalType;
}

export interface DownloadableType {
    id?: number;
    order_id?: number;
    order_increment_id?: string;
    status_label?: string;
    downloads?: string;
    download_url?: string;
    created_at?: string;
    title?: string;
}

export interface PageInfoType {
    current_page?: number;
    page_size?: number;
    total_pages?: number;
}

export type OrdersType = OrderType[];

export interface OrdersListType {
    items?: OrdersType;
    pageInfo?: PageInfoType;
}

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

export type OrderGrandTotal = {
    value?: number;
    currency?: string;
};

export type OrderTotal = {
    grand_total?: OrderGrandTotal;
};

export type OrderInfo = {
    id?: number;
    increment_id?: string;
    created_at?: string;
    status_label?: string;
    grand_total?: number;
    subtotal?: string;
};

export type OrderPaymentInfo = {
    name?: string;
    type?: string;
    additional_data?: {
        name: string;
        value: string;
    };
};

export type OrderPaymentsInfo = OrderPaymentInfo[];

export type OrderAddress = {
    city?: string;
    country_code?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    region?: string;
    region_id?: string;
    street?: string[];
    telephone?: string;
};

export type orderItemQty = {
    quantity_ordered?: number;
    quantity_canceled?: number;
    quantity_invoiced?: number;
    quantity_refunded?: number;
    quantity_returned?: number;
    quantity_shipped?: number;
};

export type Money = {
    currency: string;
    value: number;
};

export type Discount = {
    amount: Money;
    value: number;
};

export type OptionItem = {
    title?: string;
    qty?: number;
    price?: number;
};

export type OptionItems = OptionItem[];

export type Option = {
    label?: string;
    value?: string;
    items?: OptionItems;
    linkItems?: string[];
};

export type Options = Option[];

export type OrderProductQuantity = {
    quantity_ordered?: number;
    quantity_canceled?: number;
    quantity_invoiced?: number;
    quantity_refunded?: number;
    quantity_returned?: number;
    quantity_shipped?: number;
};

export type OrderProduct = OrderProductQuantity & {
    discounts?: Discount[];
    id?: string;
    selected_options?: Options;
    entered_options?: Options;
    product_name?: string;
    product_sale_price?: Money;
    product_sku?: string;
    product_type?: string;
    product_url_key?: string;
};

export type OrderProducts = OrderProduct[];

export type OrderTab = OrderProductQuantity & {
    items?: OrderProducts;
    id?: string | number;
    number?: string;
    total?: OrderTotal;
};

export type OrderTabs = OrderTab[];

export type Order = {
    can_reorder?: boolean;
    carrier?: string;
    id: string;
    uid: string;
    order_date?: string;
    credit_memos?: string;
    invoices?: string;
    items?: OrderProducts;
    shipments?: string;
    payment_methods?: OrderPaymentsInfo;
    rss_link?: string;
    shipping_address?: OrderAddress;
    billing_address?: OrderAddress;
    shipping_method?: string;
    status?: string;
    total?: OrderTotal;
};

export type Downloadable = {
    id?: number;
    order_id?: number;
    order_increment_id?: string;
    status_label?: string;
    downloads?: string;
    download_url?: string;
    created_at?: string;
    title?: string;
};

export type PageInfo = {
    current_page?: number;
    page_size?: number;
    total_pages?: number;
};

export type Orders = Order[];

export type OrdersList = {
    items?: Orders;
    pageInfo?: PageInfo;
};

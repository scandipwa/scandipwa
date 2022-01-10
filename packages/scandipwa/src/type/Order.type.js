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

import PropTypes, { arrayOf } from 'prop-types';

export const OrderGrandTotalType = PropTypes.shape({
    value: PropTypes.number,
    currency: PropTypes.string
});

export const OrderTotalType = PropTypes.shape({
    grand_total: OrderGrandTotalType
});

export const OrderInfoType = PropTypes.shape({
    id: PropTypes.number,
    increment_id: PropTypes.string,
    created_at: PropTypes.string,
    status_label: PropTypes.string,
    grand_total: PropTypes.number,
    subtotal: PropTypes.string
});

export const OrderPaymentInfo = PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    additional_data: {
        name: PropTypes.string,
        value: PropTypes.string
    }
});

export const OrderPaymentsInfo = PropTypes.arrayOf(OrderPaymentInfo);

export const OrderAddressType = PropTypes.shape({
    city: PropTypes.string,
    country_code: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    postcode: PropTypes.string,
    region: PropTypes.string,
    region_id: PropTypes.string,
    street: PropTypes.arrayOf(PropTypes.string),
    telephone: PropTypes.string
});

export const orderItemQtyType = PropTypes.shape({
    quantity_ordered: PropTypes.number,
    quantity_canceled: PropTypes.number,
    quantity_invoiced: PropTypes.number,
    quantity_refunded: PropTypes.number,
    quantity_returned: PropTypes.number,
    quantity_shipped: PropTypes.number
});

export const MoneyType = PropTypes.shape({
    currency: PropTypes.string,
    value: PropTypes.number
});

export const DiscountType = PropTypes.shape({
    amount: MoneyType,
    value: PropTypes.number
});

export const OptionItemType = PropTypes.shape({
    title: PropTypes.string,
    qty: PropTypes.number,
    price: PropTypes.number
});

export const OptionItemsType = PropTypes.arrayOf(OptionItemType);

export const OptionType = PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    items: OptionItemsType,
    linkItems: arrayOf(PropTypes.string)
});

export const OptionsType = PropTypes.arrayOf(OptionType);

export const OrderProductType = PropTypes.shape({
    orderItemQtyType,
    discounts: PropTypes.DiscountType,
    id: PropTypes.string,
    selected_options: OptionsType,
    entered_options: OptionsType,
    product_name: PropTypes.string,
    product_sale_price: MoneyType,
    product_sku: PropTypes.string,
    product_type: PropTypes.string,
    product_url_key: PropTypes.string
});

export const OrderProductsType = PropTypes.arrayOf(OrderProductType);

export const OrderTabType = PropTypes.shape({
    orderItemQtyType,
    items: OrderProductsType,
    id: PropTypes.number,
    number: PropTypes.string,
    total: OrderTotalType
});

export const OrderTabsType = PropTypes.arrayOf(OrderTabType);

export const OrderType = PropTypes.shape({
    can_reorder: PropTypes.bool,
    carrier: PropTypes.string,
    id: PropTypes.string,
    order_date: PropTypes.string,
    credit_memos: OrderTabType.string,
    invoices: OrderTabType.string,
    items: OrderProductsType,
    shipments: OrderTabType.string,
    payment_methods: OrderPaymentsInfo,
    rss_link: PropTypes.string,
    shipping_address: OrderAddressType,
    billing_address: OrderAddressType,
    shipping_method: PropTypes.string,
    status: PropTypes.string,
    total: OrderTotalType
});

export const DownloadableType = PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.number,
    order_increment_id: PropTypes.string,
    status_label: PropTypes.string,
    downloads: PropTypes.string,
    download_url: PropTypes.string,
    created_at: PropTypes.string,
    title: PropTypes.string
});

export const PageInfoType = PropTypes.shape({
    current_page: PropTypes.number,
    page_size: PropTypes.number,
    total_pages: PropTypes.number
});

export const OrdersType = PropTypes.arrayOf(OrderType);

export const OrdersListType = PropTypes.shape({
    items: OrdersType,
    pageInfo: PageInfoType
});

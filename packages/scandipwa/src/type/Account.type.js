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
import PropTypes from 'prop-types';

import { ItemsType } from 'Type/ProductList.type';

export const RegionType = PropTypes.oneOfType([
    PropTypes.shape({
        region_code: PropTypes.string,
        region: PropTypes.string,
        region_id: PropTypes.number
    })
]);

export const Addresstype = PropTypes.shape({
    city: PropTypes.string,
    country_id: PropTypes.string,
    customer_id: PropTypes.number,
    default_billing: PropTypes.bool,
    default_shipping: PropTypes.bool,
    firstname: PropTypes.string,
    id: PropTypes.number,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    postcode: PropTypes.string,
    prefix: PropTypes.string,
    RegionType,
    street: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    suffix: PropTypes.string,
    telephone: PropTypes.string
});

export const AddressesType = PropTypes.arrayOf(Addresstype);

export const CustomerType = PropTypes.shape({
    AddressesType,
    created_at: PropTypes.string,
    default_billing: PropTypes.string,
    default_shipping: PropTypes.string,
    dob: PropTypes.date,
    email: PropTypes.string,
    firstname: PropTypes.string,
    group_id: PropTypes.number,
    id: PropTypes.number,
    is_subscribed: PropTypes.bool,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    taxvat: PropTypes.string
});

export const BaseOrderInfoType = PropTypes.shape({
    id: PropTypes.number,
    increment_id: PropTypes.string,
    created_at: PropTypes.string,
    status_label: PropTypes.string,
    grand_total: PropTypes.number,
    subtotal: PropTypes.string
});

export const OrderPaymentInfo = PropTypes.shape({
    method: PropTypes.string,
    additional_information: {
        method_title: PropTypes.string
    }
});

export const OrderShippingInfo = PropTypes.shape({
    shipping_method: PropTypes.string,
    shipping_description: PropTypes.string,
    shipping_incl_tax: PropTypes.number,
    shipping_amount: PropTypes.number,
    shipping_address: Addresstype
});

export const OrderType = PropTypes.shape({
    base_order_info: BaseOrderInfoType,
    order_products: ItemsType,
    payment_info: OrderPaymentInfo,
    shipping_info: OrderShippingInfo
});

export const DownloadableType = PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.string,
    status_label: PropTypes.string,
    downloads: PropTypes.string,
    download_url: PropTypes.string,
    created_at: PropTypes.string,
    title: PropTypes.string
});

export const OrdersType = PropTypes.arrayOf(OrderType);

export const MY_ACCOUNT = 'my-account';
export const MY_ORDERS = 'my-orders';
export const MY_DOWNLOADABLE = 'my-downloadable';
export const MY_WISHLIST = 'my-wishlist';
export const ADDRESS_BOOK = 'address';
export const NEWSLETTER_SUBSCRIPTION = 'newsletter-subscription';
export const ACCOUNT_INFORMATION = 'edit';

export const FIRST_SECTION = 1;
export const SECOND_SECTION = 2;
export const THIRD_SECTION = 3;

export const INFORMATION_EDIT = 'information_edit';
export const PASSWORD_EDIT = 'password_edit';
export const EMAIL_EDIT = 'email_edit';

export const ActiveTabType = PropTypes.string;

export const TabType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string
});

export const TabMapType = PropTypes.objectOf(TabType);

export const SignInStateType = PropTypes.string;

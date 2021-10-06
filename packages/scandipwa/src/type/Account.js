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

export const regionType = PropTypes.oneOfType([
    PropTypes.shape({
        region_code: PropTypes.string,
        region: PropTypes.string,
        region_id: PropTypes.number
    })
]);

export const addressType = PropTypes.shape({
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
    regionType,
    street: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    suffix: PropTypes.string,
    telephone: PropTypes.string
});

export const addressesType = PropTypes.arrayOf(addressType);

export const customerType = PropTypes.shape({
    addressesType,
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

export const baseOrderInfoType = PropTypes.shape({
    id: PropTypes.number,
    increment_id: PropTypes.string,
    created_at: PropTypes.string,
    status_label: PropTypes.string,
    grand_total: PropTypes.number,
    subtotal: PropTypes.string
});

// TODO: remove objects
export const orderType = PropTypes.shape({
    base_order_info: baseOrderInfoType,
    order_products: PropTypes.array,
    payment_info: PropTypes.object,
    shipping_info: PropTypes.object
});

export const downloadableType = PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.string,
    status_label: PropTypes.string,
    downloads: PropTypes.string,
    download_url: PropTypes.string,
    created_at: PropTypes.string,
    title: PropTypes.string
});

export const ordersType = PropTypes.arrayOf(orderType);

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

export const activeTabType = PropTypes.string;

export const tabType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string
});

export const tabMapType = PropTypes.objectOf(tabType);

export const signInStateType = PropTypes.string;

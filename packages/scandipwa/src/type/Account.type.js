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

export const MY_ACCOUNT = 'my-account';
export const MY_ORDERS = 'my-orders';
export const MY_ORDER = 'my-order';
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

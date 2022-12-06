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

import PropTypes from 'prop-types';

import { CheckoutSteps } from 'Route/Checkout/Checkout.config';

// Support for comtabilitiy

export const PaymentMethodType = PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
});

export const PaymentMethodsType = PropTypes.arrayOf(
    PaymentMethodType,
);

export const ShippingMethodType = PropTypes.shape({
    amount: PropTypes.number,
    available: PropTypes.bool,
    base_amount: PropTypes.number,
    carrier_code: PropTypes.string,
    carrier_title: PropTypes.string,
    error_message: PropTypes.string,
    method_code: PropTypes.string,
    method_title: PropTypes.string,
    price_excl_tax: PropTypes.number,
    price_incl_tax: PropTypes.number,
});

export const ShippingMethodsType = PropTypes.arrayOf(
    ShippingMethodType,
);

export const StoreType = PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    pickup_location_code: PropTypes.string,
    postcode: PropTypes.string,
    region: PropTypes.string,
    street: PropTypes.string,
});

export const CheckoutStepType = PropTypes.oneOf([
    CheckoutSteps.BILLING_STEP,
    CheckoutSteps.SHIPPING_STEP,
    CheckoutSteps.DETAILS_STEP,
]);

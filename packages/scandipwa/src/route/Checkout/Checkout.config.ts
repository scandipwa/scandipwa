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

export enum CheckoutSteps {
    SHIPPING_STEP = 'SHIPPING_STEP',
    BILLING_STEP = 'BILLING_STEP',
    DETAILS_STEP = 'DETAILS_STEP'
}

export enum CheckoutStepUrl {
    CHECKOUT_URL = '/checkout',
    BILLING_URL = '/checkout/billing',
    SHIPPING_URL = '/checkout/shipping'
}

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';

export const UPDATE_EMAIL_CHECK_FREQUENCY = 1500; // ms

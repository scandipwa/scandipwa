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

import { appendWithStoreCode } from 'Util/Url';

export enum CheckoutSteps {
    SHIPPING_STEP = 'SHIPPING_STEP',
    BILLING_STEP = 'BILLING_STEP',
    DETAILS_STEP = 'DETAILS_STEP',
}

export enum CheckoutUrlSteps {
    BILLING_URL_STEP = 'billing',
    SHIPPING_URL_STEP = 'shipping',
    DETAILS_URL_STEP = 'success',
}

export enum CheckoutStepUrl {
    CHECKOUT_URL = '/checkout',
    BILLING_URL = '/checkout/billing',
    SHIPPING_URL = '/checkout/shipping',
}

export const CHECKOUT_URL_REGEX = new RegExp(`^(${appendWithStoreCode('')})?${CheckoutStepUrl.CHECKOUT_URL}(/)?$`);

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';

export const UPDATE_EMAIL_CHECK_FREQUENCY = 1500; // ms
export const UPDATE_SHIPPING_COST_ESTIMATES_FREQUENCY = 800; // ms

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

import { appendWithStoreCode } from 'Util/Url';

export const SHIPPING_STEP = 'SHIPPING_STEP';
export const BILLING_STEP = 'BILLING_STEP';
export const DETAILS_STEP = 'DETAILS_STEP';

export const BILLING_URL_STEP = 'billing';
export const SHIPPING_URL_STEP = 'shipping';
export const DETAILS_URL_STEP = 'success';

export const CHECKOUT_URL = '/checkout';
export const BILLING_URL = '/checkout/billing';
export const SHIPPING_URL = '/checkout/shipping';

export const CHECKOUT_URL_REGEX = new RegExp(`^(${appendWithStoreCode('')})?${CHECKOUT_URL}(/)?$`);

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';

export const UPDATE_EMAIL_CHECK_FREQUENCY = 1500; // ms

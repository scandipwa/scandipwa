/* eslint-disable import/prefer-default-export */

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
import {
    ADDRESS_BOOK,
    DASHBOARD,
    MY_DOWNLOADABLE,
    MY_ORDERS,
    MY_WISHLIST,
    NEWSLETTER_SUBSCRIPTION
} from 'Type/Account';

export const MY_ACCOUNT_URL = '/my-account';

export const TAB_MAP = {
    [DASHBOARD]: {
        url: '/dashboard',
        name: __('Dashboard')
    },
    [ADDRESS_BOOK]: {
        url: '/address-book',
        name: __('Address book')
    },
    [MY_ORDERS]: {
        url: '/my-orders',
        name: __('My orders')
    },
    [MY_DOWNLOADABLE]: {
        url: '/my-downloadable',
        name: __('My downloadable')
    },
    [MY_WISHLIST]: {
        url: '/my-wishlist',
        name: __('My wishlist')
    },
    [NEWSLETTER_SUBSCRIPTION]: {
        url: '/newsletter-subscription',
        name: __('Newsletter Subscription')
    }
};

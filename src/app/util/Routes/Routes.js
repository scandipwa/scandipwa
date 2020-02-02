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

import { convertKeyValueObjectToVariants } from 'Util/Url';
import { convertLabel } from 'Util/Url/Url';
import { getCategoryBreadcrumbs } from 'Util/Breadcrumbs';

export const PRODUCT_PREFIX = 'p';
export const CMS_PREFIX = 'page';
export const FILTERS_PREFIX = '/f/';
export const CHECKOUT_PREFIX = 'checkout';
export const MY_ACCOUNT_PREFIX = 'my-account';
export const WISHLIST_PATH = 'wishlist';
export const OVERVIEW_PATH = 'overview';
export const ORDERS_PATH = 'orders-list';
export const SEARCH_PATH = 'search';
export const MY_ACCOUNT_ORDERS_PREFIX = `/${MY_ACCOUNT_PREFIX}/${ORDERS_PATH}`;
export const MY_ACCOUNT_WISHLIST_URL = `/${MY_ACCOUNT_PREFIX}/${WISHLIST_PATH}`;
export const MY_ACCOUNT_OVERVIEW_URL = `/${MY_ACCOUNT_PREFIX}/${OVERVIEW_PATH}`;

// Route names, used to identify current route for GTM
export const ROUTE_CART = 'cart';
export const ROUTE_CATALOG = 'catalog';
export const ROUTE_CHECKOUT = 'checkout';
export const ROUTE_CLOUD_PAYMENTS = 'cloud_payments';
export const ROUTE_CMS_PAGE = 'cms_page';
export const ROUTE_DEMIR = 'demir';
export const ROUTE_HOMEPAGE = 'homepage';
export const ROUTE_MENU = 'menu';
export const ROUTE_MY_ACCOUNT = 'my_account';
export const ROUTE_MY_ACCOUNT_ORDERS = 'my_account_orders';
export const ROUTE_PASSWORD_CHANGE = 'password_change';
export const ROUTE_PRODUCT = 'product';
export const ROUTE_PRODUCT_COMPARE = 'product_compare';
export const ROUTE_SEARCH = 'search';
export const ROUTE_STORES = 'stores';
export const ROUTE_URL_REWRITE = 'url_rewrite';

const getCategoryPathWithoutFilters = pathname => (pathname.indexOf(FILTERS_PREFIX) !== -1
    ? pathname.slice(0, pathname.indexOf(FILTERS_PREFIX)) : pathname);

const getProductUrl = (product, categoryUrlPath) => {
    const {
        parent_url_key,
        url_key = '',
        super_attributes,
        categories = []
    } = product;

    const variants = Object.values(super_attributes || []).reduce((variants, { attribute_code, attribute_label }) => ({
        ...variants,
        [attribute_code]: convertLabel(attribute_label)
    }), {});
    const productConfiguration = `${parent_url_key || url_key}/${convertKeyValueObjectToVariants(variants)}`
        .replace(/\/$/, '');

    if (categoryUrlPath) return `/${categoryUrlPath}/${PRODUCT_PREFIX}/${productConfiguration}`;

    // finds a category containing url_path with max amount of slashes
    if (categories.length) {
        const { url_path } = getCategoryBreadcrumbs(categories);

        if (url_path) {
            return `/${url_path}/${PRODUCT_PREFIX}/${productConfiguration}`;
        }
    }

    return `/${PRODUCT_PREFIX}/${productConfiguration}`;
};

const getCmsPageUrl = urlPath => `/${urlPath}`;
const getSearchUrl = value => `/${SEARCH_PATH}/${value}`;

export {
    getCategoryPathWithoutFilters,
    getProductUrl,
    getCmsPageUrl,
    getSearchUrl
};

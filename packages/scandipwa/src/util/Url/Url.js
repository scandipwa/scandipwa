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

import getStore from 'Util/Store';

/**
 * Update query params without adding to history
 * @param {String} name
 * @param {String} value
 * @namespace Util/Url/updateQueryParamWithoutHistory
 */
export const updateQueryParamWithoutHistory = (name, value, history, location) => {
    const { search, pathname } = location;

    const params = new URLSearchParams(search);
    params.set(name, value);
    history.replace(decodeURIComponent(`${ pathname }?${ params }`));
};

/**
 * Remove query param without adding to history
 * @param {String} name
 * @namespace Util/Url/removeQueryParamWithoutHistory
 */
export const removeQueryParamWithoutHistory = (name, history, location) => {
    const { search, pathname } = location;

    const params = new URLSearchParams(search);
    params.delete(name);
    history.replace(decodeURIComponent(`${ pathname }?${ params }`));
};

/**
 * Get query param from url
 * @param {Object} match match object from react-router
 * @param {Object} location location object from react-router
 * @namespace Util/Url/getUrlParam
 */
export const getUrlParam = (match, location) => {
    const baseUrl = match.path.replace(window.storeRegexText, '').replace('/', '');
    const currentUrl = location.pathname.replace(new RegExp(`^${window.storeRegexText}`, 'i'), '');

    if (baseUrl === '/') {
        return currentUrl.replace(baseUrl, '');
    }

    return currentUrl.replace(baseUrl, '').replace(/^\/*/, '');
};

/**
 * Append store code to URL
 * @param {String} pathname the URL to append store code to
 * @namespace Util/Url/appendWithStoreCode
 */
export const appendWithStoreCode = (pathname) => {
    const { ConfigReducer: { base_link_url = window.location.origin } = {} } = getStore().getState() || {};
    const { pathname: storePrefix } = new URL(base_link_url);

    // ignore empty URLs
    if (!pathname) {
        return pathname;
    }

    // match URLs which have the store code in pathname
    if (new RegExp(`^/(${window.storeList.join('|')})/`, 'i').test(pathname)) {
        return pathname;
    }

    // trim the last slash from URL, and append it to pathname
    return storePrefix.slice(0, -1).concat(
        !pathname.startsWith('/') ? `/${ pathname }` : pathname
    );
};

/**
 * Get query variable value (from react router)
 * @param {String} variable Variable from URL
 * @param {Object} variable location object from react-router
 * @return {String|false} Variable value
 * @namespace Util/Url/getQueryParam
 */
export const getQueryParam = (variable, location) => {
    const query = location.search.substring(1);
    const vars = query.split('&');

    return vars.reduce((acc, item) => {
        const [k, v] = item.split('=');
        return k === variable ? v : acc;
    }, false);
};

/**
 * Convert url params to object with key value pairs
 * @param {String} queryString url query string
 * @return {Object} Key-Value pairs
 * @namespace Util/Url/convertQueryStringToKeyValuePairs
 */
export const convertQueryStringToKeyValuePairs = (queryString) => {
    const keyValuePairs = {};
    const params = queryString.substring(1).split('&');

    params.forEach((param) => {
        const pair = param.split('=');
        const [keyPair, valuePair = []] = pair;

        if (keyPair.length > 0 && valuePair.length > 0) {
            keyValuePairs[keyPair] = decodeURIComponent(valuePair);
        }
    });

    return keyValuePairs;
};

/**
 * Update existing key value pairs and return result
 * @param {Object} keyValuePairs current key value pairs
 * @param {String} currentKey key of the value to be updated
 * @param {String} currentValue value to be updated
 * @return {Object} Key-Value pairs
 * @namespace Util/Url/updateKeyValuePairs
 */
export const updateKeyValuePairs = (keyValuePairs, currentKey, currentValue) => {
    const updatedKeyValuePairs = {};

    Object.entries(keyValuePairs).forEach((pair) => {
        const [key, value] = pair;

        if (currentKey === key) {
            updatedKeyValuePairs[key] = currentValue;
        } else {
            updatedKeyValuePairs[key] = value;
        }
    });

    return updatedKeyValuePairs;
};

/**
 * Convert object with key value pairs to url query string
 * @param {Object} keyValuePairs object with key value pairs
 * @return {String} Converted query string
 * @namespace Util/Url/convertKeyValuesToQueryString
 */
export const convertKeyValuesToQueryString = (keyValuePairs) => Object.entries(keyValuePairs)
    .map((pair) => {
        const [key, value] = pair;
        const keyExists = key !== '';
        const valueExists = typeof value === 'object' ? value.length : value !== '';

        if (valueExists && keyExists) {
            return `${key}=${value}`;
        }

        return null;
    })
    .filter((x) => !!x)
    .join('&');

/** @namespace Util/Url/generateQuery */
export const generateQuery = (keyValueObject, location, history) => Object.entries(keyValueObject)
    .reduce((acc, pair) => {
        const [key, value] = pair;

        const keyAndValueExist = !!key && !!value;

        if (acc === '' && keyAndValueExist) {
            return `?${key}=${value}`;
        }

        if (getQueryParam(key, location) !== false) {
            const keyValuePairs = convertQueryStringToKeyValuePairs(acc);
            const updatedKeyValuePairs = updateKeyValuePairs(keyValuePairs, key, value);
            const updatedQuery = convertKeyValuesToQueryString(updatedKeyValuePairs);

            return updatedQuery.length ? `?${updatedQuery}` : '';
        }

        if (keyAndValueExist) {
            return `${acc}&${key}=${value}`;
        }

        return acc;
    }, history.location.search);

/**
 * Set add key value pairs to url
 * @param {Object} variable Object with key value pairs to be added to url
 * @param {Object} variable location object from react-router
 * @param {Object} variable react router history object
 * @param {Object} variable is url flush required
 * @namespace Util/Url/setQueryParams
 */
export const setQueryParams = (keyValueObject, location, history) => {
    const { state } = location;
    const query = generateQuery(keyValueObject, location, history);

    history.push({ search: query, state });
};

/**
 * Remove all queries except default sort options from url
 * @param {Object} variable react router history object
 * @namespace Util/Url/clearQueriesFromUrl
 */
export const clearQueriesFromUrl = (history) => {
    history.push({ search: '' });
};

/**
 * Convert object with key value pairs to url query string
 * @param {Object} keyValuePairs object with key value pairs
 * @return {String} Converted query string
 * @namespace Util/Url/objectToUri
 */
export const objectToUri = (keyValueObject = {}) => {
    const paramString = Object.entries(keyValueObject).sort()
        .reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '')
        .replace('&', '');

    return paramString.length > 0 ? `?${paramString}` : '';
};

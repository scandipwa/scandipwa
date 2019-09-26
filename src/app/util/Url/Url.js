/* eslint-disable fp/no-let */

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

// TODO: rewrite using import { history } from 'Route';
// TODO: fix no LET

/**
 * Update query params without adding to history
 * @param {String} name
 * @param {String} value
 */
const updateQueryParamWithoutHistory = (name, value, history, location) => {
    const { search, pathname } = location;

    const params = new URLSearchParams(search);
    params.set(name, value);
    history.replace(decodeURIComponent(`${ pathname }?${ params }`));
};

/**
 * Remove query param without adding to history
 * @param {String} name
 */
const removeQueryParamWithoutHistory = (name, history, location) => {
    const { search, pathname } = location;

    const params = new URLSearchParams(search);
    params.delete(name);
    history.replace(decodeURIComponent(`${ pathname }?${ params }`));
};

/**
 * Get query param from url
 * @param {Object} match match object from react-router
 * @param {Object} location location object from react-router
 */
const getUrlParam = (match, location) => {
    const baseUrl = match.path;
    const currentUrl = location.pathname;

    if (baseUrl === '/') return currentUrl.replace(baseUrl, '');
    return currentUrl.replace(baseUrl, '').substring(1);
};

/**
 * Get query variable value (from react router)
 * @param {String} variable Variable from URL
 * @param {Object} variable location object from react-router
 * @return {String|false} Variable value
 */
const getQueryParam = (variable, location) => {
    const query = location.search.substring(1);
    const vars = query.split('&');
    // eslint-disable-next-line fp/no-loops
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) return pair[1];
    }

    return false;
};

/**
 * Convert url params to object with key value pairs
 * @param {String} queryString url query string
 * @return {Object} Key-Value pairs
 */
const convertQueryStringToKeyValuePairs = (queryString) => {
    const keyValuePairs = {};
    const params = queryString.substring(1).split('&');

    params.forEach((param) => {
        const pair = param.split('=');
        const [keyPair, valuePair] = pair;

        if (keyPair.length > 0 && valuePair.length > 0) keyValuePairs[keyPair] = valuePair;
    });

    return keyValuePairs;
};

/**
 * Update existing key value pairs and return result
 * @param {Object} keyValuePairs current key value pairs
 * @param {String} currentKey key of the value to be updated
 * @param {String} currentValue value to be updated
 * @return {Object} Key-Value pairs
 */
const updateKeyValuePairs = (keyValuePairs, currentKey, currentValue) => {
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
 */
const convertKeyValuesToQueryString = (keyValuePairs) => {
    let newSearchQuery = '';

    Object.entries(keyValuePairs).forEach((pair) => {
        const [key, value] = pair;
        const keyExists = key !== '';
        const valueExists = typeof value === 'object' ? value.length : value !== '';

        if (valueExists && keyExists) {
            newSearchQuery += `${key}=${value}&`;
        }
    });

    return `${newSearchQuery.slice(0, -1)}`; // remove trailing '&'
};


const generateQuery = (keyValueObject, location, history) => {
    let query = history.location.search;

    Object.entries(keyValueObject).forEach((pair) => {
        const [key, value] = pair;

        const keyAndValueExist = !!key && !!value;

        if (query === '' && keyAndValueExist) {
            query = `?${key}=${value}`;
        } else if (getQueryParam(key, location) !== false) {
            const keyValuePairs = convertQueryStringToKeyValuePairs(query);
            const updatedKeyValuePairs = updateKeyValuePairs(keyValuePairs, key, value);
            const updatedQuery = convertKeyValuesToQueryString(updatedKeyValuePairs);

            query = updatedQuery.length ? `?${updatedQuery}` : '';
        } else if (keyAndValueExist) {
            query = `${query}&${key}=${value}`;
        }
    });

    return query;
};

/**
 * Set add key value pairs to url
 * @param {Object} variable Object with key value pairs to be added to url
 * @param {Object} variable location object from react-router
 * @param {Object} variable react router history object
 * @param {Object} variable is url flush required
 */
const setQueryParams = (keyValueObject, location, history) => {
    const query = generateQuery(keyValueObject, location, history);

    history.push({ search: query });
};

/**
 * Remove all queries except default sort options from url
 * @param {Object} variable react router history object
 */
const clearQueriesFromUrl = (history) => {
    history.push({ search: '' });
};

/**
 * Convert object with key value pairs to url query string
 * @param {Object} keyValuePairs object with key value pairs
 * @return {String} Converted query string
 */
const objectToUri = (keyValueObject = {}) => {
    const paramString = Object.entries(keyValueObject).sort()
        .reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '')
        .replace('&', '');

    return paramString.length > 0 ? `?${paramString}` : '';
};

export {
    getUrlParam,
    getQueryParam,
    generateQuery,
    setQueryParams,
    clearQueriesFromUrl,
    updateQueryParamWithoutHistory,
    removeQueryParamWithoutHistory,
    convertQueryStringToKeyValuePairs,
    objectToUri
};

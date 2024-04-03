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

import { History, Location } from 'history';
import { match as Match } from 'react-router-dom';

import { decodeString } from 'Util/Common';
import { getStoreState } from 'Util/Store';

/**
 * Update query params without adding to history
 * @param {String} name
 * @param {String} value
 * @namespace Util/Url/updateQueryParamWithoutHistory
 */
export const updateQueryParamWithoutHistory = (
    name: string,
    value: string,
    history: History,
    location: Location,
): void => {
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
export const removeQueryParamWithoutHistory = (name: string, history: History, location: Location): void => {
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
export const getUrlParam = (match: Match, location: Location): string => {
    const baseUrl = match.path.replace(window.storeRegexText, '').replace('/', '');
    const currentUrl = location.pathname.replace(new RegExp(`^${window.storeRegexText}`, 'i'), '');

    if (baseUrl === '/') {
        return currentUrl.replace(baseUrl, '');
    }

    return currentUrl.replace(baseUrl, '').replace(/^\/*/, '');
};

/** @namespace Util/Url/trimEndSlash */
export const trimEndSlash = (str: string): string => (str.endsWith('/') ? str.slice(0, -1) : str);

/**
 * Replaces section of URL with passed path value
 * @param {RegExp} regex replacement rule
 * @param {String} path replacement element
 * @returns {*}
 * @namespace Util/Url/replace
 */
export const replace = (regex: RegExp, path: string): string => {
    const { pathname = '' } = new URL(window.location.href);

    return pathname.replace(regex, path);
};

/**
 * Append store code to URL
 * @param {String} pathname the URL to append store code to
 * @namespace Util/Url/appendWithStoreCode
 */
export const appendWithStoreCode = (pathname: string): string => {
    const { ConfigReducer: { base_link_url = window.location.href } = {} } = getStoreState();
    const { pathname: storePrefix } = new URL(base_link_url);

    if (!pathname) {
        return trimEndSlash(storePrefix);
    }

    // match URLs which have the store code in pathname
    if (new RegExp(`^/(${window.storeList.join('|')})/`, 'i').test(pathname)) {
        return pathname;
    }

    // trim the last slash from URL, and append it to pathname
    return trimEndSlash(storePrefix).concat(!pathname.startsWith('/') ? `/${ pathname }` : pathname);
};

/**
 * Get query variable value (from react router)
 * @param {String} variable Variable from URL
 * @param {Object} location location object from react-router
 * @return {String|false} Variable value
 * @namespace Util/Url/getQueryParam
 */
export const getQueryParam = (variable: string, location: Location): string | false => {
    const query = decodeString(location.search.substring(1));
    const vars = query.split('&');

    return vars.reduce((acc: string | false, item: string) => {
        const splitIdx = item.indexOf('=');
        const [k, v] = [item.slice(0, splitIdx), item.slice(splitIdx + 1)];

        return k === variable ? v.replace(/=/g, ':') : acc;
    }, false);
};

/**
 * Convert url params to object with key value pairs
 * @param {String} queryString url query string
 * @return {Object} Key-Value pairs
 * @namespace Util/Url/convertQueryStringToKeyValuePairs
 */
export const convertQueryStringToKeyValuePairs = <T extends Record<string, string> = Record<string, string>>(
    queryString: string,
): T => {
    const keyValuePairs: Record<string, string> = {};
    const params = queryString.substring(1).split('&');

    params.forEach((param) => {
        const pair = param.split('=');
        const [keyPair, valuePair] = pair;

        if (keyPair.length > 0 && valuePair.length > 0) {
            keyValuePairs[keyPair] = decodeURIComponent(valuePair);
        }
    });

    return keyValuePairs as T;
};

/**
 * Update existing key value pairs and return result
 * @param {Object} keyValuePairs current key value pairs
 * @param {String} currentKey key of the value to be updated
 * @param {String} currentValue value to be updated
 * @return {Object} Key-Value pairs
 * @namespace Util/Url/updateKeyValuePairs
 */
export const updateKeyValuePairs = (
    keyValuePairs: Record<string, string | number>,
    currentKey: string,
    currentValue: string | number,
): Record<string, string | number> => {
    const updatedKeyValuePairs: Record<string, string | number> = {};

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
export const convertKeyValuesToQueryString = (
    keyValuePairs: Record<string, string | number>,
): string => Object.entries(keyValuePairs)
    .map((pair) => {
        const [key, value] = pair;
        const keyExists = key !== '';
        const valueExists = value !== '';

        if (valueExists && keyExists) {
            return `${key}=${value}`;
        }

        return null;
    })
    .filter((x) => !!x)
    .join('&');

/** @namespace Util/Url/generateQuery */
export const generateQuery = (
    keyValueObject: Record<string, string | number>,
    location: Location,
    history: History,
): string => Object.entries(keyValueObject)
    .reduce((acc, pair) => {
        const [key, rawValue] = pair;

        const value = encodeURI(rawValue);

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
export const setQueryParams = (keyValueObject: Record<string, string>, location: Location, history: History): void => {
    const { state } = location;
    const query = generateQuery(keyValueObject, location, history);

    history.push({ search: query, state });
};

/**
 * Remove all queries except default sort options from url
 * @param {Object} variable react router history object
 * @namespace Util/Url/clearQueriesFromUrl
 */
export const clearQueriesFromUrl = (history: History): void => {
    history.push({ search: '' });
};

/**
 * Convert object with key value pairs to url query string
 * @param {Object} keyValuePairs object with key value pairs
 * @return {String} Converted query string
 * @namespace Util/Url/objectToUri
 */
export const objectToUri = (keyValueObject: Record<string, string> = {}): string => {
    const paramString = Object.entries(keyValueObject).sort()
        .reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '')
        .replace('&', '');

    return paramString.length > 0 ? `?${paramString}` : '';
};

/** @namespace Util/Url/isHomePageUrl */
export const isHomePageUrl = (pathname: string): boolean => {
    const isHomePage = pathname === appendWithStoreCode('/')
        || pathname === '/'
        || pathname === appendWithStoreCode('')
        || pathname === '';

    return isHomePage;
};

/** @namespace Util/Url/getUrlPathname */
export const getUrlPathname = (url: string): string => {
    try {
        const { pathname } = new URL(url);

        return pathname;
    } catch (e) {
        return url;
    }
};

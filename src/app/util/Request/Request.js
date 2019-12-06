/* eslint-disable no-console */
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

import { getAuthorizationToken } from 'Util/Auth';
import { getCurrency } from 'Util/Currency/Current';
import { hash } from './Hash';

const currencyCode = getCurrency();
const GRAPHQL_URI = '/graphql';

/**
 * Append authorization token and Customer specific data to header object if sendSessionData is true
 * @param {Object} headers
 * @param {boolean} sendSessionData
 * @returns {Object} Headers with appended Session Data (token and Currency Code)
 */
const appendSessionDataToHeaders = (headers, sendSessionData) => {
    const token = getAuthorizationToken();

    const headerData = {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
    };

    if (sendSessionData) {
        if (currencyCode !== '') {
            headerData['Content-Currency'] = currencyCode;
        }
    }

    return headerData;
};

/**
 *
 * @param {String} query Request body
 * @param {Object} variables Request variables
 * @param {String} url GraphQL url
 * @returns {*}
 */
const formatURI = (query, variables, url) => {
    const stringifyVariables = Object.keys(variables).reduce(
        (acc, variable) => [...acc, `${ variable }=${ variables[ variable ] }`],
        [`?hash=${ hash(query + currencyCode) }`]
    );

    return `${ url }${ stringifyVariables.join('&') }`.replace(/ /g, '');
};

/**
 *
 * @param {String} uri
 * @param {String} name
 * @returns {Promise<Response>}
 */
const getFetch = (uri, name, sendSessionData) => fetch(uri,
    {
        method: 'GET',
        headers: appendSessionDataToHeaders({
            'Content-Type': 'application/json',
            'Application-Model': name,
            Accept: 'application/json'
        }, sendSessionData)
    });

/**
 *
 * @param {String} graphQlURI
 * @param {{}} query Request body
 * @param {Int} cacheTTL
 */
const putPersistedQuery = (graphQlURI, query, cacheTTL) => fetch(`${ graphQlURI }?hash=${ hash(query + currencyCode) }`,
    {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'SW-Cache-Age': cacheTTL
        }
    });

/**
 *
 * @param {String} graphQlURI
 * @param {String} queryObject
 * @param {String} name
 * @returns {Promise<Response>}
 */
const postFetch = (graphQlURI, query, variables) => fetch(graphQlURI,
    {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: appendSessionDataToHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    });

/**
 * Checks for errors in response, if they exist, rejects promise
 * @param  {Object} res Response from GraphQL endpoint
 * @return {Promise<Object>} Handled GraphqlQL results promise
 */
const checkForErrors = res => new Promise((resolve, reject) => {
    const { errors, data } = res;
    return errors ? reject(errors) : resolve(data);
});

/**
 * Handle connection errors
 * @param  {any} err Error from fetch
 * @return {void} Simply console error
 */
const handleConnectionError = err => console.error(err); // TODO: Add to logs pool

/**
 * Parse response and check wether it contains errors
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
const parseResponse = promise => new Promise((resolve, reject) => {
    promise.then(
        res => res.json().then(
            res => resolve(checkForErrors(res)),
            () => handleConnectionError('Can not transform JSON!') && reject()
        ),
        err => handleConnectionError('Can not establish connection!') && reject(err)
    );
});

export const HTTP_410_GONE = 410;
export const HTTP_201_CREATED = 201;

/**
 * Make GET request to endpoint (via ServiceWorker)
 * Pass sendSessionData as false to not to send Customer Specific Data
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @param {boolean} sendSessionData
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
export const executeGet = (queryObject, name, cacheTTL, sendSessionData = true) => {
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, GRAPHQL_URI);

    return parseResponse(new Promise((resolve) => {
        getFetch(uri, name, sendSessionData).then((res) => {
            if (res.status === HTTP_410_GONE) {
                putPersistedQuery(GRAPHQL_URI, query, cacheTTL).then((putResponse) => {
                    if (putResponse.status === HTTP_201_CREATED) {
                        getFetch(uri, name, sendSessionData).then(res => resolve(res));
                    }
                });
            } else {
                resolve(res);
            }
        });
    }));
};

/**
 * Make POST request to endpoint
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
export const executePost = (queryObject) => {
    const { query, variables } = queryObject;
    return parseResponse(postFetch(GRAPHQL_URI, query, variables));
};

/**
 * Listen to the BroadCast connection
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @return {Promise<any>} Broadcast message promise
 */
export const listenForBroadCast = name => new Promise((resolve) => {
    const { BroadcastChannel } = window;
    if (BroadcastChannel) {
        const bc = new BroadcastChannel(name);
        bc.onmessage = (update) => {
            const { data: { payload: body } } = update;
            resolve(checkForErrors(body));
        };
    }
});

export const debounce = (callback, delay) => {
    // eslint-disable-next-line fp/no-let
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), delay);
    };
};

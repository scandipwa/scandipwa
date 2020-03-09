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
import { hash } from './Hash';

export const GRAPHQL_URI = '/graphql';

/**
 * Append authorization token to header object
 * @param {Object} headers
 * @returns {Object} Headers with appended authorization
 */
export const appendTokenToHeaders = (headers) => {
    const token = getAuthorizationToken();

    return {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
    };
};

/**
 *
 * @param {String} query Request body
 * @param {Object} variables Request variables
 * @param {String} url GraphQL url
 * @returns {*}
 */
export const formatURI = (query, variables, url) => {
    const stringifyVariables = Object.keys(variables).reduce(
        (acc, variable) => [...acc, `${ variable }=${ variables[ variable ] }`],
        [`?hash=${ hash(query) }`]
    );

    return `${ url }${ stringifyVariables.join('&') }`.replace(/ /g, '');
};

/**
 *
 * @param {String} uri
 * @param {String} name
 * @returns {Promise<Response>}
 */
export const getFetch = (uri, name) => fetch(uri,
    {
        method: 'GET',
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            'Application-Model': name,
            Accept: 'application/json'
        })
    });

/**
 *
 * @param {String} graphQlURI
 * @param {{}} query Request body
 * @param {Int} cacheTTL
 */
export const putPersistedQuery = (graphQlURI, query, cacheTTL) => fetch(`${ graphQlURI }?hash=${ hash(query) }`,
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
export const postFetch = (graphQlURI, query, variables) => fetch(graphQlURI,
    {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    });

/**
 * Checks for errors in response, if they exist, rejects promise
 * @param  {Object} res Response from GraphQL endpoint
 * @return {Promise<Object>} Handled GraphqlQL results promise
 */
export const checkForErrors = res => new Promise((resolve, reject) => {
    const { errors, data } = res;
    return errors ? reject(errors) : resolve(data);
});

/**
 * Handle connection errors
 * @param  {any} err Error from fetch
 * @return {void} Simply console error
 */
export const handleConnectionError = err => console.error(err); // TODO: Add to logs pool

/**
 * Parse response and check wether it contains errors
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
export const parseResponse = promise => new Promise((resolve, reject) => {
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
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
export const executeGet = (queryObject, name, cacheTTL) => {
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, GRAPHQL_URI);

    return parseResponse(new Promise((resolve) => {
        getFetch(uri, name).then((res) => {
            if (res.status === HTTP_410_GONE) {
                putPersistedQuery(GRAPHQL_URI, query, cacheTTL).then((putResponse) => {
                    if (putResponse.status === HTTP_201_CREATED) {
                        getFetch(uri, name).then(res => resolve(res));
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

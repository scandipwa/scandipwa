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

const GRAPHQL_URI = '/graphql';

/**
 * Append authorization token to header object
 * @param {Object} headers
 * @returns {Object} Headers with appended authorization
 */
const appendTokenToHeaders = (headers) => {
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
const formatURI = (query, variables, url) => {
    let requestUrl;
    const stringifyVariables = [`?hash=${ hash(query) }`];
    Object.keys(variables).forEach((variable) => {
        stringifyVariables.push(`${ variable }=${ variables[ variable ] }`);
    });
    if (stringifyVariables.length) {
        requestUrl = `${ url }${ stringifyVariables.join('&') }`;
    }
    requestUrl = requestUrl.replace(/ /g, '');

    return requestUrl;
};

/**
 * Checks if the given query is a GraphQL mutation
 * @param  {String} query
 * @return {Promise<Object>}
 */
const isMutation = query => query.substring(0, query.indexOf('(')) === 'mutation';

/**
 *
 * @param {String} uri
 * @param {String} name
 * @returns {Promise<Response>}
 */
const getFetch = (uri, name) => fetch(uri,
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
const putPersistedQuery = (graphQlURI, query, cacheTTL) => fetch(`${ graphQlURI }?hash=${ hash(query) }`,
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
const parseResponse = promise => promise.then(
    res => res.json().then(checkForErrors, () => handleConnectionError('Can not transform JSON!')),
    () => handleConnectionError('Can not establish connection!')
);

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
            if (res.status === 410) {
                putPersistedQuery(GRAPHQL_URI, query, cacheTTL).then((putResponse) => {
                    if (putResponse.status === 201) {
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

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

import { hash } from './Hash';

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
        headers: {
            'Content-Type': 'application/json',
            'Application-Model': name,
            Accept: 'application/json'
        }
    });

/**
 *
 * @param {String} graphQlURI
 * @param {String} queryObject
 * @param {String} name
 * @returns {Promise<Response>}
 */
const postFetch = (graphQlURI, queryObject, name) => fetch(graphQlURI,
    {
        method: 'POST',
        body: JSON.stringify(queryObject),
        headers: {
            'Content-Type': 'application/json',
            'Application-Model': name
        }
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
 * Make fetch request to endpoint (via ServiceWorker)
 * @param  {{}} queryObject prepared with `prepareQuery()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 */
const executeFetch = (queryObject, name, cacheTTL) => {
    const graphQlURI = '/graphql';
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, graphQlURI);

    if (isMutation(query)) {
        return new Promise((resolve) => {
            postFetch(graphQlURI, queryObject, name).then(res => resolve(res));
        });
    }

    return new Promise((resolve) => {
        getFetch(uri, name).then((res) => {
            if (res.status === 410) {
                putPersistedQuery(graphQlURI, query, cacheTTL).then((putResponse) => {
                    if (putResponse.status === 201) {
                        getFetch(uri, name).then(res => resolve(res));
                    }
                });
            } else {
                resolve(res);
            }
        });
    });
};

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
 * Make GraphQL request to endpoint (via ServiceWorker)
 * @param  {String} query prepared with `
 prepareQuery()` from `
 Util / Query` request body string
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Object>} Handled GraphqlQL results promise
 */
export const makeGraphqlRequest = (query, name, cacheTTL) => executeFetch(query, name, cacheTTL)
    .then(
        res => res.json().then(checkForErrors, () => handleConnectionError('Can not transform JSON!')),
        () => handleConnectionError('Can not establish connection!')
    );

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

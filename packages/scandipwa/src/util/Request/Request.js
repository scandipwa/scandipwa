/* eslint-disable @scandipwa/scandipwa-guidelines/no-arrow-functions-in-class */
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

import { getAuthorizationToken, isSignedIn, refreshAuthorizationToken } from 'Util/Auth';
import { refreshUid } from 'Util/Compare';
import { getCurrency } from 'Util/Currency';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { hash } from './Hash';

export const GRAPHQL_URI = '/graphql';
export const WINDOW_ID = 'WINDOW_ID';

/** @namespace Util/Request/getWindowId */
export const getWindowId = () => {
    const result = sessionStorage.getItem(WINDOW_ID);

    if (!result) {
        const id = Date.now();

        sessionStorage.setItem(WINDOW_ID, id);

        return id;
    }

    return result;
};

/** @namespace Util/Request/getStoreCodePath */
export const getStoreCodePath = () => {
    const path = location.pathname;
    // eslint-disable-next-line no-undef
    const firstPathPart = path.split('/')[1];

    if (window.storeList.includes(firstPathPart)) {
        return `/${ firstPathPart }`;
    }

    return '';
};

/** @namespace Util/Request/getGraphqlEndpoint */
export const getGraphqlEndpoint = () => getStoreCodePath().concat(GRAPHQL_URI);

/**
 * Append authorization token to header object
 * @param {Object} headers
 * @returns {Object} Headers with appended authorization
 * @namespace Util/Request/appendTokenToHeaders
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
 * @namespace Util/Request/formatURI
 */
export const formatURI = (query, variables, url) => {
    // eslint-disable-next-line no-param-reassign
    variables._currency = getCurrency();

    const stringifyVariables = Object.keys(variables).reduce(
        (acc, variable) => [...acc, `${ variable }=${ JSON.stringify(variables[variable]) }`],
        [`?hash=${ hash(query) }`]
    );

    return `${ url }${ stringifyVariables.join('&') }`;
};

/**
 *
 * @param {String} uri
 * @param {String} name
 * @returns {Promise<Response>}
 * @namespace Util/Request/getFetch
 */
export const getFetch = (uri, name, signal) => fetch(uri,
    {
        method: 'GET',
        signal,
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            'Application-Model': `${ name }_${ getWindowId() }`,
            Accept: 'application/json'
        })
    });

/**
 *
 * @param {String} graphQlURI
 * @param {{}} query Request body
 * @param {Int} cacheTTL
 * @namespace Util/Request/putPersistedQuery
 */
export const putPersistedQuery = (graphQlURI, query, cacheTTL) => fetch(`${ graphQlURI }?hash=${ hash(query) }`,
    {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'SW-Cache-Age': Number.isInteger(cacheTTL) ? cacheTTL : ONE_MONTH_IN_SECONDS
        }
    });

/**
 *
 * @param {String} graphQlURI
 * @param {String} queryObject
 * @param {String} name
 * @returns {Promise<Response>}
 * @namespace Util/Request/postFetch
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
 * @namespace Util/Request/checkForErrors
 */
export const checkForErrors = (res) => new Promise((resolve, reject) => {
    const { errors, data } = res;

    return errors ? reject(errors) : resolve(data);
});

/**
 * Handle connection errors
 * @param  {any} err Error from fetch
 * @return {void} Simply console error
 * @namespace Util/Request/handleConnectionError
 */
export const handleConnectionError = (err, msg = 'error') => {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(msg);
        console.error(err);
    }
    throw new Error(err);
}; // TODO: Add to logs pool

/**
 * Parse response and check wether it contains errors
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/parseResponse
 */
export const parseResponse = async (response) => {
    const data = await response.json()
        .catch(
        /** @namespace Util/Request/parseResponse/data/json/catch */
            (err) => {
                handleConnectionError(err, 'Can not parse JSON!');
            }
        );

    return checkForErrors(data);
};

export const HTTP_503_SERVICE_UNAVAILABLE = 503;
export const HTTP_410_GONE = 410;
export const HTTP_201_CREATED = 201;

/**
 * Make GET request to endpoint (via ServiceWorker)
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executeGet
 */
export const executeGet = async (queryObject, name, cacheTTL, signal) => {
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, getGraphqlEndpoint());

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    // circumvention of the eslint rule that prohibits usage of let
    const res = [];

    try {
        res[0] = await getFetch(uri, name, signal);

        return parseResponse(res[0]);
    } catch (err) {
        if (res.status === HTTP_410_GONE) {
            const putResponse = await putPersistedQuery(getGraphqlEndpoint(), query, cacheTTL);

            if (putResponse.status === HTTP_201_CREATED) {
                res[0] = await getFetch(uri, name, signal);
            }
        } else if (res.status === HTTP_503_SERVICE_UNAVAILABLE) {
            handleConnectionError(err, 'Service unavailable!...');
        }

        handleConnectionError(err, 'executeGet failed');

        return null;
    }
};

/**
 * Make POST request to endpoint
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executePost
 */
export const executePost = async (queryObject) => {
    const { query, variables } = queryObject;

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    try {
        const response = await postFetch(getGraphqlEndpoint(), query, variables);

        return parseResponse(response);
    } catch (err) {
        handleConnectionError(err, 'executePost failed');

        return null;
    }
};

/**
 * Listen to the BroadCast connection
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @return {Promise<any>} Broadcast message promise
 * @namespace Util/Request/listenForBroadCast
 */
export const listenForBroadCast = (name) => new Promise((resolve) => {
    const { BroadcastChannel } = window;
    const windowId = getWindowId();

    if (BroadcastChannel) {
        const bc = new BroadcastChannel(`${ name }_${ windowId }`);

        bc.onmessage = (update) => {
            const { data: { payload: body } } = update;

            resolve(checkForErrors(body));
        };
    }
});

/** @namespace Util/Request/debounce */
export const debounce = (callback, delay) => {
    // eslint-disable-next-line fp/no-let
    let timeout;

    return (...args) => {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), delay);
    };
};

/** @namespace Util/Request */
export class Debouncer {
    timeout;

    handler = () => {};

    startDebounce = (callback, delay) => (...args) => {
        const context = this;

        clearTimeout(this.timeout);
        this.handler = () => callback.apply(context, args);
        this.timeout = setTimeout(this.handler, delay);
    };

    cancelDebounce = () => {
        clearTimeout(this.timeout);
    };

    cancelDebounceAndExecuteImmediately = () => {
        clearTimeout(this.timeout);
        this.handler();
    };
}

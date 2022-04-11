/* eslint-disable @scandipwa/scandipwa-guidelines/no-arrow-functions-in-class */
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

import { GraphQlResponse } from '@tilework/opus';

import { getAuthorizationToken, isSignedIn, refreshAuthorizationToken } from 'Util/Auth';
import { refreshUid } from 'Util/Compare';
import { getCurrency } from 'Util/Currency';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { hash } from './Hash';

export const GRAPHQL_URI = '/graphql';
export const WINDOW_ID = 'WINDOW_ID';

/** @namespace Util/Request/getWindowId */
export const getWindowId = (): string => {
    const result = sessionStorage.getItem(WINDOW_ID);

    if (!result) {
        const id = String(Date.now());
        sessionStorage.setItem(WINDOW_ID, id);

        return id;
    }

    return result;
};

/** @namespace Util/Request/getStoreCodePath */
export const getStoreCodePath = (): string => {
    const path = location.pathname;
    // eslint-disable-next-line no-undef
    const firstPathPart = path.split('/')[1];

    if (window.storeList.includes(firstPathPart)) {
        return `/${ firstPathPart }`;
    }

    return '';
};

/** @namespace Util/Request/getGraphqlEndpoint */
export const getGraphqlEndpoint = (): string => getStoreCodePath().concat(GRAPHQL_URI);

/**
 * Append authorization token to header object
 * @param {Object} headers
 * @returns {Object} Headers with appended authorization
 * @namespace Util/Request/appendTokenToHeaders
 */
export const appendTokenToHeaders = (headers: HeadersInit): HeadersInit => {
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
export const formatURI = (query: string, variables: Record<string, string>, url: string): string => {
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
export const getFetch = (uri: string, name: string): Promise<Response> => fetch(uri,
    {
        method: 'GET',
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            'Application-Model': `${ name }_${ getWindowId() }`,
            Accept: 'application/json'
        })
    });

// TODO CacheTTL number or string?
/**
 *
 * @param {String} graphQlURI
 * @param {{}} query Request body
 * @param {Int} cacheTTL
 * @namespace Util/Request/putPersistedQuery
 */
export const putPersistedQuery = (
    graphQlURI: string,
    query: string,
    cacheTTL: number
): Promise<Response> => fetch(`${ graphQlURI }?hash=${ hash(query) }`,
    {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'SW-Cache-Age': String(Number.isInteger(cacheTTL) ? cacheTTL : ONE_MONTH_IN_SECONDS)
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
export const postFetch = (
    graphQlURI: string,
    query: string,
    variables: Record<string, string>
): Promise<Response> => fetch(graphQlURI,
    {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    });

export type ResponseBody<T> = Omit<GraphQlResponse, 'data'> & {
    data: T;
};

/**
 * Checks for errors in response, if they exist, rejects promise
 * @param  {Object} res Response from GraphQL endpoint
 * @return {Promise<Object>} Handled GraphqlQL results promise
 * @namespace Util/Request/checkForErrors
 */
export const checkForErrors = <T>(res: ResponseBody<T>): Promise<T> => new Promise((resolve, reject) => {
    const { errors, data } = res;

    return errors ? reject(errors) : resolve(data);
});

/**
 * Handle connection errors
 * @param  {any} err Error from fetch
 * @return {void} Simply console error
 * @namespace Util/Request/handleConnectionError
 */
// eslint-disable-next-line no-console
export const handleConnectionError = (err: unknown): void => console.error(err); // TODO: Add to logs pool

/**
 * Parse response and check wether it contains errors
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/parseResponse
 */
export const parseResponse = <T>(promise: Promise<Response>): Promise<T> => new Promise((resolve, reject) => {
    promise.then(
        /** @namespace Util/Request/parseResponse/Promise/promise/then */
        (res) => res.json().then(
            /** @namespace Util/Request/parseResponse/Promise/promise/then/json/then/resolve */
            (res) => resolve(checkForErrors(res)),
            /** @namespace Util/Request/parseResponse/Promise/promise/then/json/then/catch */
            () => {
                handleConnectionError('Can not transform JSON!');
                return reject();
            }
        ),
        /** @namespace Util/Request/parseResponse/Promise/promise/then/catch */
        (err) => {
            handleConnectionError('Can not establish connection!');
            return reject(err);
        }
    );
});

export const HTTP_503_SERVICE_UNAVAILABLE = 503;
export const HTTP_410_GONE = 410;
export const HTTP_201_CREATED = 201;

// TODO
export type QueryObject = {
    query: string;
    variables: Record<string, string>;
};

export type QueryVariables = Record<string, string>;

/**
 * Make GET request to endpoint (via ServiceWorker)
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executeGet
 */
export const executeGet = (queryObject: QueryObject, name: string, cacheTTL: number): Promise<unknown> => {
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, getGraphqlEndpoint());

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    return parseResponse(new Promise((resolve, reject): void => {
        getFetch(uri, name).then(
            /** @namespace Util/Request/executeGet/parseResponse/getFetch/then */
            (res) => {
                if (res.status === HTTP_410_GONE) {
                    putPersistedQuery(getGraphqlEndpoint(), query, cacheTTL).then(
                        /** @namespace Util/Request/executeGet/parseResponse/getFetch/then/putPersistedQuery/then */
                        (putResponse) => {
                            if (putResponse.status === HTTP_201_CREATED) {
                                getFetch(uri, name).then(
                                    /** @namespace Util/Request/executeGet/parseResponse/getFetch/then/putPersistedQuery/then/getFetch/then/resolve */
                                    (res) => resolve(res)
                                );
                            }
                        }
                    );
                } else if (res.status === HTTP_503_SERVICE_UNAVAILABLE) {
                    reject(res);
                } else {
                    resolve(res);
                }
            }
        );
    }));
};

/**
 * Make POST request to endpoint
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executePost
 */
export const executePost = <T>(queryObject: QueryObject): Promise<T> => {
    const { query, variables } = queryObject;

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    return parseResponse(postFetch(getGraphqlEndpoint(), query, variables));
};

/**
 * Listen to the BroadCast connection
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @return {Promise<any>} Broadcast message promise
 * @namespace Util/Request/listenForBroadCast
 */
export const listenForBroadCast = (name: string): Promise<unknown> => new Promise((resolve) => {
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

// TODO
/** @namespace Util/Request/debounce */
export const debounce = <T>(callback: () => void, delay: number): (...args: T[]) => void => {
    // eslint-disable-next-line fp/no-let
    let timeout: NodeJS.Timeout;

    return (...args: T[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args as []), delay);
    };
};

/** @namespace Util/Request */
export class Debouncer <
    T extends () => void,
    U extends number,
    S
> {
    timeout!: NodeJS.Timeout;

    handler = (): void => {};

    startDebounce = (callback:T, delay: U) => (...args: S[]): void => {
        clearTimeout(this.timeout);
        this.handler = () => callback.apply(this, args as []);
        this.timeout = setTimeout(this.handler, delay);
    };

    cancelDebounce = (): void => {
        clearTimeout(this.timeout);
    };

    cancelDebounceAndExecuteImmediately = (): void => {
        clearTimeout(this.timeout);
        this.handler();
    };
}

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

/**
 * Register
 * - Creates new pool which can be accessed via unique code
 * @param code unique code
 * @param events callback events for: onSubscribe, onUnSubscribe, onInvoke, getInvokeData
 * @namespace Util/ObserverPool/register
 */
export const register = (code, events = {}) => {
    if (!window.pool) {
        window.pool = {};
    }

    if (window.pool[code]) {
        window.pool[code].events = events;

        return;
    }

    window.pool[code] = {
        uid: 0,
        events,
        pool: {}
    };
};

/**
 * Subscribe
 * - Adds function to specific pool.
 * @param code pool to which to subscribe
 * @param fn function that will be called on invoke
 * @param data optional data that can be passed to onSubscribe event
 * @returns {*} uid on success / false on fail
 * @namespace Util/ObserverPool/subscribe
 */
export const subscribe = (code, fn, data = null) => {
    if (!window.pool || !window.pool[code]) {
        return false;
    }

    const {
        uid,
        events: {
            onSubscribe
        } = {},
        pool
    } = window.pool[code];

    pool[uid] = fn;

    if (typeof onSubscribe === 'function') {
        onSubscribe(uid, data);
    }

    window.pool[code].uid++;

    return uid;
};

/**
 * Unsubscribe
 * - Removes function from pool
 * @param code pool code
 * @param uid function uid, that was gotten from subscribe
 * @namespace Util/ObserverPool/unsubscribe
 */
export const unsubscribe = (code, uid) => {
    if (!window.pool || !window.pool[code]) {
        return;
    }

    const {
        events: {
            onUnSubscribe
        } = {},
        pool
    } = window.pool[code];

    // eslint-disable-next-line fp/no-delete
    delete pool[uid];

    if (typeof onUnSubscribe === 'function') {
        onUnSubscribe(uid);
    }
};

/**
 * Invoke
 * - When called all subscribed pool functions will be called, by passing
 * - data from getInvokeData event (fallback: @param data).
 * @param code pool to invoke
 * @param data optional data to pass.
 * @namespace Util/ObserverPool/invoke
 */
export const invoke = (code, data = []) => {
    if (!window.pool || !window.pool[code]) {
        return;
    }

    const {
        events: {
            getInvokeData,
            onInvoke
        } = {},
        pool
    } = window.pool[code];

    const invokeData = typeof getInvokeData === 'function' ? getInvokeData(data) : data;
    const collectedOutput = {};

    Object.keys(pool).forEach((uid) => {
        collectedOutput[uid] = pool[uid](invokeData);
    });

    if (typeof onInvoke === 'function') {
        onInvoke(collectedOutput);
    }
};

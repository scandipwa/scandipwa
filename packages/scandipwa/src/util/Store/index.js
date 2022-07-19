/* eslint-disable no-param-reassign */
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
import { combineReducers, createStore } from 'redux';

/**
 * Configure the store
 * @namespace Util/Store/Index/configureStore
 */
export function configureStore(store) {
    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(combineReducers(store.asyncReducers));
    };

    // Return the modified store
    return store;
}

/** @namespace Util/Store/Index/noopReducer */
export const noopReducer = (state) => state;

export const getStore = (() => {
    // Initialize the store
    const store = configureStore(createStore(
        noopReducer,
        ( // enable Redux dev-tools only in development
            process.env.NODE_ENV === 'development'
            && window.__REDUX_DEVTOOLS_EXTENSION__
        ) && window.__REDUX_DEVTOOLS_EXTENSION__({
            trace: true
        })
    ));

    return function storeGetter() {
        return store;
    };
})();

export default getStore;

/* eslint-disable no-param-reassign */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
*/
import {
    AnyAction, combineReducers, createStore, Reducer, Store,
} from 'redux';

import { RootState } from 'Util/Store/Store.type';

/**
 * Configure the store
 * @namespace Util/Store/Index/configureStore
 */
export function configureStore<S, T extends ModifiedReduxStore<S>>(store: T): T {
    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key: string, asyncReducer: Reducer) => {
        if (store.asyncReducers) {
            store.asyncReducers[key] = asyncReducer;
            store.replaceReducer(combineReducers(store.asyncReducers));
        }
    };

    // Return the modified store
    return store;
}

/** @namespace Util/Store/Index/noopReducer */
export const noopReducer = <T>(state: T): T => state;

// Initialize the store
export const store: Store<RootState, AnyAction> = configureStore(createStore(
    noopReducer,
    (( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })) || undefined,
) as Store<RootState, AnyAction>);

/** @namespace Util/Store/Index/getStore */
export const getStore = (): typeof store => store;

export default getStore;

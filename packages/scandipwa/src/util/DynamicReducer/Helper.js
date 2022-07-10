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

/**
 * @param store
 * @param reducers
 */
export default function injectToReducers(store, reducers) {
    Object.keys(reducers).forEach((key) => {
        if (!Reflect.has(store.asyncReducers, key)) {
            // eslint-disable-next-line no-param-reassign
            store.asyncReducers[key] = reducers[key];
            store.injectReducer(key, reducers[key]);
        }
    });
}

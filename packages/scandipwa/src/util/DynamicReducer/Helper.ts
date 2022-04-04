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

import { ReducersMapObject } from 'redux';

/**
 * @param store
 * @param reducers
 */
export default function injectToReducers <S, A, T extends ModifiedReduxStore<S, A>>(
    store: T,
    reducers: ReducersMapObject
): void {
    Object.keys(reducers).forEach((key) => {
        if (store.asyncReducers && store.injectReducer && !Reflect.has(store.asyncReducers, key)) {
            // eslint-disable-next-line no-param-reassign
            store.asyncReducers[key] = reducers[key];
            store.injectReducer(key, reducers[key]);
        }
    });
}

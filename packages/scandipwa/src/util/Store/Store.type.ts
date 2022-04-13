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
import {
    AnyAction,
    Reducer,
    ReducersMapObject,
    Store
} from 'redux';

import { store } from 'Util/Store';

/**
  * Extend this interface from reducers!
  *
  * @example
  * ```ts
     declare module 'Util/Store/Store.type'; {
         export interface RootState {
             BreadcrumbsReducer: BreadcrumbsStore
         }
     }
  * ```
  */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}

export type AppDispatch = typeof store.dispatch;

declare global {
    export type InjectReducer<S> = (key: string, asyncReducer: Reducer<S, AnyAction>) => void;

    export type ModifiedReduxStore<S> = (Store<S, AnyAction> & {
        asyncReducers?: ReducersMapObject;
        injectReducer?: InjectReducer<S>;
    });
}

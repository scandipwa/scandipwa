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
import { store } from 'Util/Store';

/**
 * Extend this interface from reducers!
 *
 * @example
 * ```ts
    declare module 'Util/Store/type' {
        export interface RootState {
            BreadcrumbsReducer: BreadcrumbsStore
        }
    }
 * ```
 */
export interface RootState {}

export type AppDispatch = typeof store.dispatch

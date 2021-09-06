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

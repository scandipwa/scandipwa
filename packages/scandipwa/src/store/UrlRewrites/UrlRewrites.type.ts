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
import { AnyAction } from 'redux';

import { UrlRewrite } from 'Type/Router.type';

export enum UrlRewritesActionType {
    UPDATE_URL_REWRITE = 'UPDATE_URL_REWRITE',
    IS_LOADING_URL_REWRITE = 'IS_LOADING_URL_REWRITE'
}

export interface UpdateUrlRewrite extends AnyAction {
    type: UrlRewritesActionType.UPDATE_URL_REWRITE;
    urlRewrite: Record<string, UrlRewrite>;
    requestedUrl: string;
}

export interface SetIsUrlRewritesLoading extends AnyAction {
    type: UrlRewritesActionType.IS_LOADING_URL_REWRITE;
    isLoading: boolean;
}

export type UrlRewritesAction = UpdateUrlRewrite | SetIsUrlRewritesLoading;

export type UrlRewritesStore = {
    urlRewrite: UrlRewrite;
    requestedUrl: string;
    isLoading: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        UrlRewritesReducer: UrlRewritesStore;
    }
}

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
import { AnyAction } from 'redux';

import { UrlRewritesOutput } from 'Query/UrlRewrites.type';
import { Merge } from 'Type/Common.type';

export type UrlRewrite = Merge<Partial<UrlRewritesOutput>, {
    notFound?: boolean;
}>;

export enum UrlRewritesActionType {
    UPDATE_URL_REWRITE = 'UPDATE_URL_REWRITE',
    IS_LOADING_URL_REWRITE = 'IS_LOADING_URL_REWRITE'
}

export interface UpdateUrlRewriteAction extends AnyAction {
    type: UrlRewritesActionType.UPDATE_URL_REWRITE;
    urlRewrite: UrlRewrite;
    requestedUrl: string;
}

export interface SetIsUrlRewritesLoadingAction extends AnyAction {
    type: UrlRewritesActionType.IS_LOADING_URL_REWRITE;
    isLoading: boolean;
}

export type UrlRewritesAction = UpdateUrlRewriteAction | SetIsUrlRewritesLoadingAction;

export interface UrlRewritesStore {
    urlRewrite: UrlRewrite;
    requestedUrl: string;
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        UrlRewritesReducer: UrlRewritesStore;
    }
}

export interface UrlRewritesDispatcherData {
    urlResolver: UrlRewritesOutput;
}

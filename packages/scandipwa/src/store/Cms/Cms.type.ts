/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { CmsPageFields } from 'Query/CmsPage.type';

export enum CmsActionType {
    UPDATE_CMS_PAGE = 'UPDATE_CMS_PAGE',
    UPDATE_CMS_PAGE_LOADING = 'UPDATE_CMS_PAGE_LOADING',
}

export interface UpdateCmsPageAction extends AnyAction {
    type: CmsActionType.UPDATE_CMS_PAGE;
    cmsPage: CmsPageFields;
}

export interface UpdateCmsPageLoadingAction extends AnyAction {
    type: CmsActionType.UPDATE_CMS_PAGE_LOADING;
    isLoading: boolean;
}

export type CmsAction = UpdateCmsPageLoadingAction | UpdateCmsPageAction;

export interface CmsStore {
    cmsPage: Partial<CmsPageFields>;
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CmsReducer: CmsStore;
    }
}

export interface CmsDispatcherData {
    cmsPage: CmsPageFields;
}

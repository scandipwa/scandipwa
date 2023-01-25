/* eslint-disable import/prefer-default-export */
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

import { CmsPageFields } from 'Query/CmsPage.type';

import { CmsActionType, UpdateCmsPageAction, UpdateCmsPageLoadingAction } from './Cms.type';

/** @namespace Store/Cms/Action/updateCmsPage */
export const updateCmsPage = (cmsPage: CmsPageFields): UpdateCmsPageAction => ({
    type: CmsActionType.UPDATE_CMS_PAGE,
    cmsPage,
});

/** @namespace Store/Cms/Action/updateCmsPageLoading */
export const updateCmsPageLoading = (isLoading: boolean): UpdateCmsPageLoadingAction => ({
    type: CmsActionType.UPDATE_CMS_PAGE_LOADING,
    isLoading,
});

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

import { Reducer } from 'redux';

import {
    CmsAction, CmsActionType, CmsStore,
} from './Cms.type';

/** @namespace Store/Cms/Reducer/getInitialState */
export const getInitialState = (): CmsStore => {
    const {
        actionName: {
            cmsPage = {},
        } = {},
    } = window;

    return {
        cmsPage,
        isLoading: !Object.keys(cmsPage)?.length,
    };
};

/** @namespace Store/Cms/Reducer/CmsReducer */
export const CmsReducer: Reducer<CmsStore, CmsAction> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case CmsActionType.UPDATE_CMS_PAGE: {
        const { cmsPage = {} } = action;

        return {
            ...state,
            cmsPage,
            isLoading: false,
        };
    }

    case CmsActionType.UPDATE_CMS_PAGE_LOADING: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading,
        };
    }

    default:
        return state;
    }
};

export default CmsReducer;

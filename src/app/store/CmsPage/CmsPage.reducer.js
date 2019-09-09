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

import { UPDATE_CMS_PAGE } from './CmsPage.action';

export const initialState = {
    page: {},
    isLoading: true
};

const CmsPageReducer = (state = initialState, action) => {
    const {
        page,
        isLoading,
        type
    } = action;

    switch (type) {
    case UPDATE_CMS_PAGE:
        return {
            ...state,
            page,
            isLoading
        };

    default:
        return state;
    }
};

export default CmsPageReducer;

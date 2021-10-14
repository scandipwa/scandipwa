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

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const UrlRewritesDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/UrlRewrites/UrlRewrites.dispatcher'
);

export const useUrlRewritesStore = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    return {
        requestUrlRewrite: (urlParam = location.pathname) => {
            UrlRewritesDispatcher.then(
                ({ default: dispatcher }) => dispatcher.handleData(dispatch, { urlParam })
            );
        }
    };
};

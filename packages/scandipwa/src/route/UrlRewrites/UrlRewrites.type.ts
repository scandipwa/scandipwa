/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { RouteComponentProps } from 'react-router';

import { UrlRewrite } from 'Store/UrlRewrites/UrlRewrites.type';

export interface UrlRewritesContainerMapStateProps {
    urlRewrite: UrlRewrite;
    isLoading: boolean;
    requestedUrl: string;
}

export interface UrlRewritesContainerMapDispatchProps {
    requestUrlRewrite: (urlParam: string) => void;
}

export type UrlRewritesContainerProps = UrlRewritesContainerMapStateProps
& UrlRewritesContainerMapDispatchProps
& RouteComponentProps;

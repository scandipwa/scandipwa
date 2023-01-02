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

import { match as Match } from 'react-router';

import { CategoryDisplayMode } from 'Route/CategoryPage/CategoryPage.config';
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
& {
    match: Match;
};

export interface UrlRewritesComponentProps {
    type: string;
    props: UrlRewriteProps | EmptyObject;
}

export type UrlRewritesContainerPropsKeys = 'type'
| 'props';

export type UrlRewriteProps = Partial<UrlRewriteTypeSpecificProps> & {
    match: Match;
};

export interface UrlRewritesComponentState {}

export interface UrlRewritesContainerState {}

export interface UrlRewriteTypeSpecificProps {
    productSKU: string;
    id: number;
    isOnlyPlaceholder: boolean;
    pageIds: number;
    categoryIds: number;
    displayMode: CategoryDisplayMode;
}

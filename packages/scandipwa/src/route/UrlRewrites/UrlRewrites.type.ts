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

import { RouteComponentProps, StaticContext } from 'react-router';

import { UrlRewrite } from 'Store/UrlRewrites/UrlRewrites.type';
import { HistoryState } from 'Util/History/History.type';

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
& RouteComponentProps<Record<string, never>, StaticContext, HistoryState>;

export interface UrlRewritesComponentProps {
    type: string;
    props: UrlRewriteProps | Record<string, never>;
}

export type UrlRewritesContainerPropsKeys = 'type'
| 'props';

export type UrlRewriteProps = RouteComponentProps<Record<string, never>, StaticContext, HistoryState>
& Partial<UrlRewriteTypeSpecificProps>;

export interface UrlRewriteTypeSpecificProps {
    productSKU: string;
    id: number;
    isOnlyPlaceholder: boolean;
    pageIds: number;
    categoryIds: number;
}

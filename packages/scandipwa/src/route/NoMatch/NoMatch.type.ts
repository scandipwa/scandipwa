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

import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { UrlRewrite } from 'Store/UrlRewrites/UrlRewrites.type';

export interface NoMatchContainerMapStateProps {
    urlRewrite: UrlRewrite;
}

export interface NoMatchContainerMapDispatchProps {
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    changeHeaderState: (state: NavigationState) => void;
    updateNoMatch: (options: boolean) => void;
}

export interface NoMatchContainerProps extends NoMatchContainerMapStateProps,
    NoMatchContainerMapDispatchProps {}

export interface NoMatchComponentState {}

export interface NoMatchContainerState {}

export interface NoMatchComponentProps {
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cleanUpTransition: any; // TODO after transition migrate
}

export type NoMatchContainerPropsKeys = 'updateBreadcrumbs';

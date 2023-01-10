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

import { CmsPageFields, CmsPageQueryOptions } from 'Query/CmsPage.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';

export interface CmsPageContainerMapStateProps {
    isOffline: boolean;
    cmsPage: Partial<CmsPageFields>;
    isLoading: boolean;
}

export interface CmsPageContainerDispatchStateProps {
    updateBreadcrumbs: (breadcrumbs: CmsPageFields) => void;
    setHeaderState: (stateName: NavigationState) => void;
    setBigOfflineNotice: (isBig: boolean) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    toggleBreadcrumbs: (isActive: boolean) => void;
    requestPage: (options: Partial<CmsPageQueryOptions>) => void;
}

export interface CmsPageContainerBaseProps {
    match: Match;
    pageIds: number;
    pageIdentifiers: string;
    isOnlyPlaceholder: boolean;
    isBreadcrumbsActive: boolean;
    changeHeaderState?: (state: NavigationState) => void;
    currentUrl: string;
}

export type CmsPageContainerProps = CmsPageContainerMapStateProps
& CmsPageContainerDispatchStateProps
& CmsPageContainerBaseProps;

export interface CmsPageComponentProps {
    isBreadcrumbsActive: boolean;
    isLoading: boolean;
    cmsPage: Partial<CmsPageFields>;
}

export type CmsPageContainerPropsKeys = 'isBreadcrumbsActive'
| 'isLoading'
| 'cmsPage';

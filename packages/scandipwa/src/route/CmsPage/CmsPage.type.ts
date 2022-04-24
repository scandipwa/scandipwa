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

import { CmsPageFields } from 'Query/CmsPage.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { Location, Match } from 'Type/Router.type';

export interface CmsPageContainerMapStateProps {
    isOffline: boolean;
}

export interface CmsPageContainerDispatchStateProps {
    updateBreadcrumbs: (breadcrumbs: CmsPageFields) => void;
    setHeaderState: (stateName: NavigationState) => void;
    setBigOfflineNotice: (isBig: boolean) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    toggleBreadcrumbs: (isActive: boolean) => void;
}

export type CmsPageContainerProps = CmsPageContainerMapStateProps & CmsPageContainerDispatchStateProps & {
    match: Match;
    location: Location;
    pageIds: number;
    pageIdentifiers: string;
    isOnlyPlaceholder: boolean;
    isBreadcrumbsActive: boolean;
};

export interface CmsPageContainerState {
    page: Partial<CmsPageFields>;
    isLoading: boolean;
    isPageLoaded: boolean;
}

export interface CmsPageComponentProps {
    isBreadcrumbsActive: boolean;
    isLoading: boolean;
    isPageLoaded: boolean;
    page: Partial<CmsPageFields>;
}

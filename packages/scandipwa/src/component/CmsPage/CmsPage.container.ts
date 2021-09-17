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

import { Location } from 'history';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { match as Match, useLocation } from 'react-router';
import { usePersistedQuery } from 'src/hooks/use-persisted-query';

import { CMS_PAGE } from 'Component/Header/Header.config';
import { CmsPageQuery, CmsPageQueryData } from 'Query/CmsPage.query';
import { useBreadcrumbsStore } from 'Store/Breadcrumbs';
import { updateMeta } from 'Store/Meta/Meta.action';
import { useNavigationStore } from 'Store/Navigation';
import { useOfflineStore } from 'Store/Offline';
import { BlockListType } from 'Type/CMS';
import history from 'Util/History';
import { renderHOC } from 'Util/RenderHOC';
import { debounce } from 'Util/Request';
import { RootState } from 'Util/Store/type';
import { getUrlParam, isHomePageUrl } from 'Util/Url';

import { CmsPageComponent, CmsPageProps } from './CmsPage.component';
import { LOADING_TIME } from './CmsPage.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const getRequestQueryParams = ({
    id,
    identifier,
    location,
    match
}: {
    id: number,
    identifier: string,
    location: Location,
    match: Match
}): { id?: string, identifier?: string } => {
    if (identifier) {
        return { identifier };
    }

    if (id !== -1) {
        return { id: `${id}` };
    }

    const urlKey = getUrlParam(match, location);

    return {
        identifier: urlKey
    };
};

/** @namespace Component/CmsPage/Container/cmsPageSelector */
export const cmsPageSelector = (state: RootState) => ({
    isOffline: state.OfflineReducer.isOffline
});

export interface CmsPageExternalProps {
    pageIds?: number
    pageIdentifiers?: string
    isOnlyPlaceholder?: boolean
    isBreadcrumbsActive?: boolean
    match: Match
}

/** @namespace Component/CmsPage/Container/cmsPageLogic */
export const cmsPageLogic = (props: CmsPageExternalProps): CmsPageProps => {
    const {
        pageIds = -1,
        pageIdentifiers = '',
        isOnlyPlaceholder = false,
        isBreadcrumbsActive = true,
        match
    } = props;

    const location = useLocation();
    const { isOffline } = useSelector(cmsPageSelector);
    const dispatch = useDispatch();
    const { changeTopNavigationState } = useNavigationStore();
    const {
        updateBreadcrumbs,
        toggleBreadcrumbs
    } = useBreadcrumbsStore();
    const { setBigOfflineNotice } = useOfflineStore();
    const {
        data,
        isLoading,
        request
    } = usePersistedQuery<CmsPageQueryData>();
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

    const updateMetaAction = (meta: Record<string, string>) => dispatch(updateMeta(meta));

    const setOfflineNoticeSize = () => {
        if (isLoading) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    };

    useEffect(() => {
        if (!data?.cmsPage) {
            return;
        }

        const { cmsPage } = data;

        const {
            content_heading,
            meta_title,
            title,
            meta_description,
            meta_keywords
        } = cmsPage;

        debounce(setOfflineNoticeSize, LOADING_TIME)();

        updateBreadcrumbs(title as string);
        updateMetaAction({
            title: meta_title as string || title as string,
            description: meta_description as string,
            keywords: meta_keywords as string,
            canonical_url: window.location.href
        });

        if (!isHomePageUrl(location.pathname)) {
            changeTopNavigationState({
                name: CMS_PAGE,
                title: content_heading as string,
                onBackClick: () => history.goBack()
            });
        }

        setIsPageLoaded(true);
    }, [data?.cmsPage]);

    const requestPage = useCallback(async () => {
        const params = getRequestQueryParams({
            id: pageIds,
            identifier: pageIdentifiers,
            location,
            match
        });

        if (
            typeof params.id === 'undefined'
            && typeof params.identifier === 'undefined'
        ) {
            return;
        }
        await request(
            CmsPageQuery.getQuery(params)
        );
    }, [pageIds, pageIdentifiers]);

    useEffect(() => {
        toggleBreadcrumbs(isBreadcrumbsActive);

        window.scrollTo(0, 0);

        if (isOffline && isLoading) {
            debounce(setOfflineNoticeSize, LOADING_TIME)();
        }
    }, []);

    useEffect(() => {
        if (!isOnlyPlaceholder) {
            requestPage();
        }
    }, [pageIds, location.pathname, pageIdentifiers, isOnlyPlaceholder]);

    return {
        isBreadcrumbsActive,
        isLoading,
        isPageLoaded,
        page: data?.cmsPage as BlockListType
    };
};

export const CmsPage = renderHOC(CmsPageComponent, cmsPageLogic, 'CmsPageContainer');

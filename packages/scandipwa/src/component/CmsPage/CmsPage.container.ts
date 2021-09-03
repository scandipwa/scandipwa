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

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router';

import { CMS_PAGE } from 'Component/Header/Header.config';
import CmsPageQuery from 'Query/CmsPage.query';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { BlockListType } from 'Type/CMS';
// import { LocationType, MatchType } from 'Type/Common';
import history from 'Util/History';
import { renderHOC } from 'Util/RenderHOC';
import { debounce } from 'Util/Request';
// import DataContainer from 'Util/Request/DataContainer';
import { getUrlParam, isHomePageUrl } from 'Util/Url';

import { CmsPageComponent, CmsPageProps } from './CmsPage.component';
import { LOADING_TIME } from './CmsPage.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const getRequestQueryParams = ({
    id,
    identifier
}: {
    id: number,
    identifier: string
}): { id?: number, identifier?: string } => {
    const location = useLocation();
    const match = useRouteMatch();

    if (identifier) {
        return { identifier };
    }

    if (id !== -1) {
        return { id };
    }

    const urlKey = getUrlParam(match, location);

    return {
        identifier: urlKey
    };
};

/** @namespace Route/CmsPage/Container/mapStateToProps */
export const cmsPageSelector = (state): { isOffline: boolean } => ({
    isOffline: state.OfflineReducer.isOffline
});

export interface CmsPageExternalProps {
    pageIds?: number
    pageIdentifiers?: string
    isOnlyPlaceholder?: boolean
    isBreadcrumbsActive?: boolean
}

export const cmsPageLogic = (props: CmsPageExternalProps): CmsPageProps => {
    const {
        pageIds = -1,
        pageIdentifiers = '',
        isOnlyPlaceholder = false,
        isBreadcrumbsActive = true
    } = props;

    const location = useLocation();
    const { isOffline } = useSelector(cmsPageSelector);
    const dispatch = useDispatch();

    const updateBreadcrumbsAction = (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithCmsPage(breadcrumbs, dispatch)
    );
    const setHeaderStateAction = (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName));
    const setBigOfflineNoticeAction = (isBig) => dispatch(setBigOfflineNotice(isBig));
    const updateMetaAction = (meta) => dispatch(updateMeta(meta));
    const toggleBreadcrumbsAction = (isActive) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update([], dispatch)
        );
        dispatch(toggleBreadcrumbs(isActive));
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
    const [page, setPage] = useState<BlockListType>({});

    const setOfflineNoticeSize = () => {
        if (isLoading) {
            setBigOfflineNoticeAction(true);
        } else {
            setBigOfflineNoticeAction(false);
        }
    };

    const onPageLoad = ({ cmsPage: page }: { cmsPage: BlockListType }) => {
        const {
            content_heading,
            meta_title,
            title,
            meta_description,
            meta_keywords
        } = page;

        debounce(setOfflineNoticeSize, LOADING_TIME)();

        updateBreadcrumbsAction(page);
        updateMetaAction({
            title: meta_title || title,
            description: meta_description,
            keywords: meta_keywords,
            canonical_url: window.location.href
        });

        if (!isHomePageUrl(location.pathname)) {
            setHeaderStateAction({
                name: CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack()
            });
        }

        setPage(page);
        setIsLoading(false);
        setIsPageLoaded(true);
    };

    const requestPage = () => {
        const params = getRequestQueryParams({
            id: pageIds,
            identifier: pageIdentifiers
        });

        if (!params.id && !params.identifier) {
            return;
        }

        setIsLoading(true);

        fetchData(
            [CmsPageQuery.getQuery(params)],
            onPageLoad,
            () => setIsLoading(false)
        );
    };

    useEffect(() => {
        toggleBreadcrumbsAction(isBreadcrumbsActive);

        window.scrollTo(0, 0);

        if (isOffline && isLoading) {
            debounce(setOfflineNoticeSize, LOADING_TIME)();
        }

        if (!isOnlyPlaceholder) {
            requestPage();
        }
    }, []);

    useEffect(() => {
        requestPage();
    }, [pageIds, location.pathname, pageIdentifiers]);

    return {
        isBreadcrumbsActive,
        isLoading,
        isPageLoaded,
        page
    };
};

export default renderHOC(CmsPageComponent, cmsPageLogic);

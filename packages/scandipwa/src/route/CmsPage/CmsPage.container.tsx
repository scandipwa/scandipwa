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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { CmsPageFields, CmsPageQueryOptions } from 'Query/CmsPage.type';
import { updateBreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { updateOfflineStore } from 'Store/Offline/Offline.action';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import { debounce } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { getUrlParam, isHomePageUrl } from 'Util/Url';

import CmsPage from './CmsPage.component';
import { LOADING_TIME } from './CmsPage.config';
import {
    CmsPageComponentProps,
    CmsPageContainerDispatchStateProps,
    CmsPageContainerMapStateProps,
    CmsPageContainerProps,
    CmsPageContainerPropsKeys,
} from './CmsPage.type';

export const NavigationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Navigation/Navigation.dispatcher'
);

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const CmsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cms/Cms.dispatcher'
);

/** @namespace Route/CmsPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CmsPageContainerMapStateProps => ({
    isOffline: state.OfflineReducer.isOffline,
    cmsPage: state.CmsReducer.cmsPage,
    isLoading: state.CmsReducer.isLoading,
});

/** @namespace Route/CmsPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CmsPageContainerDispatchStateProps => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithCmsPage(breadcrumbs),
    ),
    setHeaderState: (stateName) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName),
    ),
    updateOfflineStore: (state) => dispatch(updateOfflineStore(state)),
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
    updateBreadcrumbsStore: (state) => dispatch(updateBreadcrumbsStore(state)),
    requestPage: (options) => {
        CmsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch, options),
        );
    },
});

/** @namespace Route/CmsPage/Container */
export class CmsPageContainer extends PureComponent<CmsPageContainerProps> {
    static defaultProps: Partial<CmsPageContainerProps> = {
        pageIds: -1,
        pageIdentifiers: '',
        isOnlyPlaceholder: false,
        isBreadcrumbsActive: true,
    };

    __construct(): void {
        this.setOfflineNoticeSize = this.setOfflineNoticeSize.bind(this);

        this.updateBreadcrumbs();
    }

    componentDidMount(): void {
        const {
            isOffline,
            isOnlyPlaceholder,
            isLoading,
        } = this.props;

        scrollToTop();

        if (isOffline && isLoading) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        if (!isOnlyPlaceholder && !window.isPrefetchValueUsed) {
            this.requestPage();
        }
    }

    componentDidUpdate(prevProps: CmsPageContainerProps): void {
        const {
            currentUrl,
            pageIdentifiers,
            pageIds,
            cmsPage,
            isLoading,
        } = this.props;

        const {
            currentUrl: prevCurrentUrl,
            pageIdentifiers: prevPageIdentifiers,
            pageIds: prevPageIds,
            cmsPage: prevCmsPage,
        } = prevProps;

        if (
            (currentUrl !== prevCurrentUrl
            || pageIds !== prevPageIds
            || pageIdentifiers !== prevPageIdentifiers)
            && !isLoading
        ) {
            this.requestPage();
        }

        if (JSON.stringify(cmsPage) !== JSON.stringify(prevCmsPage)) {
            this.onPageLoad();
        }
    }

    componentWillUnmount(): void {
        window.isPrefetchValueUsed = false;
    }

    containerProps(): Pick<
    CmsPageComponentProps,
    CmsPageContainerPropsKeys
    > {
        const { isBreadcrumbsActive, isLoading, cmsPage } = this.props;

        return {
            isBreadcrumbsActive,
            isLoading,
            cmsPage,
        };
    }

    updateBreadcrumbs(): void {
        const {
            updateBreadcrumbsStore,
            isBreadcrumbsActive,
        } = this.props;

        updateBreadcrumbsStore({ areBreadcrumbsVisible: isBreadcrumbsActive, breadcrumbs: [] });
    }

    setOfflineNoticeSize(): void {
        const { updateOfflineStore, isLoading } = this.props;

        if (isLoading) {
            updateOfflineStore({ isOffline: true });
        } else {
            updateOfflineStore({ isOffline: false });
        }
    }

    onPageLoad(): void {
        const {
            updateMetaStore,
            setHeaderState,
            updateBreadcrumbs,
        } = this.props;
        const { cmsPage } = this.props;
        const { location: { pathname } } = history;
        const {
            content_heading,
            meta_title,
            title,
            meta_description,
            meta_keywords,
        } = cmsPage;

        debounce(this.setOfflineNoticeSize, LOADING_TIME)();

        updateBreadcrumbs(cmsPage as CmsPageFields);
        updateMetaStore({
            title: meta_title || title,
            description: meta_description,
            keywords: meta_keywords,
            canonical_url: window.location.href,
        });

        if (!isHomePageUrl(pathname)) {
            setHeaderState({
                name: Page.CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack(),
            });
        }
    }

    getRequestQueryParams(): Partial<CmsPageQueryOptions> {
        const {
            match,
            pageIdentifiers: identifier,
            pageIds: id,
        } = this.props;
        const { location } = history;

        if (identifier) {
            return { identifier };
        }

        if (id !== -1) {
            return { id };
        }

        const urlKey = getUrlParam(match, location);

        return {
            identifier: urlKey,
        };
    }

    requestPage(): void {
        const { requestPage } = this.props;
        const params = this.getRequestQueryParams();
        const { id, identifier } = params;

        if (!id && !identifier) {
            return;
        }

        requestPage(params);
    }

    render(): ReactElement {
        return (
                <CmsPage
                  { ...this.containerProps() }
                />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsPageContainer);

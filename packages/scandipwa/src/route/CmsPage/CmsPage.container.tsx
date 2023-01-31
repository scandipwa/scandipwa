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
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import BreadcrumbsDispatcher from 'Store/Breadcrumbs/Breadcrumbs.dispatcher';
import CmsDispatcher from 'Store/Cms/Cms.dispatcher';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import { debounce } from 'Util/Request/Debounce';
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

/** @namespace Route/CmsPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CmsPageContainerMapStateProps => ({
    isOffline: state.OfflineReducer.isOffline,
    cmsPage: state.CmsReducer.cmsPage,
    isLoading: state.CmsReducer.isLoading,
});

/** @namespace Route/CmsPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CmsPageContainerDispatchStateProps => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch),
    setHeaderState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(isActive));
    },
    requestPage: (options) => CmsDispatcher.handleData(dispatch, options),
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

        const { isPrefetchValueUsed } = window;

        scrollToTop();

        if (isOffline && isLoading) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        if (!isOnlyPlaceholder && !isPrefetchValueUsed) {
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

        const { isPrefetchValueUsed } = window;

        if (
            (currentUrl !== prevCurrentUrl
            || pageIds !== prevPageIds
            || pageIdentifiers !== prevPageIdentifiers)
            && !isLoading
        ) {
            this.requestPage();
        }

        if (JSON.stringify(cmsPage) !== JSON.stringify(prevCmsPage) && !isPrefetchValueUsed) {
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
            toggleBreadcrumbs,
            isBreadcrumbsActive,
        } = this.props;

        toggleBreadcrumbs(isBreadcrumbsActive);
    }

    setOfflineNoticeSize(): void {
        const { setBigOfflineNotice, isLoading } = this.props;

        if (isLoading) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    }

    onPageLoad(): void {
        const {
            updateMeta,
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
        updateMeta({
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
        const { id, identifier = '' } = params;
        const {
            actionName: {
                id: pageId = null,
                cmsPage: {
                    identifier: pageIdentifier = null,
                } = {},
            } = {},
        } = window;

        if (!id && !identifier) {
            return;
        }

        // vvv check if cms page was already loaded from action
        if (
            id === pageId
            || identifier.replace(/^\/+/, '') === pageIdentifier
        ) {
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

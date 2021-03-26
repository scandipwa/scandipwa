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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CMS_PAGE } from 'Component/Header/Header.config';
import CmsPageQuery from 'Query/CmsPage.query';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { LocationType, MatchType } from 'Type/Common';
import history from 'Util/History';
import { debounce } from 'Util/Request';
import DataContainer from 'Util/Request/DataContainer';
import { appendWithStoreCode, getUrlParam } from 'Util/Url';

import CmsPage from './CmsPage.component';
import { LOADING_TIME } from './CmsPage.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/CmsPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOffline: state.OfflineReducer.isOffline
});

/** @namespace Route/CmsPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithCmsPage(breadcrumbs, dispatch)
    ),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update([], dispatch)
        );
        dispatch(toggleBreadcrumbs(isActive));
    }
});

/** @namespace Route/CmsPage/Container */
export class CmsPageContainer extends DataContainer {
    static propTypes = {
        match: MatchType.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        setBigOfflineNotice: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        pageIds: PropTypes.number,
        pageIdentifiers: PropTypes.string,
        isOnlyPlaceholder: PropTypes.bool,
        isBreadcrumbsActive: PropTypes.bool
    };

    static defaultProps = {
        pageIds: -1,
        pageIdentifiers: '',
        isOnlyPlaceholder: false,
        isBreadcrumbsActive: true
    };

    state = {
        page: {},
        isLoading: true,
        isPageLoaded: false
    };

    __construct(props) {
        super.__construct(props);

        this.updateBreadcrumbs();
    }

    updateBreadcrumbs() {
        const {
            toggleBreadcrumbs,
            isBreadcrumbsActive
        } = this.props;

        toggleBreadcrumbs(isBreadcrumbsActive);
    }

    componentDidMount() {
        const {
            isOffline,
            isOnlyPlaceholder
        } = this.props;

        window.scrollTo(0, 0);

        const { isLoading } = this.state;

        if (isOffline && isLoading) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        if (!isOnlyPlaceholder) {
            this.requestPage();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            location: { pathname },
            pageIdentifiers,
            pageIds
        } = this.props;

        const {
            location: { pathname: prevPathname },
            pageIdentifiers: prevPageIdentifiers,
            pageIds: prevPageIds
        } = prevProps;

        if (
            pathname !== prevPathname
            || pageIds !== prevPageIds
            || pageIdentifiers !== prevPageIdentifiers
        ) {
            this.requestPage();
        }
    }

    setOfflineNoticeSize = () => {
        const { setBigOfflineNotice } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    };

    onPageLoad = ({ cmsPage: page }) => {
        const {
            location: { pathname },
            updateMeta,
            setHeaderState,
            updateBreadcrumbs
        } = this.props;

        const {
            content_heading,
            meta_title,
            title,
            meta_description,
            meta_keywords
        } = page;

        debounce(this.setOfflineNoticeSize, LOADING_TIME)();

        updateBreadcrumbs(page);
        updateMeta({
            title: meta_title || title,
            description: meta_description,
            keywords: meta_keywords,
            canonical_url: window.location.href
        });

        if (
            pathname !== appendWithStoreCode('/')
            && pathname !== '/'
        ) {
            setHeaderState({
                name: CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack()
            });
        }

        this.setState({ page, isLoading: false, isPageLoaded: true });
    };

    getRequestQueryParams() {
        const {
            location,
            match,
            pageIdentifiers: identifier,
            pageIds: id
        } = this.props;

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
    }

    requestPage() {
        const params = this.getRequestQueryParams();
        const { id, identifier } = params;

        if (!id && !identifier) {
            return;
        }

        this.setState({ isLoading: true });

        this.fetchData(
            [CmsPageQuery.getQuery(params)],
            this.onPageLoad,
            () => this.setState({ isLoading: false })
        );
    }

    render() {
        return (
            <CmsPage
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsPageContainer);

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

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleBreadcrumbs, BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { changeNavigationState } from 'Store/Navigation';
import DataContainer from 'Util/Request/DataContainer';
import { LocationType, MatchType } from 'Type/Common';
import { setBigOfflineNotice } from 'Store/Offline';
import { CmsPageQuery } from 'Query';
import { CMS_PAGE } from 'Component/Header';
import { debounce } from 'Util/Request';
import { updateMeta } from 'Store/Meta';
import { getUrlParam } from 'Util/Url';
import { history } from 'Route';

import CmsPage from './CmsPage.component';

export const mapStateToProps = state => ({
    isOffline: state.OfflineReducer.isOffline
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch),
    setHeaderState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    setBigOfflineNotice: isBig => dispatch(setBigOfflineNotice(isBig)),
    updateMeta: meta => dispatch(updateMeta(meta)),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(isActive));
    }
});

export const LOADING_TIME = 300;

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
        isLoading: true
    };

    constructor(props) {
        super(props);

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

        const { content_heading, meta_title, title } = page;

        debounce(this.setOfflineNoticeSize, LOADING_TIME)();

        updateBreadcrumbs(page);
        updateMeta({ title: meta_title || title });

        if (pathname !== '/') {
            setHeaderState({
                name: CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack()
            });
        }

        this.setState({ page, isLoading: false });
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
            this.onPageLoad
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

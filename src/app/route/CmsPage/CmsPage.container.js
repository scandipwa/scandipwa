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
import { CmsPageQuery } from 'Query';
import { CMS_PAGE } from 'Component/Header';
import { getUrlParam } from 'Util/Url';
import { history } from 'Route';

import CmsPage from './CmsPage.component';

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch),
    setHeaderState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(isActive));
    }
});

export class CmsPageContainer extends DataContainer {
    static propTypes = {
        match: MatchType.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        urlKey: PropTypes.string,
        isOnlyPlaceholder: PropTypes.bool,
        isBreadcrumbsActive: PropTypes.bool
    };

    static defaultProps = {
        urlKey: '',
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
            location,
            match,
            urlKey,
            isOnlyPlaceholder
        } = this.props;

        const urlParam = getUrlParam(match, location);

        // this.setState({ page: {} });

        if (
            !isOnlyPlaceholder
            && (urlKey || urlParam)
        ) {
            this.requestPage(urlKey || urlParam);
        }
    }

    onPageLoad = ({ cmsPage: page }) => {
        const {
            location: { pathname },
            setHeaderState,
            updateBreadcrumbs
        } = this.props;

        const { content_heading } = page;

        updateBreadcrumbs(page);

        if (pathname !== '/') {
            setHeaderState({
                name: CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack()
            });
        }

        this.setState({ page, isLoading: false });
    };

    requestPage(id) {
        this.setState({ isLoading: true });

        this.fetchData(
            [CmsPageQuery.getQuery({ id })],
            this.onPageLoad
        );
    }

    componentDidUpdate(prevProps) {
        const {
            location: { pathname },
            location,
            urlKey,
            match
        } = this.props;

        const {
            location: { pathname: prevPathname },
            urlKey: prevUrlKey
        } = prevProps;

        if (pathname !== prevPathname || urlKey !== prevUrlKey) {
            const urlParam = getUrlParam(match, location);
            this.requestPage(urlKey || urlParam);
        }
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

export default connect(null, mapDispatchToProps)(CmsPageContainer);

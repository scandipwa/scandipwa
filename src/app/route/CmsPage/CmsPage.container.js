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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { history } from 'Route';
import { getUrlParam } from 'Util/Url';
import { BlockListType } from 'Type/CMS';
import { CMS_PAGE } from 'Component/Header';
import { changeHeaderState } from 'Store/Header';
import { LocationType, MatchType } from 'Type/Common';
import { CmsPageDispatcher, updateCmsPage } from 'Store/CmsPage';
import { toggleBreadcrumbs, BreadcrumbsDispatcher } from 'Store/Breadcrumbs';

import CmsPage from './CmsPage.component';

export const mapStateToProps = state => ({
    page: state.CmsPageReducer.page,
    isLoading: state.CmsPageReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    requestPage: options => CmsPageDispatcher.handleData(dispatch, options),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName)),
    updateCmsPage: (...[cmsPage, isLoading]) => dispatch(updateCmsPage(cmsPage, isLoading)),
    toggleBreadcrumbs: (isActive) => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(isActive));
    }
});

export class CmsPageContainer extends PureComponent {
    static propTypes = {
        requestPage: PropTypes.func.isRequired,
        match: MatchType.isRequired,
        page: BlockListType.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        updateCmsPage: PropTypes.func.isRequired,
        urlKey: PropTypes.string,
        isOnlyPlaceholder: PropTypes.bool,
        isBreadcrumbsActive: PropTypes.bool
    };

    static defaultProps = {
        urlKey: '',
        isOnlyPlaceholder: false,
        isBreadcrumbsActive: true
    };

    componentDidMount() {
        const {
            requestPage,
            location,
            match,
            toggleBreadcrumbs,
            urlKey,
            isOnlyPlaceholder,
            isBreadcrumbsActive,
            updateCmsPage
        } = this.props;

        const urlParam = getUrlParam(match, location);

        updateCmsPage({}, true);

        if (
            !isOnlyPlaceholder
            && (urlKey || urlParam)
        ) {
            requestPage({ id: urlKey || urlParam });
        }

        toggleBreadcrumbs(isBreadcrumbsActive);
    }

    componentDidUpdate(prevProps) {
        const {
            page: { content_heading },
            location: { pathname },
            updateBreadcrumbs,
            setHeaderState,
            requestPage,
            location,
            urlKey,
            match,
            page
        } = this.props;

        const {
            location: { pathname: prevPathname },
            urlKey: prevUrlKey
        } = prevProps;

        updateBreadcrumbs(page);

        if (pathname !== '/') {
            setHeaderState({
                name: CMS_PAGE,
                title: content_heading,
                onBackClick: () => history.goBack()
            });
        }

        if (pathname !== prevPathname || urlKey !== prevUrlKey) {
            const urlParam = getUrlParam(match, location);
            requestPage({ id: urlKey || urlParam });
        }
    }

    render() {
        return (
            <CmsPage
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsPageContainer);

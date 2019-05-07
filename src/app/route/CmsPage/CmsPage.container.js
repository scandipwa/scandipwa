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
import { CmsPageDispatcher, updateCmsPage } from 'Store/CmsPage';
import { toggleBreadcrumbs, BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CmsPage from './CmsPage.component';

const mapStateToProps = state => ({
    page: state.CmsPageReducer.page,
    isLoading: state.CmsPageReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestPage: (options) => {
        CmsPageDispatcher.handleData(dispatch, options);
    },

    updateCmsPage: (options) => {
        dispatch(updateCmsPage(options));
    },

    enableBreadcrumbs: () => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(true));
    },

    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch);
    }
});

const CmsPageContainer = connect(mapStateToProps, mapDispatchToProps)(CmsPage);

export default CmsPageContainer;

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
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import { toggleBreadcrumbs, BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import HomePage from './HomePage.component';

const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

const mapDispatchToProps = dispatch => ({
    requestBlocks: (options) => {
        CmsBlocksAndSliderDispatcher.handleData(dispatch, options);
    },
    disableBreadcrumbs: () => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(false));
    }
});

const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePageContainer;

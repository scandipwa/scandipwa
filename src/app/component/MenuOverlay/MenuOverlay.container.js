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
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import { hideActiveOverlay } from 'Store/Overlay';
import MenuOverlay from './MenuOverlay.component';

export const mapStateToProps = state => ({
    menu: state.HeaderAndFooterReducer.menu,
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState()),
    changeHeaderState: state => dispatch(changeHeaderState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuOverlay);

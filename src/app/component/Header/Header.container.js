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
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import HeaderComponent from './Header.component';

const mapStateToProps = state => ({
    headerState: state.HeaderReducer.headerState,
    cartTotals: state.CartReducer.cartTotals
});

const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

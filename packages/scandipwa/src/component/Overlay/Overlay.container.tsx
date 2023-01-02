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

import { connect } from 'react-redux';

import { RootState } from 'Util/Store/Store.type';

import OverlayComponent from './Overlay.component';
import { OverlayContainerMapDispatchProps, OverlayContainerMapStateProps } from './Overlay.type';

/** @namespace Component/Overlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): OverlayContainerMapStateProps => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/Overlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (): OverlayContainerMapDispatchProps => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverlayComponent);

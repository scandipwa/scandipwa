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

import OverlayComponent from './Overlay.component';

/** @namespace Component/Overlay/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/Overlay/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/always-both-mappings
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(OverlayComponent);

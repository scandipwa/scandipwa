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

import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';

import PopupSuspense from './PopupSuspense.component';

/** @namespace Component/PopupSuspense/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/PopupSuspense/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupSuspense);

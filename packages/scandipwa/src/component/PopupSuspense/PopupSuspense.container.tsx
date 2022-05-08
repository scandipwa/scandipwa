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
import { Dispatch } from 'redux';

import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';

import PopupSuspense from './PopupSuspense.component';
import { PopupSuspenseMapDispatchToProps, PopupSuspenseMapStateToProps } from './PopupSuspense.type';

/** @namespace Component/PopupSuspense/Container/mapStateToProps */
export const mapStateToProps = (): PopupSuspenseMapStateToProps => ({});

/** @namespace Component/PopupSuspense/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): PopupSuspenseMapDispatchToProps => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupSuspense);

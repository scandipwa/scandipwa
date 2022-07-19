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

import VideoPopup from './VideoPopup.component';
import { VIDEO_POPUP_ID } from './VideoPopup.config';

/** @namespace Component/VideoPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    payload: state.PopupReducer.popupPayload[VIDEO_POPUP_ID] || {}
});

/** @namespace Component/VideoPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPopup);

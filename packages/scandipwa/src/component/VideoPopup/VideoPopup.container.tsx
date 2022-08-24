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

import VideoPopup from './VideoPopup.component';
import { VIDEO_POPUP_ID } from './VideoPopup.config';
import {
    VideoPopupContainerMapDispatchProps,
    VideoPopupContainerMapStateProps,
    VideoPopupPayload
} from './VideoPopup.type';

/** @namespace Component/VideoPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): VideoPopupContainerMapStateProps => ({
    payload: (state.PopupReducer.popupPayload as {
        [VIDEO_POPUP_ID]: VideoPopupPayload;
    })[VIDEO_POPUP_ID] || {}
});

/** @namespace Component/VideoPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (): VideoPopupContainerMapDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPopup);

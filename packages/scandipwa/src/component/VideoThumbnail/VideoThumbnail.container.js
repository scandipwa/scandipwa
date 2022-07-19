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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { VIDEO_POPUP_ID } from 'Component/VideoPopup/VideoPopup.config';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { MediaItemType } from 'Type/ProductList.type';

import VideoThumbnail from './VideoThumbnail.component';

/** @namespace Component/VideoThumbnail/Container/mapStateToProps
 */
export const mapStateToProps = () => ({});

/** @namespace Component/VideoThumbnail/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(VIDEO_POPUP_ID, payload)),
    hideActivePopup: () => dispatch(hideActivePopup())
});

/**
 * @class VideoThumbnailContainer
 * @namespace Component/VideoThumbnail/Container */
export class VideoThumbnailContainer extends PureComponent {
    static propTypes = {
        media: MediaItemType.isRequired,
        showPopup: PropTypes.func.isRequired,
        isVideoZoomed: PropTypes.bool.isRequired,
        hideActivePopup: PropTypes.func.isRequired,
        onZoomedVideoClick: PropTypes.func.isRequired
    };

    containerFunctions = {
        onPlayClick: this.onPlayClick.bind(this)
    };

    /**
     * Handles events that occur when the user clicks or taps on a video thumbnail.
     * Displays a popup with the corresponding video.
     * @param event
     * @private
     */
    onPlayClick(event) {
        const {
            media,
            media: {
                video_content: {
                    video_title
                } = {}
            } = {},
            showPopup,
            isVideoZoomed,
            onZoomedVideoClick
        } = this.props;

        event.preventDefault();

        if (isVideoZoomed) {
            onZoomedVideoClick();
        }

        setTimeout(() => {
            showPopup({
                media,
                title: video_title
            });
        }, 0);
    }

    render() {
        const { media } = this.props;

        return (
            <VideoThumbnail
              media={ media }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoThumbnailContainer);

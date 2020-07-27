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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { VIDEO_POPUP_ID } from 'Component/VideoPopup/VideoPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { MediaItemType } from 'Type/ProductList';

import VideoThumbnail from './VideoThumbnail.component';

export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(VIDEO_POPUP_ID, payload))
});

/**
 * @class VideoThumbnailContainer
 */
export class VideoThumbnailContainer extends PureComponent {
    static propTypes = {
        media: MediaItemType.isRequired,
        showPopup: PropTypes.func.isRequired
    };

    containerFunctions = {
        onPlayClick: this._onPlayClick.bind(this)
    };

    /**
     * Handles events that occur when the user clicks or taps on a video thumbnail.
     * Displays a popup with the corresponding video.
     * @param event
     * @private
     */
    _onPlayClick(event) {
        const {
            media,
            media: {
                video_content: {
                    video_title
                } = {}
            } = {}, showPopup
        } = this.props;

        event.preventDefault();
        showPopup({
            media,
            title: video_title
        });
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

export default connect(null, mapDispatchToProps)(VideoThumbnailContainer);

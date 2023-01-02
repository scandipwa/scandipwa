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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { VIDEO_POPUP_ID } from 'Component/VideoPopup/VideoPopup.config';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';

import VideoThumbnail from './VideoThumbnail.component';
import {
    VideoThumbnailContainerFunctions,
    VideoThumbnailContainerMapDispatchProps,
    VideoThumbnailContainerMapStateProps,
    VideoThumbnailContainerProps,
    VideoThumbnailContainerState,
} from './VideoThumbnail.type';

/** @namespace Component/VideoThumbnail/Container/mapStateToProps
 */
export const mapStateToProps = (): VideoThumbnailContainerMapStateProps => ({});

/** @namespace Component/VideoThumbnail/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): VideoThumbnailContainerMapDispatchProps => ({
    showPopup: (payload) => dispatch(showPopup(VIDEO_POPUP_ID, payload)),
    hideActivePopup: () => dispatch(hideActivePopup()),
});

/**
 * @class VideoThumbnailContainer
 * @namespace Component/VideoThumbnail/Container */
export class VideoThumbnailContainer<
P extends Readonly<VideoThumbnailContainerProps> = Readonly<VideoThumbnailContainerProps>,
S extends VideoThumbnailContainerState = VideoThumbnailContainerState,
> extends PureComponent<P, S> {
    containerFunctions: VideoThumbnailContainerFunctions = {
        onPlayClick: this.onPlayClick.bind(this),
    };

    /**
     * Handles events that occur when the user clicks or taps on a video thumbnail.
     * Displays a popup with the corresponding video.
     * @param event
     * @private
     */
    onPlayClick(event: MouseEvent): void {
        const {
            media,
            media: {
                video_content: {
                    video_title = '',
                } = {},
            } = {},
            showPopup,
            isVideoZoomed,
            onZoomedVideoClick,
        } = this.props;

        event.preventDefault();

        if (isVideoZoomed) {
            onZoomedVideoClick(false);
        }

        setTimeout(() => {
            showPopup({
                media,
                title: video_title,
            });
        }, 0);
    }

    render(): ReactElement {
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

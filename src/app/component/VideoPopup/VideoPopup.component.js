/* eslint-disable react/no-unused-state */

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

import { PureComponent } from 'react';
import Vimeo from 'react-vimeo';
import YouTube from 'react-youtube';
import './VideoPopup.style';
import Popup from 'Component/Popup';
import { MediaItemType } from 'Type/ProductList';

export const VIDEO_POPUP_ID = 'VIDEO_POPUP_ID';

/**
 * An expression that checks for vimeo URLs described in https://developer.vimeo.com/api/oembed/videos#table-1 and matches the video id
 * @type {RegExp}
 */
const VIMEO_FORMAT = new RegExp('(?:https?//)?vimeo.com[\\w/]*/(\\d+)$');

const YOUTUBE_FORMAT = new RegExp('(?:https?//)?www.youtube.com/watch\\?v=(\\w+)');

/**
 * VideoThumbnail player component
 * @class VideoPopup
 */
export default class VideoPopup extends PureComponent {
    static propTypes = {
        payload: MediaItemType.isRequired
    };

    _renderVimeoVideo(videoId) {
        return (
            <Vimeo
              videoId={ videoId }
              autoplay
            />
        );
    }

    _renderYoutubeVideo(videoId) {
        return (
            <YouTube
              videoId={ videoId }
              containerClassName="VideoPopup-YouTubeContainer"
              // eslint-disable-next-line react/forbid-component-props
              className="VideoPopup-YouTube"
              opts={ { playerVars: { autoplay: 1 } } }
            />
        );
    }

    _renderVideoContent() {
        const {
            payload: {
                media: {
                    video_content: { video_url } = {}
                } = {}
            }
        } = this.props;

        if (!video_url) return null;

        console.log(this.props);


        const [, vimeoId] = VIMEO_FORMAT.exec(video_url) || [];
        if (vimeoId) return this._renderVimeoVideo(vimeoId);

        const [, youtubeId] = YOUTUBE_FORMAT.exec(video_url);
        if (youtubeId) return this._renderYoutubeVideo(youtubeId);

        return null;
    }

    render() {
        return (
            <Popup id={ VIDEO_POPUP_ID } mix={ { block: 'VideoPopup' } }>
                <div block="VideoPopup" elem="VideoPlayer">
                    <div block="VideoPopup" elem="PlayerContent">
                        { this._renderVideoContent() }
                    </div>
                </div>
            </Popup>
        );
    }
}

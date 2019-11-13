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
 * A popup capable of displaying a video
 * @class VideoPopup
 */
export default class VideoPopup extends PureComponent {
    static propTypes = {
        payload: MediaItemType.isRequired
    };

    componentDidMount() {
        this.loadVimeoLibrary()
            .then(() => this.forceUpdate());

        this.loadYoutubeLibrary()
            .then(() => this.forceUpdate());
    }

    /**
     * Renders a video provided by Vimeo
     * @param videoId
     * @returns {*}
     * @private
     */
    _renderVimeoVideo(videoId) {
        const { vimeoComponent: { default: Vimeo } = {} } = this;

        if (!Vimeo) return null;

        return (
            <Vimeo
              videoId={ videoId }
              autoplay
            />
        );
    }

    /**
     * Renders a video provided by Youtube
     * @param videoId
     * @returns {*}
     * @private
     */
    _renderYoutubeVideo(videoId) {
        const { youtubeComponent: { default: YouTube } = {} } = this;

        if (!YouTube) return null;

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

    async loadVimeoLibrary() {
        this.vimeoComponent = await import('react-vimeo');
    }

    async loadYoutubeLibrary() {
        this.youtubeComponent = await import('react-youtube');
    }

    /**
     * Parses the video URL and renders the video accordingly
     * @returns {null|*}
     * @private
     */
    _renderVideoContent() {
        const {
            payload: {
                media: {
                    video_content: { video_url } = {}
                } = {}
            }
        } = this.props;

        if (!video_url) return null;

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

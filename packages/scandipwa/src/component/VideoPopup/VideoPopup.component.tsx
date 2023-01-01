/* eslint-disable react/no-unused-state */

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

import { PureComponent } from 'react';

import Popup from 'Component/Popup';
import { ReactElement } from 'Type/Common.type';
import { makeCancelable } from 'Util/Promise';
import { CancelablePromise } from 'Util/Promise/Promise.type';

import { VIDEO_POPUP_ID, VIMEO_FORMAT, YOUTUBE_FORMAT } from './VideoPopup.config';
import { VideoPopupComponentProps, VimeoComponent, YouTubeComponent } from './VideoPopup.type';

import './VideoPopup.style';

/**
 * A popup capable of displaying a video
 * @class VideoPopup
 * @namespace Component/VideoPopup/Component
 */
export class VideoPopupComponent<
P extends Readonly<VideoPopupComponentProps> = Readonly<VideoPopupComponentProps>,
S extends VideoPopupComponentState = VideoPopupComponentState,
> extends PureComponent<P, S> {
    vimeoPromise: CancelablePromise<{ default: VimeoComponent }> | null = null;

    youTubePromise: CancelablePromise<{ default: YouTubeComponent }> | null = null;

    vimeoComponent: VimeoComponent | null = null;

    youTubeComponent: YouTubeComponent | null = null;

    componentDidMount(): void {
        this.loadVimeoLibrary();
        this.loadYouTubeLibrary();

        Promise.all([
            this.vimeoPromise,
            this.youTubePromise,
        ]).then(
            /** @namespace Component/VideoPopup/Component/VideoPopupComponent/componentDidMount/all/then */
            () => this.forceUpdate(),
        );
    }

    componentWillUnmount(): void {
        if (this.youTubePromise) {
            this.youTubePromise.cancel();
        }

        if (this.vimeoPromise) {
            this.vimeoPromise.cancel();
        }
    }

    /**
     * Renders a video provided by Vimeo
     * @param videoId
     * @returns {*}
     * @private
     */
    _renderVimeoVideo(videoId: string): ReactElement {
        const Vimeo = this.vimeoComponent;

        if (!Vimeo) {
            return null;
        }

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
    _renderYoutubeVideo(videoId: string): ReactElement {
        const YouTube = this.youTubeComponent;

        if (!YouTube) {
            return null;
        }

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

    loadVimeoLibrary(): void {
        this.vimeoPromise = makeCancelable(import('react-vimeo'));

        this.vimeoPromise.promise.then(
            /** @namespace Component/VideoPopup/Component/VideoPopupComponent/loadVimeoLibrary/then */
            ({ default: vimeo }) => {
                this.vimeoComponent = vimeo;
            },
        );
    }

    loadYouTubeLibrary(): void {
        this.youTubePromise = makeCancelable<{ default: YouTubeComponent }>(import('react-youtube'));

        this.youTubePromise.promise.then(
            /** @namespace Component/VideoPopup/Component/VideoPopupComponent/loadYouTubeLibrary/then */
            ({ default: youTube }) => {
                this.youTubeComponent = youTube;
            },
        );
    }

    /**
     * Parses the video URL and renders the video accordingly
     * @returns {null|*}
     * @private
     */
    _renderVideoContent(): ReactElement {
        const {
            payload: {
                media: {
                    video_content: { video_url } = {},
                } = {},
            },
        } = this.props;

        if (!video_url) {
            return null;
        }

        const [, vimeoId] = VIMEO_FORMAT.exec(video_url) || [];

        if (vimeoId) {
            return this._renderVimeoVideo(vimeoId);
        }

        const [, youtubeId] = YOUTUBE_FORMAT.exec(video_url) || [];

        if (youtubeId) {
            return this._renderYoutubeVideo(youtubeId);
        }

        return null;
    }

    render(): ReactElement {
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

export default VideoPopupComponent;

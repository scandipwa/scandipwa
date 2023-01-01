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

import Image from 'Component/Image/Image.container';
import { ImageRatio } from 'Component/Image/Image.type';
import { ReactElement } from 'Type/Common.type';

import { VideoThumbnailComponentProps } from './VideoThumbnail.type';

import './VideoThumbnail.style';

/**
 * VideoThumbnail component
 * @class VideoThumbnail
 * @namespace Component/VideoThumbnail/Component */
export class VideoThumbnailComponent<
P extends Readonly<VideoThumbnailComponentProps> = Readonly<VideoThumbnailComponentProps>,
S extends VideoThumbnailComponentState = VideoThumbnailComponentState,
> extends PureComponent<P, S> {
    /**
     * Renders an icon indicating that the video can be played
     */
    renderPlayIcon(): ReactElement {
        return (
            <span block="VideoThumbnail" elem="PlayIcon">
                { __('Play video') }
            </span>
        );
    }

    render(): ReactElement {
        const {
            media: {
                thumbnail: { url },
                video_content: { video_title },
            },
            onPlayClick,
        } = this.props;

        return (
            <div block="VideoThumbnail">
                <button
                  block="VideoThumbnail"
                  elem="Button"
                  onClick={ onPlayClick }
                  title={ __('Play video %s', video_title) }
                >
                    <Image
                      src={ url }
                      ratio={ ImageRatio.IMG_CUSTOM }
                      mix={ {
                          block: 'VideoThumbnail',
                          elem: 'Thumbnail',
                          mods: { isPlaceholder: !url },
                      } }
                      isPlaceholder={ !url }
                      alt={ video_title }
                    />
                    { this.renderPlayIcon() }
                </button>
            </div>
        );
    }
}

export default VideoThumbnailComponent;

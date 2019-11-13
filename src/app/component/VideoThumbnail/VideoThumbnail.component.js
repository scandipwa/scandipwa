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
import PropTypes from 'prop-types';
import { MediaItemType } from 'Type/ProductList';
import './VideoThumbnail.style';
import Image from 'Component/Image/Image.container';

/**
 * VideoThumbnail component
 * @class VideoThumbnail
 */
export default class VideoThumbnail extends PureComponent {
    static propTypes = {
        media: MediaItemType.isRequired,
        onPlayClick: PropTypes.func.isRequired
    };

    /**
     * Renders an icon indicating that the video can be played
     */
    renderPlayIcon() {
        return (
            <div block="VideoThumbnail" elem="IconContainer">
                <span block="VideoThumbnail" elem="PlayIcon" />
            </div>
        );
    }

    render() {
        const {
            media: {
                thumbnail: { url },
                video_content: { video_title }
            },
            onPlayClick
        } = this.props;

        return (
            <button block="VideoThumbnail" elem="PlayButton" onClick={ onPlayClick }>
                <Image
                  src={ url }
                  ratio="16x9"
                  mix={ {
                      block: 'Video',
                      elem: 'Thumbnail',
                      mods: { isPlaceholder: !url }
                  } }
                  isPlaceholder={ !url }
                  alt={ video_title }
                />
                { this.renderPlayIcon() }
            </button>
        );
    }
}

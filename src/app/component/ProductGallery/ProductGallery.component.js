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
import { TransformWrapper } from 'react-zoom-pan-pinch';
import ProductGalleryAdditionalMedia from 'Component/ProductGalleryAdditionalMedia';
import ProductGalleryImage from 'Component/ProductGalleryImage';
import VideoThumbnail from 'Component/VideoThumbnail';
import VideoPopup from 'Component/VideoPopup';
import Slider from 'Component/Slider';
import Image from 'Component/Image';
import './ProductGallery.style';

export const GALLERY_LENGTH_BEFORE_COLLAPSE = 4;
export const MAX_ZOOM_SCALE = 8;

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'external-video';
export const PLACEHOLDER_TYPE = 'placeholder';

/**
 * Product gallery
 * @class ProductGallery
 */
export default class ProductGallery extends PureComponent {
    static propTypes = {
        gallery: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]),
                image: PropTypes.string,
                isPlaceholder: PropTypes.bool,
                alt: PropTypes.string,
                type: PropTypes.string
            })
        ).isRequired
    };

    maxScale = MAX_ZOOM_SCALE;

    state = {
        activeImage: 0,
        isZoomEnabled: false
    };

    constructor(props, context) {
        super(props, context);
        this.renderSlide = this.renderSlide.bind(this);
    }

    onActiveImageChange = (activeImage) => {
        this.setState({
            activeImage,
            isZoomEnabled: false
        });
    };

    renderAdditionalPicture = (media, index = 0) => (
        <ProductGalleryAdditionalMedia
          key={ index }
          media={ media }
          index={ index }
          onActiveImageChange={ this.onActiveImageChange }
        />
    );

    handleZoomStart = () => {
        const { isZoomEnabled } = this.state;
        if (isZoomEnabled) return;

        document.body.classList.add('overscrollPrevented');
        this.setState({ isZoomEnabled: true });
    };

    disableZoom = () => {
        document.body.classList.remove('overscrollPrevented');
        this.setState({ isZoomEnabled: false });
    };

    handleZoomChange = (args) => {
        if (args.scale > 1) {
            this.handleZoomStart();
        }
    };

    /**
     * Renders a video thumbnail which opens popup player on click/tap
     * @param media
     * @param index
     * @returns {*}
     * @private
     */
    renderVideo(media, index) {
        return (
            <VideoThumbnail
              key={ index }
              media={ media }
            />
        );
    }

    renderPlaceholder(index) {
        return (
            <Image
              key={ index }
              ratio="custom"
              mix={ {
                  block: 'ProductGallery',
                  elem: 'SliderImage',
                  mods: { isPlaceholder: true }
              } }
              isPlaceholder
            />
        );
    }

    /**
     * Renders a product image to be displayed in the gallery
     * @param mediaData
     * @param index
     * @returns {*}
     * @private
     */
    renderImage(mediaData, index) {
        const { isZoomEnabled } = this.state;

        return (
            <TransformWrapper
              key={ index }
              onZoomChange={ this.handleZoomChange }
              pan={ {
                  disabled: !isZoomEnabled,
                  limitToWrapperBounds: true,
                  velocity: false
              } }
              options={ {
                  limitToBounds: true,
                  minScale: 1
              } }
            >
                { ({ scale, previousScale, resetTransform }) => {
                    if (scale === 1 && previousScale !== 1) {
                        resetTransform();
                    }

                    return (
                        <ProductGalleryImage
                          index={ index }
                          mediaData={ mediaData }
                          scale={ scale }
                          previousScale={ previousScale }
                          disableZoom={ this.disableZoom }
                          isZoomEnabled={ isZoomEnabled }
                        />
                    );
                } }
            </TransformWrapper>
        );
    }

    /**
     * Checks for the type of the slide and renders it accordingly
     * @param media
     * @param index
     * @returns {null|*}
     */
    renderSlide(media, index) {
        const { media_type } = media;

        switch (media_type) {
        case IMAGE_TYPE:
            return this.renderImage(media, index);
        case VIDEO_TYPE:
            return this.renderVideo(media, index);
        case PLACEHOLDER_TYPE:
            return this.renderPlaceholder(index);
        default:
            return null;
        }
    }

    renderAdditionalPictures() {
        const { gallery } = this.props;

        return (
            <div block="ProductGallery" elem="Additional">
                { gallery.slice(0, GALLERY_LENGTH_BEFORE_COLLAPSE).map(this.renderAdditionalPicture) }
            </div>
        );
    }

    renderGalleryNotice() {
        return (
            <p block="ProductGallery" elem="Notice">
                { __('Scroll over image to zoom in') }
            </p>
        );
    }

    renderSlider() {
        const { gallery } = this.props;
        const { activeImage, isZoomEnabled } = this.state;

        return (
            <div>
                <Slider
                  mix={ { block: 'ProductGallery', elem: 'Slider' } }
                  showCrumbs
                  activeImage={ activeImage }
                  onActiveImageChange={ this.onActiveImageChange }
                  isInteractionDisabled={ isZoomEnabled }
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
                { this.renderGalleryNotice() }
            </div>
        );
    }

    render() {
        return (
            <div block="ProductGallery">
                { this.renderAdditionalPictures() }
                { this.renderSlider() }
                <VideoPopup />
            </div>
        );
    }
}

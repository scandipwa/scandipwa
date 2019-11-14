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

import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'Component/Slider';
import Image from 'Component/Image';
import './ProductGallery.style';
import ProductGalleryAdditionalMedia from 'Component/ProductGalleryAdditionalMedia';
import VideoThumbnail from 'Component/VideoThumbnail';
import VideoPopup from 'Component/VideoPopup';
import media, { PRODUCT_MEDIA } from 'Util/Media/Media';

export const GALLERY_LENGTH_BEFORE_COLLAPSE = 4;

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

    state = { activeImage: 0 };

    constructor(props, context) {
        super(props, context);
        this.renderSlide = this.renderSlide.bind(this);
    }

    onActiveImageChange = (activeImage) => {
        this.setState({ activeImage });
    };

    renderAdditionalPicture = (media, index = 0) => (
        <ProductGalleryAdditionalMedia
          key={ index }
          media={ media }
          index={ index }
          onActiveImageChange={ this.onActiveImageChange }
        />
    );

    /**
     * Renders a video thumbnail which opens popup player on click/tap
     * @param media
     * @param index
     * @returns {*}
     * @private
     */
    _renderVideoItem(media, index) {
        return (
            <VideoThumbnail
              key={ index }
              media={ media }
            />
        );
    }

    _renderPlaceholderItem(index) {
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
    _renderImageItem(mediaData, index) {
        const { label, file } = mediaData;
        const alt = label || __('%s - Picture #%s', name, index);
        const src = media(file, PRODUCT_MEDIA);

        return (
            <Fragment key={ index }>
                <Image
                  src={ src }
                  ratio="custom"
                  mix={ {
                      block: 'ProductGallery',
                      elem: 'SliderImage',
                      mods: { isPlaceholder: !src }
                  } }
                  isPlaceholder={ !src }
                  alt={ alt }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ alt }
                  src={ src }
                  itemProp="image"
                />
            </Fragment>
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
            return this._renderImageItem(media, index);
        case VIDEO_TYPE:
            return this._renderVideoItem(media, index);
        case PLACEHOLDER_TYPE:
            return this._renderPlaceholderItem(index);
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

    render() {
        const { gallery } = this.props;
        const { activeImage } = this.state;
        return (
            <div block="ProductGallery">
                { this.renderAdditionalPictures() }
                <Slider
                  mix={ { block: 'ProductGallery', elem: 'Slider' } }
                  showCrumbs
                  activeImage={ activeImage }
                  onActiveImageChange={ this.onActiveImageChange }
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
                <VideoPopup />
            </div>
        );
    }
}

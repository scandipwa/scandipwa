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
import ProductGalleryImage from 'Component/ProductGalleryImage';
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

    renderAdditionalPicture = this.renderAdditionalPicture.bind(this);

    onActiveImageChange = this.onActiveImageChange.bind(this);

    onActiveImageChange(activeImage) {
        this.setState({ activeImage });
    }

    _renderImageItem(mediaData, index) {
        const {
            label,
            file
        } = mediaData;

        const alt = label || __('%s - Picture #%s', name, index);
        const src = media(`${ PRODUCT_MEDIA }${ file }`);

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

    _renderVideoItem(media, index) {
        return <VideoThumbnail key={ index } media={ media } />;
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

    renderAdditionalPictures() {
        const { gallery } = this.props;
        const galleryLength = gallery.length;

        return galleryLength < GALLERY_LENGTH_BEFORE_COLLAPSE
            ? this.renderAdditionalPicture({ ...gallery[galleryLength - 1], type: 'single' })
            : gallery.slice(0, GALLERY_LENGTH_BEFORE_COLLAPSE).map(this.renderAdditionalPicture);
    }

    renderAdditionalPicture(media, index = 0) {
        return (
            <ProductGalleryImage
              key={ index }
              media={ media }
              index={ index }
              onActiveImageChange={ this.onActiveImageChange }
            />
        );
    }

    renderSlide(media, index) {
        console.log(media);
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

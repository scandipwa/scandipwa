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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaType } from 'Type/ProductList';
import Slider from 'Component/Slider';
import Image from 'Component/Image';
import './ProductGallery.style';

const PRODUCT_IMAGE_PATH = '/media/catalog/product';
const THUMBNAIL_KEY = 'thumbnail';

/**
 * Product gallery
 * @class ProductGallery
 */
class ProductGallery extends Component {
    constructor(props) {
        super(props);
        this.state = { activeImage: 0 };

        this.renderAdditionalPicture = this.renderAdditionalPicture.bind(this);
        this.changeActiveImage = this.changeActiveImage.bind(this);
    }

    getGalleryPictures() {
        const {
            mediaGallery,
            thumbnail: { path },
            thumbnail
        } = this.props;

        // use images from gallery or fallback to thumbnail
        return mediaGallery.length
            ? (
                mediaGallery.map((media, index) => ({
                    id: index ? media.id : THUMBNAIL_KEY,
                    image: `${PRODUCT_IMAGE_PATH}${media.file}`
                }))
            )
            : [{
                image: thumbnail && path && `${PRODUCT_IMAGE_PATH}${path}`,
                id: THUMBNAIL_KEY
            }, ...Array(3).fill({})];
    }

    changeActiveImage(activeImage) {
        this.setState({ activeImage });
    }

    renderAdditionalPicture({ image, type }, index = 0) {
        return (
            <button
              block="ProductGallery"
              elem="Image"
              key={ index }
              mods={ { type } }
              onClick={ () => this.changeActiveImage(index) }
            >
                <Image
                  // eslint-disable-next-line react/no-array-index-key
                  key={ index }
                  src={ image }
                  ratio="custom"
                  objectFit="cover"
                  mix={ { block: 'ProductGallery', elem: 'Image' } }
                />
            </button>
        );
    }

    renderAdditionalPictures(gallery) {
        const galleryLength = gallery.length;

        return galleryLength < 4
            ? this.renderAdditionalPicture({ ...gallery[galleryLength - 1], type: 'single' })
            : gallery.slice(0, 4).map(this.renderAdditionalPicture);
    }

    render() {
        const gallery = this.getGalleryPictures();
        const { activeImage } = this.state;
        return (
            <div block="ProductGallery">
                { this.renderAdditionalPictures(gallery) }
                <Slider
                  mix={ { block: 'ProductGallery', elem: 'Slider' } }
                  showCrumbs
                  activeImage={ activeImage }
                  changeParentActiveImage={ this.changeActiveImage }
                >
                    { gallery.map(({ image, id }, index) => (
                        <>
                            <Image
                              src={ image }
                              key={ id || index }
                              ratio="custom"
                              mix={ { block: 'ProductGallery', elem: 'SliderImage' } }
                            />
                            <img
                              style={ { display: 'none' } }
                              alt={ name }
                              src={ image }
                              itemProp="image"
                            />
                        </>
                    )) }
                </Slider>
            </div>
        );
    }
}

ProductGallery.propTypes = {
    mediaGallery: MediaType,
    thumbnail: PropTypes.shape({ path: PropTypes.string })
};

ProductGallery.defaultProps = {
    mediaGallery: [],
    thumbnail: {}
};

export default ProductGallery;

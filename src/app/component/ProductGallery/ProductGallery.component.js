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
            }];

    }

    render() {
        const gallery = this.getGalleryPictures();

        return (
            <Slider
              mix={ { block: 'ProductGallery' } }
              showCrumbs
            >
                { gallery.map(({ image, id }) => (
                    <Image
                      src={ image }
                      key={ id }
                    />
                )) }
            </Slider>
        );
    }
}

ProductGallery.propTypes = {
    mediaGallery: MediaType,
    thumbnail: PropTypes.shape({ path: PropTypes.string }),
};

ProductGallery.defaultProps = {
    mediaGallery: [],
    thumbnail: {}
};

export default ProductGallery;

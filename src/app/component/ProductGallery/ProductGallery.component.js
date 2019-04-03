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
import './ProductGallery.style';

const PRODUCT_IMAGE_PATH = 'catalog/product';

/**
 * Product gallery
 * @class ProductGallery
 */
class ProductGallery extends Component {
    render() {
        const {
            mediaGallery,
            thumbnail: { url },
            thumbnail,
            areDetailsLoaded
        } = this.props;

        // use images from gallery or fallback to thumbnail
        const gallery = mediaGallery.length
            ? mediaGallery.map(media => ({ id: media.id, image: `/media/jpg/${PRODUCT_IMAGE_PATH}${media.file}` }))
            : [{ image: thumbnail && url, id: 'thumbnail' }];

        return (
            <Slider
              block="ProductGallery"
              items={ gallery }
              areArrowButtonsShown={ areDetailsLoaded }
              arePlaceholdersShown={ !areDetailsLoaded }
              areThumbnailsShown
              isKeyboardAllowed
              slideSpeed={ 600 }
            />
        );
    }
}

ProductGallery.propTypes = {
    mediaGallery: MediaType,
    thumbnail: PropTypes.shape({ url: PropTypes.string }),
    areDetailsLoaded: PropTypes.bool.isRequired
};

ProductGallery.defaultProps = {
    mediaGallery: [],
    thumbnail: {}
};

export default ProductGallery;

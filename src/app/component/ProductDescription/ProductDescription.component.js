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
import Html from 'Component/Html';
import Image from 'Component/Image';
import TextPlaceholder from 'Component/TextPlaceholder';
import ContentWrapper from 'Component/ContentWrapper';
import { ProductType, MediaType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import './ProductDescription.style';

const PRODUCT_IMAGE_PATH = '/media/jpg/catalog/product';

/**
 * Product description
 * @class ProductDescription
 */
class ProductDescription extends Component {
    render() {
        const {
            product: { description },
            mediaGallery,
            areDetailsLoaded
        } = this.props;

        const { html } = { ...description };
        const image = areDetailsLoaded && mediaGallery.length > 0
            ? `${PRODUCT_IMAGE_PATH}${mediaGallery[0].file}`
            : '';

        if (!html && areDetailsLoaded) return null;

        return (
            <ContentWrapper
              mix={ { block: 'ProductDescription' } }
              wrapperMix={ { block: 'ProductDescription', elem: 'Wrapper' } }
              label={ __('Product description') }
            >
                <div block="ProductDescription" elem="Image">
                    { !image && areDetailsLoaded
                        ? null
                        : <Image ratio="4x3" src={ image } alt={ __('Product description image') } />
                    }
                </div>
                <div block="ProductDescription" elem="DescriptionBlock">
                    <h3><TextPlaceholder content={ areDetailsLoaded ? __('About the product') : '' } /></h3>
                    <div block="ProductDescription" elem="Text">
                        { !areDetailsLoaded ? (
                            <p block="ProductDescription" elem="PlaceholderBlock">
                                <TextPlaceholder length="long" />
                                <TextPlaceholder length="medium" />
                                <TextPlaceholder length="medium" />
                                <TextPlaceholder length="long" />
                                <TextPlaceholder length="short" />
                            </p>
                        ) : <Html content={ html } />}
                    </div>
                </div>
            </ContentWrapper>
        );
    }
}

ProductDescription.propTypes = {
    product: ProductType.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired,
    mediaGallery: MediaType
};

ProductDescription.defaultProps = {
    mediaGallery: []
};

export default ProductDescription;

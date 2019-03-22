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
import GroupedProductsItem from 'Component/GroupedProductsItem';
import { ProductType, MediaType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import './GroupedProductsList.style';

const PRODUCT_IMAGE_PATH = '/media/jpg/catalog/product';

/**
 * Product description
 * @class GroupedProduct
 */
class GroupedProduct extends Component {
    renderProductList(items) {
        return items
            .map(item => <GroupedProductsItem product={ item.product } />);
    }

    render() {
        const {
            product: { items }
        } = this.props;
        // const image = areDetailsLoaded && mediaGallery.length > 0
        //     ? `${PRODUCT_IMAGE_PATH}${mediaGallery[0].file}`
        //     : '';

        // if (!description && areDetailsLoaded) return null;

        return (
            <ContentWrapper
              mix={ { block: 'GroupedProduct' } }
              wrapperMix={ { block: 'GroupedProduct', elem: 'Wrapper' } }
              label="Product description"
            >
            <ul>
                { items && this.renderProductList(items)}
            </ul>

                {/* <div block="GroupedProduct" elem="Image">
                    <Image ratio="4x3" src={ image } alt="Description image" />
                </div>
                <div block="GroupedProduct" elem="DescriptionBlock">
                    <h3><TextPlaceholder content={ areDetailsLoaded ? 'About the product' : '' } /></h3>
                    <div block="GroupedProduct" elem="Text">
                        { !areDetailsLoaded ? (
                            <p block="GroupedProduct" elem="PlaceholderBlock">
                                <TextPlaceholder length="long" />
                                <TextPlaceholder length="medium" />
                                <TextPlaceholder length="medium" />
                                <TextPlaceholder length="long" />
                                <TextPlaceholder length="short" />
                            </p>
                        ) : <Html content={ description } />}
                    </div>
                </div> */}
            </ContentWrapper>
        );
    }
}

GroupedProduct.propTypes = {
    product: ProductType.isRequired
};

export default GroupedProduct;

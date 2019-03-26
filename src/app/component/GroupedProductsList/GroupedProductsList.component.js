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
import ContentWrapper from 'Component/ContentWrapper';
import GroupedProductsItem from 'Component/GroupedProductsItem';
import { ProductType } from 'Type/ProductList';
import './GroupedProductsList.style';

/**
 * Product description
 * @class GroupedProduct
 */
class GroupedProduct extends Component {
    renderProductList(items) {
        return (
            <ul>
                { items
                    .map(item => <GroupedProductsItem key={ item.product.id } product={ item.product } />) }
            </ul>
        );
    }

    render() {
        const {
            product: { items }
        } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'GroupedProduct' } }
              wrapperMix={ { block: 'GroupedProduct', elem: 'Wrapper' } }
              label="Product description"
            >
                { items && this.renderProductList(items)}
            </ContentWrapper>
        );
    }
}

GroupedProduct.propTypes = {
    product: ProductType.isRequired
};

export default GroupedProduct;

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
import ProductCard from 'Component/ProductCard';
import TextPlaceholder from 'Component/TextPlaceholder';
import PropTypes from 'prop-types';
import { ItemsType } from 'Type/ProductList';
import './RelatedProducts.style';

/**
 * Related products block
 * @class RelatedProducts
 */
class RelatedProducts extends Component {
    constructor(props) {
        super(props);

        this.clearRelatedProducts();
    }

    componentDidUpdate() {
        this.clearRelatedProducts();
    }

    /**
     * Clears related products store
     * @return {void}
     */
    clearRelatedProducts() {
        const {
            relatedProducts: { items },
            areDetailsLoaded,
            clearRelatedProducts
        } = this.props;

        if (!areDetailsLoaded && typeof items === 'object' && items.length > 0) {
            clearRelatedProducts();
        }
    }

    render() {
        const {
            relatedProducts: { items, total_count },
            product
        } = this.props;

        const productIsLoaded = Object.keys(product).length !== 0;
        const hasRelatedProducts = product.product_links && Object.keys(product.product_links).length > 0;
        const relatedProductsLoaded = typeof items === 'object';

        if (productIsLoaded && (!hasRelatedProducts || (relatedProductsLoaded && total_count === 0))) return null;

        return (
            <ContentWrapper
              mix={ { block: 'RelatedProducts' } }
              wrapperMix={ { block: 'RelatedProducts', elem: 'Wrapper' } }
              label={ __('Related products') }
            >
                <h3 block="RelatedProducts" elem="Title">
                    <TextPlaceholder
                      content={ relatedProductsLoaded ? __('Members Who Bought This Item Also Bought') : '' }
                    />
                </h3>
                <ul block="RelatedProducts" elem="List">
                    {
                        items
                            ? items.map(product => (
                                <ProductCard
                                  mix={ { block: 'RelatedProducts', elem: 'Card' } }
                                  product={ product }
                                  key={ product.id }
                                />
                            ))
                            : Array(4).fill().map((_, i) => (
                                <ProductCard
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={ i }
                                  product={ {} }
                                  mix={ { block: 'RelatedProducts', elem: 'Card' } }
                                />
                            ))
                    }
                </ul>
            </ContentWrapper>
        );
    }
}

RelatedProducts.propTypes = {
    relatedProducts: PropTypes.shape({
        items: ItemsType,
        total_count: PropTypes.number
    }).isRequired,
    product: PropTypes.shape({
        items: ItemsType,
        total_count: PropTypes.number
    }).isRequired,
    clearRelatedProducts: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default RelatedProducts;

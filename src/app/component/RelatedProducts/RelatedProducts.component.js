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

    renderProducts(products) {
        return products.map(product => (
            <ProductCard
              product={ product }
              key={ product.id }
            />
        ));
    }

    renderPlaceholder() {
        return (
            <>
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
            </>
        );
    }

    render() {
        const {
            relatedProducts: {
                items,
                total_count
            },
            product,
            label
        } = this.props;

        const productIsLoaded = Object.keys(product).length !== 0;
        const hasRelatedProducts = product.product_links && Object.keys(product.product_links).length > 0;
        const relatedProductsLoaded = typeof items === 'object';

        if (productIsLoaded && (!hasRelatedProducts || (relatedProductsLoaded && total_count === 0))) return null;

        return (
            <section block="RelatedProducts">
                { label && <h4 block="RelatedProducts" elem="Label">{ label }</h4> }
                <ul block="RelatedProducts" elem="List">
                    { items ? this.renderProducts(items) : this.renderPlaceholder() }
                </ul>
            </section>
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
    areDetailsLoaded: PropTypes.bool.isRequired,
    label: PropTypes.string
};

RelatedProducts.defaultProps = {
    label: ''
};


export default RelatedProducts;

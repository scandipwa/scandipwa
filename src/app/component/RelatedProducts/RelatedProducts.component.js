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

import { PureComponent } from 'react';
import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import PropTypes from 'prop-types';
import { ItemsType } from 'Type/ProductList';
import './RelatedProducts.style';

export const MAX_NUMBER_OF_PRODUCTS_TO_RENDER = 4;

/**
 * Related products block
 * @class RelatedProducts
 */
export default class RelatedProducts extends PureComponent {
    static propTypes = {
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

    static defaultProps = {
        label: ''
    };

    componentDidMount() {
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
        return products.slice(0, MAX_NUMBER_OF_PRODUCTS_TO_RENDER).map(product => (
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
            relatedProducts: { items },
            label,
            areDetailsLoaded
        } = this.props;

        if (!areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              label="Related products"
              mix={ { block: 'RelatedProducts' } }
              wrapperMix={ { block: 'RelatedProducts', elem: 'Wrapper' } }
            >
                { label && <h4 block="RelatedProducts" elem="Label">{ label }</h4> }
                <ul block="RelatedProducts" elem="List">
                    { items ? this.renderProducts(items) : this.renderPlaceholder() }
                </ul>
            </ContentWrapper>
        );
    }
}

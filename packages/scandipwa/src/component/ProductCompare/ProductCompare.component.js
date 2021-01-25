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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ProductCompareAttributeRow from 'Component/ProductCompareAttributeRow';
import ProductCompareItem from 'Component/ProductCompareItem';
import ProductPrice from 'Component/ProductPrice';
import { ProductItemsType } from 'Type/ProductList';

import './ProductCompare.style';

/** @namespace Component/ProductCompare/Component */
export class ProductCompare extends PureComponent {
    static propTypes = {
        clearCompareList: PropTypes.func.isRequired,
        getAttributes: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        products: ProductItemsType
    };

    static defaultProps = {
        isLoading: false,
        products: []
    };

    renderClearButton() {
        const { clearCompareList } = this.props;

        return (
            <div
              block="ProductCompare"
              elem="FirstColumn"
              mix={ { block: 'ClearButton' } }
            >
                <button onClick={ clearCompareList }>
                    { __('Clear Compare') }
                </button>
            </div>
        );
    }

    renderProductCards() {
        const { products } = this.props;

        return products.map((product) => (
            <div block="ProductCompare" elem="Item" key={ product.id }>
                <ProductCompareItem product={ product } />
            </div>
        ));
    }

    renderPriceLabel() {
        return (
            <div
              block="ProductCompare"
              elem="FirstColumn"
              mix={ { block: 'PriceLabel' } }
            >
                { __('Price') }
            </div>
        );
    }

    renderProductPrices() {
        const { products } = this.props;

        return products.map(({ id, price_range }) => <ProductPrice price={ price_range } key={ id } />);
    }

    renderAttributes() {
        const { getAttributes } = this.props;
        const attributes = getAttributes();

        return attributes.map(({ attribute_id, attribute_label, attribute_values }) => (
            <ProductCompareAttributeRow
              title={ attribute_label }
              values={ attribute_values }
              key={ attribute_id }
            />
        ));
    }

    renderProducts() {
        return (
            <div block="ProductCompare">
                <div
                  block="ProductCompare"
                  elem="Row"
                  mix={ { block: 'ProductCardRow' } }
                >
                    { this.renderClearButton() }
                    { this.renderProductCards() }
                </div>
                <div
                  block="ProductCompare"
                  elem="Row"
                  mix={ { block: 'ProductPriceRow' } }
                >
                    { this.renderPriceLabel() }
                    { this.renderProductPrices() }
                </div>
                <div
                  block="ProductCompare"
                  elem="AttributeTable"
                >
                    { this.renderAttributes() }
                </div>
            </div>
        );
    }

    renderEmpty() {
        return (
            <div block="ProductCompare" elem="Empty">
                { __('You have nothing to compare') }
            </div>
        );
    }

    render() {
        const {
            isLoading,
            products
        } = this.props;
        const hasProducts = products && products.length;

        if (isLoading) {
            return null;
        }

        if (!hasProducts) {
            return this.renderEmpty();
        }

        return this.renderProducts();
    }
}

export default ProductCompare;

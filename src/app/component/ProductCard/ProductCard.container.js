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

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { ProductType, FilterType } from 'Type/ProductList';
import { CartDispatcher } from 'Store/Cart';
import ProductCard from './ProductCard.component';

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class ProductCardContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.containerFunctions = {
            getAttribute: this.getAttribute.bind(this)
        };

        this.containerProps = () => ({
            availableVisualOptions: this._getAvailableVisualOptions(),
            currentVariantIndex: this._getCurrentVariantIndex(),
            productOrVariant: this._getProductOrVariant(),
            thumbnail: this._getThumbnail()
        });
    }

    getAttribute(code) {
        const { product: { attributes = [] } } = this.props;
        return attributes[code];
    }

    _getCurrentVariantIndex() {
        const { product: { variants = [] }, selectedFilters = {} } = this.props;
        const index = variants.findIndex(({ product }) => Object.keys(selectedFilters).every(filterKey => (
            selectedFilters[filterKey].find(value => +value === +product[filterKey])
        )));

        return index >= 0 ? index : 0;
    }

    _getThumbnail() {
        const { thumbnail: { path = '' } = {} } = this._getProductOrVariant();
        return path;
    }

    _getProductOrVariant() {
        const { product: { type_id, variants }, product } = this.props;
        return (type_id === 'configurable' && variants
            ? variants[this._getCurrentVariantIndex()]
            : product
        ) || {};
    }

    _getAvailableVisualOptions() {
        const { product: { configurable_options = [] } } = this.props;

        return Object.values(configurable_options).reduce((acc, { attribute_options = {} }) => {
            const visualOptions = Object.values(attribute_options).reduce(
                (acc, { swatch_data: { type, value }, label }) => {
                    if (type !== '1') return acc;
                    return [...acc, { value, label }];
                }, []
            );

            if (visualOptions.length > 0) acc.push(visualOptions);
            return acc;
        }, []);
    }

    render() {
        return (
            <ProductCard
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

ProductCardContainer.propTypes = {
    product: ProductType.isRequired,
    selectedFilters: FilterType
};

ProductCardContainer.defaultProps = {
    selectedFilters: {}
};

export default connect(null, mapDispatchToProps)(ProductCardContainer);

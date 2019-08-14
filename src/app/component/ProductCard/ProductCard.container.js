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
        return attributes.find(({ attribute_code }) => attribute_code === code);
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
            ? variants[this._getCurrentVariantIndex()].product
            : product
        ) || {};
    }

    _getAvailableVisualOptions() {
        const { product: { configurable_options = [], attributes } } = this.props;

        return configurable_options.reduce((acc, { attribute_code: option_code, values }) => {
            const { attribute_options = [] } = attributes.find(
                ({ attribute_code }) => attribute_code === option_code
            ) || [];

            return [
                ...acc,
                ...values.reduce((acc, { value_index }) => {
                    const { swatch_data: { type, value } = {}, label } = attribute_options.find(
                        ({ value }) => +value === value_index
                    ) || {};

                    if (type !== '1') return acc;
                    return [...acc, { value, label }];
                }, [])
            ];
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

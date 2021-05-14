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
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { DeviceType } from 'Type/Device';
import { FilterType, ProductType } from 'Type/ProductList';
import history from 'Util/History';
import { CONFIGURABLE, getVariantsIndexes } from 'Util/Product';
import { objectToUri } from 'Util/Url';

import ProductCard from './ProductCard.component';
import { IN_STOCK } from './ProductCard.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/ProductCard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active
});

/** @namespace Component/ProductCard/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/** @namespace Component/ProductCard/Container */
export class ProductCardContainer extends PureComponent {
    static propTypes = {
        product: ProductType,
        selectedFilters: FilterType,
        device: DeviceType.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired
    };

    static defaultProps = {
        product: {},
        selectedFilters: {}
    };

    containerFunctions = {
        getAttribute: this.getAttribute.bind(this),
        isConfigurableProductOutOfStock: this.isConfigurableProductOutOfStock.bind(this),
        isBundleProductOutOfStock: this.isConfigurableProductOutOfStock.bind(this)
    };

    getAttribute(code) {
        const { selectedFilters } = this.props;

        if (!Object.keys(selectedFilters).length) {
            const { product: { attributes = {} } } = this.props;
            return attributes[code];
        }

        const currentVariantIndex = this._getCurrentVariantIndex();
        const { product, product: { variants = [] } } = this.props;
        const { attributes: parentAttributes = {} } = product;
        const { attributes = parentAttributes } = variants[currentVariantIndex] || product;
        const { attribute_options = {} } = parentAttributes[code] || {};

        return {
            ...attributes[code],
            attribute_options
        };
    }

    containerProps = () => ({
        availableVisualOptions: this._getAvailableVisualOptions(),
        currentVariantIndex: this._getCurrentVariantIndex(),
        productOrVariant: this._getProductOrVariant(),
        thumbnail: this._getThumbnail(),
        linkTo: this._getLinkTo()
    });

    _getLinkTo() {
        const { product: { url }, product } = this.props;

        if (!url) {
            return undefined;
        }

        const { parameters } = this._getConfigurableParameters();
        const { state: { category = null } = {} } = history.location;

        return {
            pathname: url,
            state: { product, prevCategoryId: category },
            search: objectToUri(parameters)
        };
    }

    _getCurrentVariantIndex() {
        const { index } = this._getConfigurableParameters();
        return index;
    }

    _getConfigurableParameters() {
        const { product: { variants = [] }, selectedFilters = {} } = this.props;
        const filterKeys = Object.keys(selectedFilters);

        if (filterKeys.length === 0) {
            return { indexes: [], parameters: {} };
        }

        const indexes = getVariantsIndexes(variants, selectedFilters);
        const [index] = indexes;

        if (!variants[index]) {
            return { indexes: [], parameters: {} };
        }
        const { attributes } = variants[index];

        const parameters = Object.entries(attributes)
            .reduce((parameters, [key, { attribute_value }]) => {
                if (filterKeys.includes(key)) {
                    return { ...parameters, [key]: attribute_value };
                }

                return parameters;
            }, {});

        return { indexes, index, parameters };
    }

    _isThumbnailAvailable(path) {
        return path && path !== 'no_selection';
    }

    _getThumbnail() {
        const product = this._getProductOrVariant();
        const { small_image: { url } = {} } = product;
        if (this._isThumbnailAvailable(url)) {
            return url;
        }

        // If thumbnail is, missing we try to get image from parent
        const { product: { small_image: { url: parentUrl } = {} } } = this.props;
        if (this._isThumbnailAvailable(parentUrl)) {
            return parentUrl;
        }

        return '';
    }

    _getProductOrVariant() {
        const { product: { type_id, variants }, product } = this.props;

        if (type_id === CONFIGURABLE && variants?.length) {
            return variants[this._getCurrentVariantIndex()] || product || {};
        }

        return product || {};
    }

    _getAvailableVisualOptions() {
        const { product: { configurable_options = {} } } = this.props;

        if (Object.keys(configurable_options).length === 0) {
            return [];
        }

        // Find first option that has swatch_data in attribute_options property
        const optionWithSwatchData = Object.values(configurable_options).find((option) => {
            const { attribute_options = {} } = option;

            return Object.values(attribute_options).some(({ swatch_data }) => swatch_data);
        });

        const { attribute_options = {} } = optionWithSwatchData || {};

        return Object.values(attribute_options).reduce(
            (acc, option) => {
                const {
                    swatch_data,
                    label
                } = option;

                const { type, value } = swatch_data || {};

                if (type && value) {
                    acc.push({ value, label, type });
                }

                return acc;
            },
            []
        );
    }

    isConfigurableProductOutOfStock() {
        const { product: { variants } } = this.props;

        const variantsInStock = variants.filter((productVariant) => productVariant.stock_status === IN_STOCK);

        return variantsInStock.length === 0;
    }

    isBundleProductOutOfStock() {
        const { product: { items } } = this.props;

        if (items.length === 0) {
            return true;
        }

        const { options } = items[0];

        const optionsInStock = options.filter((option) => option.product.stock_status === IN_STOCK);

        return optionsInStock.length === 0;
    }

    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { ({ registerSharedElement }) => (
                    <ProductCard
                      { ...{ ...this.props, registerSharedElement } }
                      { ...this.containerFunctions }
                      { ...this.containerProps() }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);

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
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { FilterType, ProductType } from 'Type/ProductList';
import { getVariantsIndexes } from 'Util/Product';
import { objectToUri } from 'Util/Url';

import ProductCard from './ProductCard.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const mapDispatchToProps = (dispatch) => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

export class ProductCardContainer extends PureComponent {
    static propTypes = {
        product: ProductType,
        selectedFilters: FilterType
    };

    static defaultProps = {
        product: {},
        selectedFilters: {}
    };

    containerFunctions = {
        getAttribute: this.getAttribute.bind(this)
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

        return {
            pathname: url,
            state: { product },
            search: objectToUri(parameters)
        };
    }

    _getCurrentVariantIndex() {
        const { index } = this._getConfigurableParameters();
        return index >= 0 ? index : 0;
    }

    _getConfigurableParameters() {
        const { product: { variants = [] }, selectedFilters = {} } = this.props;
        const filterKeys = Object.keys(selectedFilters);

        if (filterKeys.length < 0) {
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

        return (
            (
                type_id === 'configurable'
                && variants !== undefined
                && variants.length
            )
                ? variants[this._getCurrentVariantIndex()]
                : product
        ) || {};
    }

    _getAvailableVisualOptions() {
        const { product: { configurable_options = [] } } = this.props;

        return Object.values(configurable_options).reduce((acc, { attribute_options = {}, attribute_values }) => {
            const visualOptions = Object.values(attribute_options).reduce(
                (acc, option) => {
                    const {
                        swatch_data,
                        label,
                        value: attrValue
                    } = option;

                    const { type, value } = swatch_data || {};

                    if (
                        type === '1'
                        && attribute_values.includes(attrValue)
                    ) {
                        acc.push({ value, label });
                    }

                    return acc;
                }, []
            );

            if (visualOptions.length > 0) {
                return [...acc, ...visualOptions];
            }

            return acc;
        }, []);
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

export default connect(null, mapDispatchToProps)(ProductCardContainer);

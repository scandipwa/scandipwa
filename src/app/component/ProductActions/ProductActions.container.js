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

import { ProductType } from 'Type/ProductList';
import {
    BUNDLE,
    CONFIGURABLE,
    GROUPED
} from 'Util/Product';

import ProductActions from './ProductActions.component';
import { DEFAULT_MAX_PRODUCTS } from './ProductActions.config';

/** @namespace Component/ProductActions/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity,
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductActions/Container */
export class ProductActionsContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        productOrVariant: PropTypes.object.isRequired,
        configurableVariantIndex: PropTypes.number.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        getLink: PropTypes.func.isRequired
    };

    static getMinQuantity(props) {
        const {
            product: { stock_item: { min_sale_qty } = {}, variants } = {},
            configurableVariantIndex
        } = props;

        if (!min_sale_qty) {
            return 1;
        }
        if (!configurableVariantIndex && !variants) {
            return min_sale_qty;
        }

        const { stock_item: { min_sale_qty: minVariantQty } = {} } = variants[configurableVariantIndex] || {};

        return minVariantQty || min_sale_qty;
    }

    static getMaxQuantity(props) {
        const {
            product: {
                stock_item: {
                    max_sale_qty
                } = {},
                variants
            } = {},
            configurableVariantIndex
        } = props;

        if (!max_sale_qty) {
            return DEFAULT_MAX_PRODUCTS;
        }

        if (configurableVariantIndex === -1 || !Object.keys(variants).length) {
            return max_sale_qty;
        }

        const {
            stock_item: {
                max_sale_qty: maxVariantQty
            } = {}
        } = variants[configurableVariantIndex] || {};

        return maxVariantQty || max_sale_qty;
    }

    state = {
        quantity: 1,
        groupedProductQuantity: {}
    };

    containerFunctions = {
        showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this),
        onProductValidationError: this.onProductValidationError.bind(this),
        getIsOptionInCurrentVariant: this.getIsOptionInCurrentVariant.bind(this),
        setQuantity: this.setQuantity.bind(this),
        setGroupedProductQuantity: this._setGroupedProductQuantity.bind(this),
        clearGroupedProductQuantity: this._clearGroupedProductQuantity.bind(this),
        getIsConfigurableAttributeAvailable: this.getIsConfigurableAttributeAvailable.bind(this)
    };

    static getDerivedStateFromProps(props, state) {
        const { quantity } = state;
        const minQty = ProductActionsContainer.getMinQuantity(props);
        const maxQty = ProductActionsContainer.getMaxQuantity(props);

        if (quantity < minQty) {
            return { quantity: minQty };
        }
        if (quantity > maxQty) {
            return { quantity: maxQty };
        }

        return null;
    }

    onConfigurableProductError = this.onProductError.bind(this, this.configurableOptionsRef);

    onGroupedProductError = this.onProductError.bind(this, this.groupedProductsRef);

    onProductError(ref) {
        if (!ref) {
            return;
        }
        const { current } = ref;

        current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        current.classList.remove('animate');
        // eslint-disable-next-line no-unused-expressions
        current.offsetWidth; // trigger a DOM reflow
        current.classList.add('animate');
    }

    onProductValidationError(type) {
        switch (type) {
        case CONFIGURABLE:
            this.onConfigurableProductError();
            break;
        case GROUPED:
            this.onGroupedProductError();
            break;
        default:
            break;
        }
    }

    setQuantity(value) {
        this.setState({ quantity: +value });
    }

    // TODO: make key=>value based
    getIsOptionInCurrentVariant(attribute, value) {
        const { configurableVariantIndex, product: { variants } } = this.props;
        if (!variants) {
            return false;
        }

        return variants[configurableVariantIndex].product[attribute] === value;
    }

    getIsConfigurableAttributeAvailable({ attribute_code, attribute_value }) {
        const { parameters, product: { variants } } = this.props;

        const isAttributeSelected = Object.hasOwnProperty.call(parameters, attribute_code);

        // If value matches current attribute_value, option should be enabled
        if (isAttributeSelected && parameters[attribute_code] === attribute_value) {
            return true;
        }

        const parameterPairs = Object.entries(parameters);

        const selectedAttributes = isAttributeSelected
            // Need to exclude itself, otherwise different attribute_values of the same attribute_code will always be disabled
            ? parameterPairs.filter(([key]) => key !== attribute_code)
            : parameterPairs;

        return variants
            .some(({ stock_status, attributes }) => {
                const { attribute_value: foundValue } = attributes[attribute_code] || {};

                return (
                    stock_status === 'IN_STOCK'
                    // Variant must have currently checked attribute_code and attribute_value
                    && foundValue === attribute_value
                    // Variant must have all currently selected attributes
                    && selectedAttributes.every(([key, value]) => attributes[key].attribute_value === value)
                );
            });
    }

    containerProps = () => ({
        minQuantity: ProductActionsContainer.getMinQuantity(this.props),
        maxQuantity: ProductActionsContainer.getMaxQuantity(this.props),
        groupedProductQuantity: this._getGroupedProductQuantity(),
        productPrice: this.getProductPrice(),
        productName: this.getProductName(),
        offerCount: this.getOfferCount(),
        offerType: this.getOfferType(),
        stockMeta: this.getStockMeta(),
        metaLink: this.getMetaLink()
    });

    getProductName() {
        const {
            product,
            product: { variants = [] },
            configurableVariantIndex
        } = this.props;

        const {
            name
        } = variants[configurableVariantIndex] || product;

        return name;
    }

    getMetaLink() {
        const { getLink } = this.props;
        return window.location.origin + getLink().replace(/\?.*/, '');
    }

    getStockMeta() {
        const {
            product,
            product: { variants = [] },
            configurableVariantIndex
        } = this.props;

        const {
            stock_status
        } = variants[configurableVariantIndex] || product;

        if (stock_status === 'OUT_OF_STOCK') {
            return 'https://schema.org/OutOfStock';
        }

        return 'https://schema.org/InStock';
    }

    getOfferType() {
        const { product: { variants } } = this.props;

        if (variants && variants.length >= 1) {
            return 'https://schema.org/AggregateOffer';
        }

        return 'https://schema.org/Offer';
    }

    getOfferCount() {
        const { product: { variants } } = this.props;

        if (variants && variants.length) {
            return variants.length;
        }

        return 0;
    }

    getProductPrice() {
        const {
            product,
            product: { variants = [], type_id },
            configurableVariantIndex,
            selectedBundlePrice
        } = this.props;

        const {
            price_range
        } = variants[configurableVariantIndex] || product;

        if (type_id === BUNDLE) {
            const { price_range: { minimum_price: { regular_price: { currency } } } } = product;
            const priceValue = { value: selectedBundlePrice, currency };

            return {
                minimum_price: {
                    final_price: priceValue,
                    regular_price: priceValue
                }
            };
        }

        return price_range;
    }

    _getGroupedProductQuantity() {
        const { groupedProductQuantity } = this.state;
        return groupedProductQuantity;
    }

    _setGroupedProductQuantity(id, value) {
        this.setState(({ groupedProductQuantity }) => ({
            groupedProductQuantity: {
                ...groupedProductQuantity,
                [id]: value
            }
        }));
    }

    _clearGroupedProductQuantity() {
        this.setState({ groupedProductQuantity: {} });
    }

    showOnlyIfLoaded(expression, content, placeholder = content) {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) {
            return placeholder;
        }
        if (areDetailsLoaded && !expression) {
            return null;
        }

        return content;
    }

    render() {
        return (
            <ProductActions
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

/** @namespace Component/ProductActions/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);

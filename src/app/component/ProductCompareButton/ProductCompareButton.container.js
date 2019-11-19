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
import PropTypes from 'prop-types';
import { showNotification } from 'Store/Notification';
import { ProductType } from 'Type/ProductList';
import { getExtensionAttributes } from 'Util/Product';
import { CompareDispatcher, PRODUCTS_IN_COMPARE } from 'Store/Compare';
import BrowserDatabase from 'Util/BrowserDatabase';
import ProductCompareButton from './ProductCompareButton.component';

export const mapStateToProps = state => ({
    comparedProducts: state.CompareReducer.comparedProducts,
    areCompareProductsLoading: state.CompareReducer.areCompareProductsLoading
});

export const mapDispatchToProps = dispatch => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCompare: options => CompareDispatcher.addProductToCompare(options, dispatch),
    removeProductFromCompare: options => CompareDispatcher.removeProductFromCompare(options, dispatch)
});

export const ERROR_CONFIGURABLE_NOT_PROVIDED = 'ERROR_CONFIGURABLE_NOT_PROVIDED';

export class ProductCompareButtonContainer extends PureComponent {
    static propTypes = {
        quantity: PropTypes.number,
        product: ProductType.isRequired,
        compareProducts: PropTypes.arrayOf(ProductType),
        areCompareProductsLoading: PropTypes.bool,
        configurableVariantIndex: PropTypes.number,
        showNotification: PropTypes.func.isRequired,
        addProductToCompare: PropTypes.func.isRequired,
        removeProductFromCompare: PropTypes.func.isRequired
    };

    static defaultProps = {
        compareProducts: [],
        areCompareProductsLoading: false,
        configurableVariantIndex: -2
    };

    containerProps = () => ({
        isDisabled: this.isDisabled(),
        isInCompare: this.isInCompare(),
        isReady: this._getIsProductReady()
    });

    containerFunctions = () => ({
        addToCompare: this.toggleProductInCompare.bind(this, true),
        removeFromCompare: this.toggleProductInCompare.bind(this, false)
    });

    toggleProductInCompare = (add = true) => {
        const {
            areCompareProductsLoading,
            showNotification,
            addProductToCompare,
            removeProductFromCompare
        } = this.props;

        if (areCompareProductsLoading) return null;

        const product = this._getProductVariant();
        if (product === ERROR_CONFIGURABLE_NOT_PROVIDED) {
            return showNotification('error', __('Plaese, select desireable variant first!'));
        }

        if (add) return addProductToCompare({ product: { ...product } });

        return removeProductFromCompare({ product: { ...product } });
    };

    isDisabled = () => {
        const { areCompareProductsLoading } = this.props;
        const product = this._getProductVariant();

        if (product === ERROR_CONFIGURABLE_NOT_PROVIDED) return true;
        return areCompareProductsLoading;
    };

    isConfigurable() {
        const { product: { type_id } } = this.props;

        return type_id === 'configurable';
    }

    isIndexValid() {
        const { configurableVariantIndex } = this.props;

        return configurableVariantIndex > -1;
    }

    getCompareProductsFromLocal() {
        return BrowserDatabase.getItem(PRODUCTS_IN_COMPARE) || [];
    }

    isInCompare = () => {
        const {
            compareProducts = this.getCompareProductsFromLocal(),
            product,
            product: { variants },
            configurableVariantIndex
        } = this.props;

        if (Object.values(product).length === 0) return false;

        const productsInCompare = compareProducts.length > 0 ? compareProducts : this.getCompareProductsFromLocal();

        return !!(productsInCompare.find(p => p.id === (variants[configurableVariantIndex] || {}).id));
    };

    getLink = ({ attribute_code, attribute_value }) => {
        const { getLink } = this.props;
        return getLink(attribute_code, attribute_value);
    };

    _getIsProductReady() {
        const { product: { type_id }, configurableVariantIndex } = this.props;

        return !(type_id === 'configurable' && configurableVariantIndex < 0);
    }

    _getProductVariant() {
        const {
            product,
            product: { type_id },
            configurableVariantIndex,
            url_key
        } = this.props;

        if (type_id === 'configurable') {
            if (configurableVariantIndex < 0) return ERROR_CONFIGURABLE_NOT_PROVIDED;

            const extension_attributes = getExtensionAttributes({ ...product, configurableVariantIndex });
            const variant = product.variants[configurableVariantIndex];

            // const url_key = Object.values(variant.attributes).reduce((acc, attribute) => {
            //     const { attribute_value } = attribute;
            //     if (attribute_value) return this.getLink(attribute);
            //     return acc;
            // }, 0).replace('/product/', '');

            return { ...variant, product_option: { extension_attributes }, url_key };
        }

        return product;
    }

    render() {
        return (
            <ProductCompareButton
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareButtonContainer);

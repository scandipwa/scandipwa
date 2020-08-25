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

import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList';
import { isSignedIn } from 'Util/Auth';
import {
    BUNDLE,
    CONFIGURABLE,
    GROUPED
} from 'Util/Product';

import AddToCart from './AddToCart.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const mapStateToProps = (state) => ({
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = (dispatch) => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    removeFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class AddToCartContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        product: ProductType.isRequired,
        quantity: PropTypes.number,
        configurableVariantIndex: PropTypes.number,
        groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
        showNotification: PropTypes.func.isRequired,
        setQuantityToDefault: PropTypes.func,
        addProduct: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired,
        onProductValidationError: PropTypes.func,
        productOptionsData: PropTypes.object.isRequired
    };

    static defaultProps = {
        quantity: 1,
        configurableVariantIndex: 0,
        setQuantityToDefault: () => {},
        onProductValidationError: () => {},
        isLoading: false
    };

    state = { isLoading: false };

    containerFunctions = {
        buttonClick: this.buttonClick.bind(this)
    };

    validationMap = {
        [CONFIGURABLE]: this.validateConfigurableProduct.bind(this),
        [GROUPED]: this.validateGroupedProduct.bind(this),
        [BUNDLE]: this.validateBundleProduct.bind(this)
    };

    addToCartHandlerMap = {
        [CONFIGURABLE]: this.addConfigurableProductToCart.bind(this),
        [GROUPED]: this.addGroupedProductToCart.bind(this)
    };

    validateConfigurableProduct() {
        const {
            configurableVariantIndex,
            showNotification,
            product: {
                variants = []
            }
        } = this.props;

        if (configurableVariantIndex < 0 || !variants[configurableVariantIndex]) {
            showNotification('info', __('Please select product options!'));
            return false;
        }

        const { stock_status: configurableStock } = variants[configurableVariantIndex];

        if (configurableStock !== 'IN_STOCK') {
            showNotification('info', __('Sorry! The selected product option is out of stock!'));
            return false;
        }

        return true;
    }

    validateGroupedProduct() {
        const {
            groupedProductQuantity,
            showNotification,
            product: {
                items
            }
        } = this.props;

        const isAllItemsAvailable = items.every(({ product: { id } }) => groupedProductQuantity[id]);

        if (!isAllItemsAvailable) {
            showNotification('info', __('Sorry! Child product quantities are invalid!'));
            return false;
        }

        return true;
    }

    validateBundleProduct() {
        const {
            productOptionsData,
            showNotification
        } = this.props;

        const validateBundleOptions = this.validateCustomizableOptions(productOptionsData, true);

        if (!validateBundleOptions) {
            showNotification('info', __('Please select required option!'));
            return false;
        }

        return true;
    }

    validateSimpleProduct() {
        const {
            productOptionsData,
            showNotification
        } = this.props;

        const validateCustomizableOptions = this.validateCustomizableOptions(productOptionsData);

        if (!validateCustomizableOptions) {
            showNotification('info', __('Please select required option!'));
            return false;
        }

        return true;
    }

    validateCustomizableOptions(productOptionsData, isBundle = false) {
        const {
            requiredOptions = {}
        } = productOptionsData || {};

        if (requiredOptions.length) {
            const {
                productOptions,
                productOptionsMulti,
                requiredOptions
            } = productOptionsData;

            return this.validateProductOptions(
                [...productOptions || [], ...productOptionsMulti || []],
                requiredOptions,
                isBundle
            );
        }

        return true;
    }

    validateProductOptions(items, requiredOptions, isBundle = false) {
        // Make sure EVERY required option is FOUND in selected items
        return requiredOptions.every((requiredOption) => (
            items.find((item) => {
                const { id, option_id } = item;
                const matchWith = isBundle ? id : option_id;
                return requiredOption === matchWith;
            })
        ));
    }

    validateAddToCart() {
        const {
            product: { type_id }
        } = this.props;

        const validationRule = this.validationMap[type_id];

        if (validationRule) {
            return validationRule();
        }

        return this.validateSimpleProduct();
    }

    addGroupedProductToCart() {
        const {
            product,
            product: { items },
            groupedProductQuantity,
            addProduct
        } = this.props;

        Promise.all(items.map((item) => {
            const { product: groupedProductItem } = item;

            const newProduct = {
                ...groupedProductItem,
                parent: product
            };

            const quantity = groupedProductQuantity[groupedProductItem.id];

            if (!quantity) {
                return Promise.resolve();
            }

            return addProduct({
                product: newProduct,
                quantity
            });
        })).then(
            () => this.afterAddToCart(),
            () => this.resetLoading()
        );
    }

    addConfigurableProductToCart() {
        const {
            product,
            quantity,
            addProduct,
            configurableVariantIndex,
            productOptionsData
        } = this.props;

        addProduct({
            product: {
                ...product,
                configurableVariantIndex
            },
            quantity,
            productOptionsData
        }).then(
            () => this.afterAddToCart(),
            () => this.resetLoading()
        );
    }

    addSimpleProductToCart() {
        const {
            product,
            quantity,
            addProduct,
            productOptionsData
        } = this.props;

        addProduct({
            product,
            quantity,
            productOptionsData
        }).then(
            () => this.afterAddToCart(),
            () => this.resetLoading()
        );
    }

    addProductToCart() {
        const {
            product: { type_id }
        } = this.props;

        const addToCartHandler = this.addToCartHandlerMap[type_id];

        if (addToCartHandler) {
            addToCartHandler();
            return;
        }

        this.addSimpleProductToCart();
    }

    buttonClick() {
        const {
            product: { type_id },
            onProductValidationError
        } = this.props;

        if (!this.validateAddToCart()) {
            onProductValidationError(type_id);
            return;
        }

        this.setState({ isLoading: true }, () => this.addProductToCart());
    }

    resetLoading() {
        this.setState({ isLoading: false });
    }

    removeProductFromWishlist() {
        const {
            wishlistItems,
            removeFromWishlist,
            configurableVariantIndex,
            product: { type_id, variants = {} } = {}
        } = this.props;

        if (type_id !== 'configurable') {
            return;
        }

        const { sku } = variants[configurableVariantIndex];

        const wishlistItemKey = Object.keys(wishlistItems)
            .find((key) => {
                const { wishlist: { sku: wSku } } = wishlistItems[key];
                return wSku === sku;
            });

        if (!isSignedIn() || wishlistItemKey === undefined) {
            return;
        }

        const { wishlist: { id: item_id } } = wishlistItems[wishlistItemKey];
        removeFromWishlist({ item_id, sku, noMessage: true });
    }

    afterAddToCart() {
        const {
            showNotification,
            setQuantityToDefault
        } = this.props;

        showNotification('success', __('Product added to cart!'));
        setQuantityToDefault();

        this.removeProductFromWishlist();
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <AddToCart
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);

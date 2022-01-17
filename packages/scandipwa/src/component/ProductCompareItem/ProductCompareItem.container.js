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

import PRODUCT_TYPE from 'Component/Product/Product.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { DeviceType } from 'Type/Device.type';
import { ProductType } from 'Type/ProductList.type';
import history from 'Util/History';
import { ADD_TO_CART } from 'Util/Product';
import { magentoProductTransform } from 'Util/Product/Transform';
import { appendWithStoreCode } from 'Util/Url';

import ProductCompareItem from './ProductCompareItem.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/ProductCompareItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active
});

/** @namespace Component/ProductCompareItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    removeComparedProduct: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeComparedProduct(productId, dispatch)
    ),
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/ProductCompareItem/Container */
export class ProductCompareItemContainer extends PureComponent {
    static propTypes = {
        addProductToCart: PropTypes.func.isRequired,
        product: ProductType.isRequired,
        removeComparedProduct: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        showNotification: PropTypes.func.isRequired,
        isInStock: PropTypes.func.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        removeComparedProduct: this.removeComparedProduct.bind(this),
        getGroupedProductQuantity: this.getGroupedProductQuantity.bind(this),
        getProductOptionsData: this.getProductOptionsData.bind(this),
        overriddenAddToCartBtnHandler: this.overriddenAddToCartBtnHandler.bind(this),
        addItemToCart: this.addItemToCart.bind(this)
    };

    containerProps() {
        const { product, isInStock, isWishlistEnabled } = this.props;
        const { isLoading } = this.state;

        return {
            product,
            isLoading,
            imgUrl: this.getProductImage(),
            overrideAddToCartBtnBehavior: this.getOverrideAddToCartBtnBehavior(),
            linkTo: this.getLinkTo(),
            isInStock,
            isWishlistEnabled
        };
    }

    async removeComparedProduct() {
        const {
            product: { id } = {},
            removeComparedProduct
        } = this.props;

        this.setState({ isLoading: true });
        await removeComparedProduct(id);
    }

    getGroupedProductQuantity() {
        const { product: { items } = {} } = this.props;

        if (!items) {
            return {};
        }

        return items.reduce((result, item) => {
            const { product: { id } = {} } = item;
            Object.assign(result, { [id]: 1 });

            return result;
        }, {});
    }

    getProductOptionsData() {
        const { product: { options } } = this.props;

        if (!options) {
            return { requiredOptions: [] };
        }

        return {
            requiredOptions: options
                .map(({ option_id, required }) => (required ? option_id : null))
                .filter((item) => !!item)
        };
    }

    getProductImage() {
        const {
            product: {
                thumbnail,
                small_image
            } = {},
            device: {
                isMobile
            } = {}
        } = this.props;

        if (isMobile) {
            return small_image.url;
        }

        return thumbnail.url;
    }

    getLinkTo() {
        const { product: { url }, product } = this.props;

        return {
            pathname: url,
            state: { product }
        };
    }

    getOverrideAddToCartBtnBehavior() {
        const { product: { type_id, options } } = this.props;
        const types = [PRODUCT_TYPE.bundle, PRODUCT_TYPE.configurable, PRODUCT_TYPE.grouped];

        return !!(types.indexOf(type_id) !== -1 || options?.length);
    }

    overriddenAddToCartBtnHandler() {
        const { showNotification } = this.props;
        showNotification('info', __('Please, select required options!'));
    }

    redirectToProductPage() {
        const { product: { url } } = this.props;

        history.push({ pathname: appendWithStoreCode(url) });
    }

    getProducts() {
        const {
            product: item
        } = this.props;
        const { currentQty } = this.state;

        return magentoProductTransform(ADD_TO_CART, item, currentQty);
    }

    async addItemToCart() {
        const {
            addProductToCart
        } = this.props;

        this.setState({ isLoading: true });

        const products = this.getProducts();

        try {
            await addProductToCart({ products });
            this.setState({ isLoading: false });
        } catch {
            this.setState({ isLoading: false }, this.redirectToProductPage);
        }
    }

    render() {
        return (
            <ProductCompareItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareItemContainer);

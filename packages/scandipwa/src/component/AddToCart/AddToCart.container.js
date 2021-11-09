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
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { MixType } from 'Type/Common.type';
import { LayoutType } from 'Type/Layout.type';
import { ProductType } from 'Type/ProductList.type';
import { ADD_TO_CART } from 'Util/Product';
import {
    getMaxQuantity, getMinQuantity, getName, getProductInStock
} from 'Util/Product/Extract';
import { magentoProductTransform } from 'Util/Product/Transform';

import AddToCart from './AddToCart.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cartId: state.CartReducer.id
});

/** @namespace Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    fallbackAddToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/* @namespace Component/AddToCart/Container */
export class AddToCartContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),
        cartId: PropTypes.string,
        showNotification: PropTypes.func.isRequired,
        addToCart: PropTypes.func,
        fallbackAddToCart: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool,

        isIconEnabled: PropTypes.bool,
        mix: MixType,
        layout: LayoutType
    };

    static defaultProps = {
        quantity: 1,
        cartId: '',
        mix: {},
        layout: GRID_LAYOUT,
        isIconEnabled: true,
        isDisabled: false,
        addToCart: null
    };

    containerFunctions = {
        addProductToCart: this.addProductToCart.bind(this)
    };

    state = {
        isAdding: false
    };

    globalValidationMap = [
        this.validateStock.bind(this),
        this.validateQuantity.bind(this),
        this.validateCustomizable.bind(this),
        this.validateByType.bind(this)
    ];

    typeValidationMap = {
        [PRODUCT_TYPE.bundle]: this.validateBundle.bind(this),
        [PRODUCT_TYPE.downloadable]: this.validateDownloadable.bind(this),
        [PRODUCT_TYPE.configurable]: this.validateConfigurable.bind(this),
        [PRODUCT_TYPE.grouped]: this.validateGroup.bind(this)
    };

    async addProductToCart(e) {
        const { product, addToCart } = this.props;

        if ((!product || Object.keys(product).length === 0) && !addToCart) {
            return;
        }

        e.preventDefault();
        this.setState({ isAdding: true });

        if (!this.validate()) {
            return;
        }

        if (typeof addToCart === 'function') {
            try {
                await addToCart();
            } finally {
                this.setState({ isAdding: false });
            }
        } else {
            const {
                quantity,
                cartId,
                fallbackAddToCart
            } = this.props;
            const magentoProduct = magentoProductTransform(ADD_TO_CART, product, quantity);

            try {
                await fallbackAddToCart({
                    products: magentoProduct,
                    cartId
                });
            } finally {
                this.setState({ isAdding: false });
            }
        }

        this.setState({ isAdding: false });
    }

    validate() {
        // eslint-disable-next-line fp/no-let
        let isValid = true;
        this.globalValidationMap.forEach((step) => {
            if (!step()) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateStock() {
        const { product, showNotification } = this.props;
        const inStock = getProductInStock(product);

        if (!inStock) {
            const name = getName(product);
            showNotification('info', __('Sorry! The product %s is out of stock!', name));
        }

        return inStock;
    }

    validateQuantity() {
        const {
            product, quantity, showNotification, product: { type_id: typeId }
        } = this.props;
        const minQty = getMinQuantity(product);
        const maxQty = getMaxQuantity(product);
        const inRange = quantity >= minQty && quantity <= maxQty;
        const isValid = typeId === PRODUCT_TYPE.grouped || inRange;

        if (!isValid) {
            if (quantity < minQty) {
                showNotification('info', __('Sorry! Minimum quantity for this product is %s!', minQty));
            } else {
                showNotification('info', __('Sorry! Maximum quantity for this product is %s!', maxQty));
            }
        }

        return isValid;
    }

    validateByType() {
        const { product: { type_id } = {} } = this.props;
        const { [type_id]: typeValidationFn } = this.typeValidationMap;

        if (!typeValidationFn) {
            return true;
        }

        return typeValidationFn();
    }

    validateBundle() {
        return true;
    }

    validateCustomizable() {
        return true;
    }

    validateDownloadable() {
        return true;
    }

    validateGroup() {
        return true;
    }

    validateConfigurable() {
        return true;
    }

    containerProps() {
        const {
            isDisabled,
            isIconEnabled,
            mix,
            layout
        } = this.props;

        const {
            isAdding
        } = this.state;

        return {
            isDisabled,
            isIconEnabled,
            mix,
            layout,
            isAdding
        };
    }

    render() {
        return (
            <AddToCart
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);

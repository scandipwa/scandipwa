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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProductType } from 'Component/Product/Product.config';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { ADD_TO_CART } from 'Util/Product';
import {
    getMaxQuantity,
    getMinQuantity,
    getName,
    getProductInStock
} from 'Util/Product/Extract';
import { magentoProductTransform } from 'Util/Product/Transform';
import { RootState } from 'Util/Store/Store.type';

import AddToCart from './AddToCart.component';
import {
    AddToCartComponentContainerPropKeys,
    AddToCartComponentProps,
    AddToCartContainerMapDispatchProps,
    AddToCartContainerMapStateProps,
    AddToCartContainerProps
} from './AddToCart.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): AddToCartContainerMapStateProps => ({
    cartId: state.CartReducer.cartTotals?.id || ''
});

/** @namespace Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): AddToCartContainerMapDispatchProps => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    fallbackAddToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/* @namespace Component/AddToCart/Container */
export class AddToCartContainer extends PureComponent<AddToCartContainerProps> {
    static defaultProps: Partial<AddToCartContainerProps> = {
        quantity: 1,
        cartId: '',
        mix: {},
        layout: CategoryPageLayout.GRID,
        isIconEnabled: true,
        isDisabled: false,
        product: {}
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
        [ ProductType.BUNDLE ]: this.validateBundle.bind(this),
        [ ProductType.DOWNLOADABLE ]: this.validateDownloadable.bind(this),
        [ ProductType.CONFIGURABLE ]: this.validateConfigurable.bind(this),
        [ ProductType.GROUPED ]: this.validateGroup.bind(this)
    };

    async addProductToCart(e: MouseEvent): Promise<void> {
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

    validate(): boolean {
        // eslint-disable-next-line fp/no-let
        let isValid = true;
        this.globalValidationMap.forEach((step) => {
            if (!step()) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateStock(): boolean {
        const { product, showNotification } = this.props;
        const inStock = getProductInStock(product);

        if (!inStock) {
            const name = getName(product);
            showNotification(NotificationType.INFO, __('Sorry! The product %s is out of stock!', name));
        }

        return inStock;
    }

    validateQuantity(): boolean {
        const {
            product, quantity, showNotification, product: { type_id: typeId }
        } = this.props;
        const minQty = getMinQuantity(product);
        const maxQty = getMaxQuantity(product);
        const inRange = quantity >= minQty && quantity <= maxQty;
        const isValid = typeId === ProductType.GROUPED || inRange;

        if (!isValid) {
            if (quantity < minQty) {
                showNotification(NotificationType.INFO, __('Sorry! Minimum quantity for this product is %s!', minQty));
            } else {
                showNotification(NotificationType.INFO, __('Sorry! Maximum quantity for this product is %s!', maxQty));
            }
        }

        return isValid;
    }

    validateByType(): boolean {
        const { product: { type_id = '' } = {} } = this.props;
        const { [type_id as keyof typeof this.typeValidationMap]: typeValidationFn } = this.typeValidationMap;

        if (!typeValidationFn) {
            return true;
        }

        return typeValidationFn();
    }

    validateBundle(): boolean {
        return true;
    }

    validateCustomizable(): boolean {
        return true;
    }

    validateDownloadable(): boolean {
        return true;
    }

    validateGroup(): boolean {
        return true;
    }

    validateConfigurable(): boolean {
        return true;
    }

    containerProps(): Pick<AddToCartComponentProps, AddToCartComponentContainerPropKeys> {
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

    render(): ReactElement {
        return (
            <AddToCart
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);

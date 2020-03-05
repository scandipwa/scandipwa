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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isSignedIn } from 'Util/Auth';
import { CONFIGURABLE, GIFTCARD, GROUPED } from 'Util/Product';
import { CartDispatcher } from 'Store/Cart';
import { ProductType } from 'Type/ProductList';
import { showNotification } from 'Store/Notification';

import { WishlistDispatcher } from 'Store/Wishlist';
import AddToCart from './AddToCart.component';

export const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options),
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
        giftCardVariantIndex: PropTypes.number.isRequired,
        giftCardAmount: PropTypes.number.isRequired,
        giftcard_amounts: PropTypes.object,
        giftCardData: PropTypes.object,
        onProductValidationError: PropTypes.func
    };

    static defaultProps = {
        quantity: 1,
        configurableVariantIndex: 0,
        setQuantityToDefault: () => {},
        onProductValidationError: () => {},
        isLoading: false,
        giftcard_amounts: {},
        giftCardData: {}
    };

    state = { isLoading: false };

    containerFunctions = {
        buttonClick: this.buttonClick.bind(this)
    };

    _validateAddToCart() {
        const {
            configurableVariantIndex,
            giftCardVariantIndex,
            giftCardAmount,
            groupedProductQuantity,
            showNotification,
            product,
            product: {
                type_id,
                variants = [],
                items,
                giftcard_amounts,
                allow_open_amount,
                open_amount_min,
                open_amount_max,
                message_max_length
            },
            giftCardData: {
                giftcard_sender_email,
                giftcard_sender_name,
                giftcard_recipient_email,
                giftcard_recipient_name,
                giftcard_message
            }
        } = this.props;

        switch (type_id) {
        case CONFIGURABLE:
            if (configurableVariantIndex < 0 || !variants[configurableVariantIndex]) {
                showNotification('info', __('Please select product options!'));
                return false;
            }

            const { stock_status: configurableStock } = variants[configurableVariantIndex];

            if (configurableStock !== 'IN_STOCK') {
                showNotification('info', __('Sorry! The selected product option is out of stock!'));
                return false;
            }

            break;
        case GIFTCARD:
            if (!allow_open_amount && (giftCardVariantIndex < 0 || !giftcard_amounts[giftCardVariantIndex])) {
                showNotification('info', __('Please select product options!'));

                return false;
            }

            if (!giftcard_sender_email
                || !giftcard_sender_name
                || !giftcard_recipient_email
                || !giftcard_recipient_name
            ) {
                showNotification('info', __('Please fill in all the fields!'));

                return false;
            }

            if (giftcard_message.length > message_max_length) {
                showNotification('info', __('Entered message is too long!'));

                return false;
            }

            if (allow_open_amount
                && (open_amount_min > giftCardAmount || open_amount_max < giftCardAmount)) {
                showNotification('info', __('Please choose correct amount'));

                return false;
            }

            if (!this.isValidEmail(giftcard_sender_email) || !this.isValidEmail(giftcard_recipient_email)) {
                showNotification('info', __('Please enter valid email address!'));

                return false;
            }

            break;
        case GROUPED:
            const isAllItemsAvailable = items.every(({ product: { id } }) => groupedProductQuantity[id]);

            if (!isAllItemsAvailable) {
                showNotification('info', __('Sorry! Child product quantities are invalid!'));
                return false;
            }

            break;
        default:
            const { stock_status } = product;

            if (stock_status !== 'IN_STOCK') {
                showNotification('info', __('Sorry! The product is out of stock!'));
                return false;
            }
        }

        return true;
    }

    isValidEmail(address) {
        return address.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    buttonClick() {
        const {
            product,
            onProductValidationError,
            configurableVariantIndex,
            groupedProductQuantity,
            quantity,
            addProduct,
            giftCardVariantIndex,
            giftCardData,
            giftCardAmount
        } = this.props;
        // eslint-disable-next-line fp/no-let
        let giftCardFieldData = {};

        const { variants, type_id } = product;

        if (!this._validateAddToCart()) {
            onProductValidationError(type_id);
            return;
        }

        this.setState({ isLoading: true });

        if (type_id === 'grouped') {
            const { items } = product;

            Promise.all(items.map((item) => {
                const { product: groupedProductItem } = item;

                groupedProductItem.parent = product;
                const quantity = groupedProductQuantity[groupedProductItem.id];
                if (!quantity) return Promise.resolve();

                return addProduct({
                    product: groupedProductItem,
                    quantity
                });
            })).then(() => this._afterAdded());

            return;
        }

        if (type_id === GIFTCARD) {
            const { giftcard_amounts, allow_open_amount } = product;
            const {
                giftcard_sender_email,
                giftcard_sender_name,
                giftcard_recipient_email,
                giftcard_recipient_name,
                giftcard_message
            } = giftCardData;

            if (allow_open_amount) {
                giftCardFieldData = { custom_giftcard_amount: giftCardAmount };
            } else {
                giftCardFieldData = { giftcard_amount: giftcard_amounts[giftCardVariantIndex].value };
            }

            giftCardFieldData = {
                ...giftCardFieldData,
                giftcard_message,
                giftcard_recipient_email,
                giftcard_recipient_name,
                giftcard_sender_email,
                giftcard_sender_name
            };
        }

        const productToAdd = variants
            ? {
                ...product,
                configurableVariantIndex,
                giftCardFieldData
            }
            : product;

        addProduct({
            product: productToAdd,
            quantity
        }).then(
            () => this._afterAdded()
        ).catch(
            () => this.resetLoading()
        );
    }

    resetLoading() {
        this.setState({ isLoading: false });
    }

    removeProductFromWishlist() {
        const {
            wishlistItems,
            removeFromWishlist,
            configurableVariantIndex,
            product: { type_id, variants = {} } = {},
            giftCardData
        } = this.props;

        if (type_id !== CONFIGURABLE && type_id !== GIFTCARD) return;

        if (type_id === GIFTCARD) {
            const { product: { sku } } = this.props;
            const wishlistItemKey = Object.keys(wishlistItems)
                .find((key) => {
                    const { wishlist: { sku: wSku, options } } = wishlistItems[key];
                    return wSku === sku && options === JSON.stringify(giftCardData);
                });

            if (!isSignedIn() || wishlistItemKey === undefined) return;

            const { wishlist: { id: item_id } } = wishlistItems[wishlistItemKey];
            removeFromWishlist({ item_id, giftCardData, noMessage: true });

            return;
        }

        const { sku } = variants[configurableVariantIndex];

        const wishlistItemKey = Object.keys(wishlistItems)
            .find((key) => {
                const { wishlist: { sku: wSku } } = wishlistItems[key];
                return wSku === sku;
            });

        if (!isSignedIn() || wishlistItemKey === undefined) return;

        const { wishlist: { id: item_id } } = wishlistItems[wishlistItemKey];
        removeFromWishlist({ item_id, sku, noMessage: true });
    }

    _afterAdded() {
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

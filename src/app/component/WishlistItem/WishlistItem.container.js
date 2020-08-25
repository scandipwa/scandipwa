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
import { debounce } from 'Util/Request';

import WishlistItem from './WishlistItem.component';
import { UPDATE_WISHLIST_FREQUENCY } from './WishlistItem.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    updateWishlistItem: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWishlistItem(dispatch, options)
    ),
    removeFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    )
});

export class WishlistItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        addProductToCart: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        updateWishlistItem: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired
    };

    containerFunctions = {
        addToCart: this.addItemToCart.bind(this),
        removeItem: this.removeItem.bind(this, false)
    };

    state = {
        isLoading: false
    };

    changeQuantity = debounce((quantity) => {
        const { product: { wishlist: { id: item_id } }, updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, quantity });
    }, UPDATE_WISHLIST_FREQUENCY);

    changeDescription = debounce((description) => {
        const { product: { wishlist: { id: item_id } }, updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, description });
    }, UPDATE_WISHLIST_FREQUENCY);

    containerProps = () => {
        const { isLoading } = this.state;

        return {
            changeQuantity: this.changeQuantity,
            changeDescription: this.changeDescription,
            parameters: this._getParameters(),
            isLoading
        };
    };

    getConfigurableVariantIndex = (sku, variants) => Object.keys(variants).find((i) => variants[i].sku === sku);

    _getParameters = () => {
        const { product } = this.props;

        const {
            type_id,
            wishlist: { sku },
            variants,
            configurable_options
        } = product;

        if (type_id !== 'configurable') {
            return {};
        }

        const options = Object.keys(configurable_options) || [];
        const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);

        const { attributes = {} } = variants[configurableVariantIndex];
        const parameters = Object.entries(attributes).reduce((acc, [code, { attribute_value }]) => {
            if (!options.includes(code)) {
                return acc;
            }

            return {
                ...acc,
                [code]: [attribute_value]
            };
        }, {});

        return parameters;
    };

    addItemToCart() {
        const { product: item, addProductToCart, showNotification } = this.props;

        const {
            type_id,
            variants,
            wishlist: {
                id, sku, quantity
            }
        } = item;

        const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);
        const product = type_id === 'configurable'
            ? { ...item, configurableVariantIndex }
            : item;

        this.setState({ isLoading: true });

        return addProductToCart({ product, quantity })
            .then(
                () => this.removeItem(id),
                () => this.showNotification('error', __('Error Adding Product To Cart'))
            )
            .then(() => showNotification('success', __('Product Added To Cart')))
            .catch(() => this.showNotification('error', __('Error cleaning wishlist')));
    }

    showNotification(...args) {
        const { showNotification } = this.props;
        this.setState({ isLoading: false });
        showNotification(...args);
    }

    removeItem(noMessages = true) {
        const { product: { wishlist: { id: item_id } }, removeFromWishlist } = this.props;
        this.setState({ isLoading: true });
        return removeFromWishlist({ item_id, noMessages });
    }

    render() {
        return (
            <WishlistItem
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(WishlistItemContainer);

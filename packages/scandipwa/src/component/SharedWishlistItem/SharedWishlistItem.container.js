/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';

import { WishlistItemContainer } from 'Component/WishlistItem/WishlistItem.container';
import { showNotification } from 'Store/Notification/Notification.action';

import SharedWishlistItem from './SharedWishlistItem.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/SharedWishlistItem/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/SharedWishlistItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/** @namespace Component/SharedWishlistItem/Container */
export class SharedWishlistItemContainer extends WishlistItemContainer {
    state = {
        quantity: 1
    };

    _getConfigurableVariantIndex() {
        const { product: { wishlist: { sku }, variants } } = this.props;

        return +this.getConfigurableVariantIndex(sku, variants);
    }

    containerProps() {
        const {
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product
        } = this.props;
        const { isLoading } = this.state;

        return {
            changeQuantity: this.changeQuantity,
            changeDescription: this.changeDescription,
            configurableVariantIndex: this._getConfigurableVariantIndex(),
            parameters: this.getAttributes(),
            isLoading,
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product
        };
    }

    changeQuantity(quantity) {
        this.setState({ quantity });
    }

    render() {
        return (
            <SharedWishlistItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedWishlistItemContainer);

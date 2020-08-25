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

import { SHARE_WISHLIST_POPUP_ID } from 'Component/ShareWishlistPopup/ShareWishlistPopup.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ProductType } from 'Type/ProductList';

import MyAccountMyWishlist from './MyAccountMyWishlist.component';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const mapStateToProps = (state) => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading
});

export const mapDispatchToProps = (dispatch) => ({
    clearWishlist: () => WishlistDispatcher.then(({ default: dispatcher }) => dispatcher.clearWishlist(dispatch)),
    moveWishlistToCart: () => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.moveWishlistToCart(dispatch)
    ),
    showPopup: (payload) => dispatch(showPopup(SHARE_WISHLIST_POPUP_ID, payload)),
    showNotification: (message) => dispatch(showNotification('success', message))
});

export class MyAccountMyWishlistContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        clearWishlist: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        moveWishlistToCart: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    state = {
        isLoading: false
    };

    containerProps = () => {
        const { isLoading } = this.state;

        return {
            isWishlistEmpty: this._getIsWishlistEmpty(),
            isLoading
        };
    };

    containerFunctions = () => ({
        removeAll: this.removeAll,
        addAllToCart: this.addAllToCart,
        shareWishlist: this.shareWishlist
    });

    addAllToCart = () => {
        const { moveWishlistToCart } = this.props;

        this.setState({ isLoading: true });

        return moveWishlistToCart().then(
            () => this.showNotificationAndRemoveLoading('Wishlist moved to cart')
        );
    };

    removeAll = () => {
        const { clearWishlist } = this.props;

        this.setState({ isLoading: true });

        return clearWishlist().then(
            () => this.showNotificationAndRemoveLoading('Wishlist cleared')
        );
    };

    shareWishlist = () => {
        const { showPopup } = this.props;
        showPopup({ title: __('Share Wishlist') });
    };

    _getIsWishlistEmpty = () => {
        const { wishlistItems } = this.props;

        return Object.entries(wishlistItems).length <= 0;
    };

    showNotificationAndRemoveLoading(message) {
        const { showNotification } = this.props;
        this.setState({ isLoading: false });
        showNotification(message);
    }

    render() {
        return (
            <MyAccountMyWishlist
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyWishlistContainer);

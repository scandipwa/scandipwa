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
import { connect } from 'react-redux';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { ProductType } from 'Type/ProductList';
import { showPopup } from 'Store/Popup';
import { SHARE_WISHLIST_POPUP_ID } from 'Component/ShareWishlistPopup/ShareWishlistPopup.component';
import MyAccountMyWishlist from './MyAccountMyWishlist.component';

/** @namespace Component/MyAccountMyWishlist/Container/mapStateToProps */
export const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading
});

/** @namespace Component/MyAccountMyWishlist/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    clearWishlist: () => WishlistDispatcher.clearWishlist(dispatch),
    moveWishlistToCart: () => WishlistDispatcher.moveWishlistToCart(dispatch),
    showPopup: payload => dispatch(showPopup(SHARE_WISHLIST_POPUP_ID, payload)),
    showNotification: message => dispatch(showNotification('success', message))
});

/** @namespace Component/MyAccountMyWishlist/Container */
export class MyAccountMyWishlistContainer extends ExtensiblePureComponent {
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
            /** @namespace Component/MyAccountMyWishlist/Container/moveWishlistToCartThen */
            () => this.showNotificationAndRemoveLoading('Wishlist moved to cart')
        );
    };

    removeAll = () => {
        const { clearWishlist } = this.props;

        this.setState({ isLoading: true });

        return clearWishlist().then(
            /** @namespace Component/MyAccountMyWishlist/Container/clearWishlistThen */
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

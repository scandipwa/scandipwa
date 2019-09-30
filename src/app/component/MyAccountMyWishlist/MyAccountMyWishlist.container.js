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
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { ProductType } from 'Type/ProductList';
import MyAccountMyWishlist from './MyAccountMyWishlist.component';

export const mapStateToProps = state => ({
    isLoading: state.WishlistReducer.isLoading,
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    clearWishlist: () => WishlistDispatcher.clearWishlist(dispatch),
    moveWishlistToCart: () => WishlistDispatcher.moveWishlistToCart(dispatch),
    showNotification: message => dispatch(showNotification('success', message))
});

export class MyAccountMyWishlistContainer extends PureComponent {
    static propTypes = {
        clearWishlist: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        moveWishlistToCart: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    containerProps = () => ({
        isWishlistEmpty: this.getIsWishlistEmpty()
    });

    containerFunctions = () => ({
        removeAll: this.removeAll,
        addAllToCart: this.addAllToCart
    });

    getIsWishlistEmpty = () => {
        const { wishlistItems } = this.props;

        return Object.entries(wishlistItems).length <= 0;
    };

    addAllToCart = () => {
        const { moveWishlistToCart, showNotification } = this.props;
        return moveWishlistToCart().then(() => showNotification('Wishlist moved to cart'));
    };

    removeAll = () => {
        const { clearWishlist, showNotification } = this.props;
        return clearWishlist().then(() => showNotification('Wishlist cleared'));
    };

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

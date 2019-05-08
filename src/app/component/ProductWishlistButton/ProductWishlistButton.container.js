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

import { connect } from 'react-redux';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import ProductWishlistButton from './ProductWishlistButton.component';

const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist
});

const mapDispatchToProps = dispatch => ({
    addProductToWishlist: options => WishlistDispatcher.addItemToWishlist(dispatch, options),

    removeProductFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options),

    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

const ProductWishlistButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ProductWishlistButton);

export default ProductWishlistButtonContainer;

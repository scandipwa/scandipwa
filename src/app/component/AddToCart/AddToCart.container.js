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
import { CartDispatcher } from 'Store/Cart';
import { WishlistDispatcher } from 'Store/Wishlist';
import AddToCart from './AddToCart.component';

const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    productToBeRemovedAfterAdd: state.WishlistReducer.productToBeRemovedAfterAdd
});

const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeProductFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options)
});

const AddToCartContainer = connect(mapStateToProps, mapDispatchToProps)(AddToCart);

export default AddToCartContainer;

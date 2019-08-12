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
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { showNotification } from 'Store/Notification';
import { CartDispatcher } from 'Store/Cart';
import MyAccountWishlist from './MyAccountWishlist.component';

const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    wishlistItems: state.WishlistReducer.productsInWishlist
});

const mapDispatchToProps = dispatch => ({
    removeProductFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options),

    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),

    showNotification: (type, message) => dispatch(showNotification(type, message)),

    addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

const MyAccountWishlistContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccountWishlist);

export default MyAccountWishlistContainer;

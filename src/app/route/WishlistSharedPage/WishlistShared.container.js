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
import { MatchType } from 'Type/Common';

import { MyAccountMyWishlistContainer } from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.container';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import WishlistShared from './WishlistShared.component';

export const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    clearWishlist: () => WishlistDispatcher.clearWishlist(dispatch),
    moveWishlistToCart: () => WishlistDispatcher.moveWishlistToCart(dispatch),
    showNotification: message => dispatch(showNotification('success', message))
});

export class WishlistSharedContainer extends MyAccountMyWishlistContainer {
    getCode() {
        const { match: { params: { code } } } = this.props;
        return code;
    }

    render() {
        return (
            null
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistSharedContainer);

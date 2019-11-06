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
import { WishlistItemContainer } from 'Component/WishlistItem/WishlistItem.container';
import { CartDispatcher } from 'Store/Cart';
import { showNotification } from 'Store/Notification';
import SharedWishlistItem from './SharedWishlistItem.component';

export const mapDispatchToProps = dispatch => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class SharedWishlistItemContainer extends WishlistItemContainer {
    state = {
        quantity: 1
    };

    static propTypes = {

    };

    addItemToCart() {
        const { product: item, addProductToCart, showNotification } = this.props;
        const { quantity } = this.state;

        const {
            type_id,
            variants,
            wishlist: { sku }
        } = item;

        const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);
        const product = type_id === 'configurable'
            ? { ...item, configurableVariantIndex }
            : item;

        this.setState({ isLoading: true });

        return addProductToCart({ product, quantity })
            .then(() => {
                this.setState({ isLoading: false });
                showNotification('success', __('Product Added To Cart'));
            });
    }

    changeQuantity = (quantity) => {
        this.setState({ quantity });
    };

    render() {
        return (
            <SharedWishlistItem
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(SharedWishlistItemContainer);

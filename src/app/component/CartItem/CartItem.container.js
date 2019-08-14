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
import React from 'react';
import { CartDispatcher } from 'Store/Cart';
import { makeCancelable } from 'Util/Promise';
import CartItem from './CartItem.component';

const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    changeItemQty: options => CartDispatcher.changeItemQty(dispatch, options),
    removeProduct: options => CartDispatcher.removeProductFromCart(dispatch, options)
});

const cartItemWrapper = (props) => {
    /**
     * Handle item quantity change. Check that value is <1
     * @param {Number} value new quantity
     * @return {void}
     */
    const handleChangeQuantity = (quantity) => {
        const { changeItemQty, item: { item_id, sku } } = props;
        return makeCancelable(changeItemQty({ item_id, quantity, sku }));
    };

    const handleRemoveItem = () => {
        const { removeProduct, item: { item_id } } = props;
        return makeCancelable(removeProduct(item_id));
    };

    return (
        <CartItem { ...props }
          handleRemoveItem={ handleRemoveItem }
          handleChangeQuantity={ handleChangeQuantity }
        />
    );
};

const CartItemContainer = connect(null, mapDispatchToProps)(cartItemWrapper);


export default CartItemContainer;

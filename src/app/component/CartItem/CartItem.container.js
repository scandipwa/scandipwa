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
import CartItem from './CartItem.component';
import { makeCancelable } from 'Util/Promise';

const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeProduct: options => CartDispatcher.removeProductFromCart(dispatch, options)
});



const cartItemWrapper = (props) => {
    /**
     * Handle item quantity change. Check that value is <1
     * @param {Number} value new quantity
     * @return {void}
     */
    const handleChangeQuantity = (value) => {
        const { addProduct, item: { product, qty } } = props;
        const newQuantity = qty < value ? 1 : -1;
        // this.setState({ isLoading: true });
        return makeCancelable(addProduct({ product, quantity: newQuantity }));
    }

    
    const handleRemoveItem = () => {
        const { removeProduct, item: { item_id } } = props;
        return makeCancelable(removeProduct(item_id));
    }


    return <CartItem { ...props } handleRemoveItem={ handleRemoveItem } handleChangeQuantity={ handleChangeQuantity }/>
}

const CartItemContainer = connect(null, mapDispatchToProps)(cartItemWrapper);


export default CartItemContainer;

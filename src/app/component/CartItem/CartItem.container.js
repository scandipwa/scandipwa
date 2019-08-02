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



const something = (props) => {
    /**
     * Handle item quantity change. Check that value is <1
     * @param {Number} value new quantity
     * @return {void}
     */
    // const handleChangeQuantity = (value) => {
    //     const { addProduct, product, product: { quantity } } = this.props;
    //     const newQuantity = quantity < value ? 1 : -1;
    //     isLoading = true;
    //     // this.setState({ isLoading: true });
    //     addProduct({ product, quantity: newQuantity }).then(
    //         () => { isLoading = false; }
    //     );
    // }

    
    const handleRemoveItem = () => {
        const { removeProduct, item: { item_id } } = props;
        return makeCancelable(removeProduct(item_id));
    }


    return <CartItem { ...props } handleRemoveItem={ handleRemoveItem }/>
}

const CartItemContainer = connect(null, mapDispatchToProps)(something);


export default CartItemContainer;

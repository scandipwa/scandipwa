import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import CartItem from './CartItem.component';

const mapDispatchToProps = dispatch => ({
    addProduct: (options) => {
        CartDispatcher.addProductToCart(dispatch, options);
    },
    removeProduct: (options) => {
        CartDispatcher.removeProductFromCart(dispatch, options);
    }
});

const CartItemContainer = connect(null, mapDispatchToProps)(CartItem);

export default CartItemContainer;

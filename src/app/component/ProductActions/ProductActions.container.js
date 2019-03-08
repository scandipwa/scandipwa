import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import ProductActions from './ProductActions.component';

const mapDispatchToProps = dispatch => ({
    addProduct: (options) => {
        CartDispatcher.addProductToCart(dispatch, options);
    }
});

const ProductActionsContainer = connect(null, mapDispatchToProps)(ProductActions);

export default ProductActionsContainer;

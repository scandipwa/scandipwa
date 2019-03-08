import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import ProductCard from './ProductCard.component';

const mapDispatchToProps = dispatch => ({
    addProduct: (options) => {
        CartDispatcher.addProductToCart(dispatch, options);
    }
});

const ProductCardContainer = connect(null, mapDispatchToProps)(ProductCard);

export default ProductCardContainer;

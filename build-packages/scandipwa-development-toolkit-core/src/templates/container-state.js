import { connect } from 'react-redux';

import Placeholder from './Placeholder.component';

export const mapStateToProps = (_state) => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = (_dispatch) => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder);

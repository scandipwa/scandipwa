import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from 'Util/Store/Store.type';

import Placeholder from './Placeholder.component';
import { PlaceholderContainerMapDispatchProps, PlaceholderContainerMapStateProps } from './Placeholder.type';

export const mapStateToProps = (_state: RootState): PlaceholderContainerMapStateProps => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = (_dispatch: Dispatch): PlaceholderContainerMapDispatchProps => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder);

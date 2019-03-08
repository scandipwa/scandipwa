import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import MiniCart from './MiniCart.component';

const mapStateToProps = state => ({
    products: state.CartReducer.products,
    totals: state.CartReducer.totals
});

const mapDispatchToProps = dispatch => ({
    updateTotals: (options) => {
        CartDispatcher.updateTotals(dispatch, options);
    }
});

const MiniCartContainer = connect(mapStateToProps, mapDispatchToProps)(MiniCart);

export default MiniCartContainer;

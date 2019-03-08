import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CartPage from './CartPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.products,
    totals: state.CartReducer.totals
});

const mapDispatchToProps = dispatch => ({
    updateTotals: (options) => {
        CartDispatcher.updateTotals(dispatch, options);
    },
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

const CartPageContainer = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default CartPageContainer;

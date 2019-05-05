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
import { CartDispatcher } from 'Store/Cart';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import CartPage from './CartPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals
});

const mapDispatchToProps = dispatch => ({
    updateTotals: options => CartDispatcher.updateTotals(dispatch, options),
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch)
});

const CartPageContainer = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default CartPageContainer;

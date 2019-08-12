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
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeHeaderState } from 'Store/Header';
import CartPage from './CartPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals
});

const mapDispatchToProps = dispatch => ({
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch)
});

const CartPageContainer = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default CartPageContainer;

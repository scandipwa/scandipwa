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
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import { CartDispatcher } from 'Store/Cart';
import { hideActiveOverlay } from 'Store/Overlay';
import CartOverlay from './CartOverlay.component';

const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals
});

const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState()),
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateTotals: options => CartDispatcher.updateTotals(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);

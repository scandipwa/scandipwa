/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';

import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartSubtotal,
    getCartSubtotalSubPrice,
    getCartTotalSubPrice
} from 'Util/Cart';

import CheckoutOrderSummary from './CheckoutOrderSummary.component';

/** @namespace Component/CheckoutOrderSummary/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    cartSubtotal: getCartSubtotal(state),
    cartSubtotalSubPrice: getCartSubtotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state),
    cartTotalSubPrice: getCartTotalSubPrice(state),
    isLoading: state.CartReducer.isLoading,
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/CheckoutOrderSummary/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrderSummary);

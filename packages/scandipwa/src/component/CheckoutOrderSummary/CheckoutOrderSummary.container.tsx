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

import { ComponentType } from 'react';
import { connect } from 'react-redux';

import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartSubtotal,
    getCartSubtotalSubPrice,
    getCartTotalSubPrice
} from 'Util/Cart';
import { RootState } from 'Util/Store/Store.type';

import CheckoutOrderSummary from './CheckoutOrderSummary.component';
import {
    CheckoutOrderSummaryComponentProps,
    CheckoutOrderSummaryContainerMapDispatchProps,
    CheckoutOrderSummaryContainerMapStateProps
} from './CheckoutOrderSummary.type';

/** @namespace Component/CheckoutOrderSummary/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutOrderSummaryContainerMapStateProps => ({
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
export const mapDispatchToProps = (): CheckoutOrderSummaryContainerMapDispatchProps => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    CheckoutOrderSummary as unknown as ComponentType<CheckoutOrderSummaryComponentProps>
);

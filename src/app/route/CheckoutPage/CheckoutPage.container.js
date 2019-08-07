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

import React from 'react';
import { connect } from 'react-redux';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import { GUEST_QUOTE_ID, CartDispatcher } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { showNotification } from 'Store/Notification';
import CheckoutPage from './CheckoutPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals,
    toggleHeaderAndFooter: state.HeaderAndFooterReducer.toggleHeaderAndFooter,
    isHeaderAndFooterVisible: state.HeaderAndFooterReducer.isHeaderAndFooterVisible,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    countryList: state.ConfigReducer.countries
});

const mapDispatchToProps = dispatch => ({
    updateToggleHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.toggleHeaderAndFooter(dispatch, options);
    },

    removeCartAndObtainNewGuest: () => {
        BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
        CartDispatcher.updateInitialCartData(dispatch);
    },

    requestCustomerData(options) {
        return MyAccountDispatcher.requestCustomerData(options, dispatch);
    },

    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

const MappedCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

const CheckoutPageContainer = (props) => {
    const getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    const saveAddressInformation = addressInformation => fetchMutation(
        CheckoutQuery.getSaveAddressInformation(addressInformation, getGuestCartId())
    );

    const savePaymentInformationAndPlaceOrder = paymentInformation => fetchMutation(
        CheckoutQuery.getSavePaymentInformationAndPlaceOrder(paymentInformation, getGuestCartId())
    );

    return (
        <MappedCheckoutPage
          saveAddressInformation={ saveAddressInformation }
          savePaymentInformationAndPlaceOrder={ savePaymentInformationAndPlaceOrder }
          { ...props }
        />
    );
};

export default CheckoutPageContainer;

import React from 'react';
import { connect } from 'react-redux';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { showNotification } from 'Store/Notification';
import CheckoutShippingStep from './CheckoutShippingStep.component';

const mapDispatchToProps = dispatch => ({
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

const mapStateToProps = state => ({
    countryList: state.ConfigReducer.countries
});

const MappedCheckoutShippingStep = connect(mapStateToProps, mapDispatchToProps)(CheckoutShippingStep);

const CheckoutShippingStepContainer = (props) => {
    const getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    const estimateShippingCost = address => fetchMutation(
        CheckoutQuery.getEstimateShippingCosts(
            address,
            getGuestCartId()
        )
    );

    return (
        <MappedCheckoutShippingStep
          estimateShippingCost={ estimateShippingCost }
          { ...props }
        />
    );
};

export default CheckoutShippingStepContainer;

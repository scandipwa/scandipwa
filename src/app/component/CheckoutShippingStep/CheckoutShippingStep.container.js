import React from 'react';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase';
import CheckoutShippingStep from './CheckoutShippingStep.component';

const CheckoutShippingStepContainer = (props) => {
    const getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    const estimateShippingCost = address => fetchMutation(
        CheckoutQuery.getEstimateShippingCosts(address, getGuestCartId())
    );

    return (
        <CheckoutShippingStep
          estimateShippingCost={ estimateShippingCost }
          { ...props }
        />
    );
};

export default CheckoutShippingStepContainer;

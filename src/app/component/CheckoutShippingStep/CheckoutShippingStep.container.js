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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { showNotification } from 'Store/Notification';
import CheckoutShippingStep from './CheckoutShippingStep.component';

export const mapDispatchToProps = dispatch => ({
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

export const mapStateToProps = state => ({
    countryList: state.ConfigReducer.countries
});

const MappedCheckoutShippingStep = connect(mapStateToProps, mapDispatchToProps)(CheckoutShippingStep);

class CheckoutShippingStepContainer extends PureComponent {
    getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    estimateShippingCost = address => fetchMutation(
        CheckoutQuery.getEstimateShippingCosts(
            address,
            this.getGuestCartId()
        )
    );

    render() {
        return (
            <MappedCheckoutShippingStep
              estimateShippingCost={ this.estimateShippingCost }
              { ...this.props }
            />
        );
    }
}

export default CheckoutShippingStepContainer;

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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { BRAINTREE, KLARNA } from 'Component/CheckoutPayments/CheckoutPayments.config';
import {
    TERMS_AND_CONDITIONS_POPUP_ID
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { addressType, customerType } from 'Type/Account';
import { paymentMethodsType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { trimAddressFields, trimCustomerAddress } from 'Util/Address';

import CheckoutBilling from './CheckoutBilling.component';

/** @namespace Component/CheckoutBilling/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    totals: state.CartReducer.cartTotals,
    termsAreEnabled: state.ConfigReducer.terms_are_enabled,
    termsAndConditions: state.ConfigReducer.checkoutAgreements
});

/** @namespace Component/CheckoutBilling/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (message) => dispatch(showNotification('error', message)),
    showPopup: (payload) => dispatch(showPopup(TERMS_AND_CONDITIONS_POPUP_ID, payload))
});

/** @namespace Component/CheckoutBilling/Container */
export class CheckoutBillingContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        savePaymentInformation: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        shippingAddress: addressType.isRequired,
        customer: customerType.isRequired,
        totals: TotalsType.isRequired,
        termsAndConditions: PropTypes.arrayOf(PropTypes.shape({
            checkbox_text: PropTypes.string,
            content: PropTypes.string,
            name: PropTypes.string
        })).isRequired
    };

    static getDerivedStateFromProps(props, state) {
        const { paymentMethod, prevPaymentMethods } = state;
        const { paymentMethods } = props;

        if (!prevPaymentMethods.length && !paymentMethod) {
            const [method] = paymentMethods;
            const { code: paymentMethod } = method || {};

            return {
                prevPaymentMethods: paymentMethods,
                paymentMethod
            };
        }

        return null;
    }

    containerFunctions = {
        onBillingSuccess: this.onBillingSuccess.bind(this),
        onBillingError: this.onBillingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onSameAsShippingChange: this.onSameAsShippingChange.bind(this),
        onPaymentMethodSelect: this.onPaymentMethodSelect.bind(this),
        showPopup: this.showPopup.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { paymentMethods, customer } = props;
        const [method] = paymentMethods;
        const { code: paymentMethod } = method || {};

        this.state = {
            isSameAsShipping: this.isSameShippingAddress(customer),
            selectedCustomerAddressId: 0,
            prevPaymentMethods: paymentMethods,
            paymentMethod
        };
    }

    isSameShippingAddress({ default_billing, default_shipping }) {
        const { totals: { is_virtual } } = this.props;

        if (is_virtual) {
            return false;
        }

        return default_billing === default_shipping;
    }

    onAddressSelect(id) {
        this.setState({ selectedCustomerAddressId: id });
    }

    onSameAsShippingChange() {
        this.setState(({ isSameAsShipping }) => ({ isSameAsShipping: !isSameAsShipping }));
    }

    onPaymentMethodSelect(code) {
        this.setState({ paymentMethod: code });
    }

    onBillingSuccess(fields, asyncData) {
        const { savePaymentInformation } = this.props;
        const address = this._getAddress(fields);
        const paymentMethod = this._getPaymentData(asyncData);

        savePaymentInformation({
            billing_address: address,
            paymentMethod
        });
    }

    onBillingError(fields, invalidFields, error) {
        const { showErrorNotification } = this.props;

        if (error) {
            const { message = __('Something went wrong!') } = error;
            showErrorNotification(message);
        }
    }

    showPopup() {
        const { showPopup, termsAndConditions } = this.props;
        const {
            name: title = __('Terms and Conditions'),
            content: text = __('There are no Terms and Conditions configured.')
        } = termsAndConditions[0] || {};

        return showPopup({
            title, text
        });
    }

    _getPaymentData(asyncData) {
        const { paymentMethod: code } = this.state;

        switch (code) {
        case BRAINTREE:
            const [{ nonce }] = asyncData;

            return {
                code,
                additional_data: {
                    payment_method_nonce: nonce,
                    is_active_payment_token_enabler: false
                }
            };

        case KLARNA:
            const [{ authorization_token }] = asyncData;

            return {
                code,
                additional_data: {
                    authorization_token
                }
            };

        default:
            return { code };
        }
    }

    _getAddress(fields) {
        const { shippingAddress } = this.props;

        const {
            isSameAsShipping,
            selectedCustomerAddressId
        } = this.state;

        if (isSameAsShipping) {
            return shippingAddress;
        }

        if (!selectedCustomerAddressId) {
            return trimAddressFields(fields);
        }

        const { customer: { addresses } } = this.props;
        const address = addresses.find(({ id }) => id === selectedCustomerAddressId);

        return trimCustomerAddress(address);
    }

    render() {
        return (
            <CheckoutBilling
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutBillingContainer);

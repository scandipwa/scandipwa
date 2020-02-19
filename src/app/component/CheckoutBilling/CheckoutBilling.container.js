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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showPopup } from 'Store/Popup';
import { showNotification } from 'Store/Notification';
import { paymentMethodsType } from 'Type/Checkout';
import { customerType, addressType } from 'Type/Account';
import { trimCustomerAddress, trimAddressFields } from 'Util/Address';
import { TotalsType } from 'Type/MiniCart';
import { BRAINTREE, STRIPE, KLARNA } from 'Component/CheckoutPayments/CheckoutPayments.component';
import {
    TERMS_AND_CONDITIONS_POPUP_ID
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.component';

import CheckoutBilling from './CheckoutBilling.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer,
    totals: state.CartReducer.cartTotals,
    termsAreEnabled: state.ConfigReducer.terms_are_enabled,
    termsAndConditions: state.ConfigReducer.checkoutAgreements
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: message => dispatch(showNotification('error', message)),
    showPopup: payload => dispatch(showPopup(TERMS_AND_CONDITIONS_POPUP_ID, payload))
});

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

    constructor(props) {
        super(props);

        const { paymentMethods, totals: { is_virtual } } = props;
        const [method] = paymentMethods;
        const { code: paymentMethod } = method || {};

        this.state = {
            isSameAsShipping: !is_virtual,
            selectedCustomerAddressId: 0,
            prevPaymentMethods: paymentMethods,
            paymentMethod
        };
    }

    onAddressSelect(id) {
        this.setState({ selectedCustomerAddressId: id });
    }

    onSameAsShippingChange() {
        this.setState(({ isSameAsShipping }) => ({ isSameAsShipping: !isSameAsShipping }));
    }

    onPaymentMethodSelect(method) {
        this.setState({ paymentMethod: method });
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
        const { paymentMethod: method } = this.state;

        switch (method) {
        case BRAINTREE:
            const [{ nonce }] = asyncData;

            return {
                method,
                additional_data: {
                    payment_method_nonce: nonce,
                    is_active_payment_token_enabler: false
                }
            };
        case STRIPE:
            const [{ token, handleAuthorization }] = asyncData;
            if (token === null) {
                return false;
            }

            return {
                method,
                additional_data: {
                    cc_stripejs_token: token,
                    cc_save: false
                },
                handleAuthorization
            };
        case KLARNA:
            const [{ authorization_token }] = asyncData;
            return {
                method,
                additional_data: {
                    authorization_token
                }
            };
        default:
            return { method };
        }
    }

    _getAddress(fields) {
        const { shippingAddress } = this.props;

        const {
            isSameAsShipping,
            selectedCustomerAddressId
        } = this.state;

        if (isSameAsShipping) return shippingAddress;
        if (!selectedCustomerAddressId) return trimAddressFields(fields);

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

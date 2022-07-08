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

import { KLARNA, PURCHASE_ORDER } from 'Component/CheckoutPayments/CheckoutPayments.config';
import {
    TERMS_AND_CONDITIONS_POPUP_ID
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.config';
import { STORE_IN_PICK_UP_METHOD_CODE } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { Addresstype, CustomerType } from 'Type/Account.type';
import { PaymentMethodsType } from 'Type/Checkout.type';
import { TotalsType } from 'Type/MiniCart.type';
import {
    getFormFields,
    setAddressesInFormObject,
    trimCheckoutAddress,
    trimCheckoutCustomerAddress
} from 'Util/Address';
import { getCartTotalSubPrice } from 'Util/Cart';
import scrollToError from 'Util/Form/Form';
import transformToNameValuePair from 'Util/Form/Transform';

import CheckoutBilling from './CheckoutBilling.component';

/** @namespace Component/CheckoutBilling/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    totals: state.CartReducer.cartTotals,
    termsAreEnabled: state.ConfigReducer.terms_are_enabled,
    termsAndConditions: state.ConfigReducer.checkoutAgreements,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    newShippingId: state.CheckoutReducer.shippingFields.id,
    newShippingStreet: state.CheckoutReducer.shippingFields.street
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
        paymentMethods: PaymentMethodsType.isRequired,
        savePaymentInformation: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        shippingAddress: Addresstype.isRequired,
        customer: CustomerType.isRequired,
        totals: TotalsType.isRequired,
        addressLinesQty: PropTypes.number.isRequired,
        termsAndConditions: PropTypes.arrayOf(PropTypes.shape({
            checkbox_text: PropTypes.string,
            content: PropTypes.string,
            name: PropTypes.string
        })).isRequired,
        selectedShippingMethod: PropTypes.string.isRequired,
        cartTotalSubPrice: PropTypes.number,
        setDetailsStep: PropTypes.func.isRequired,
        setLoading: PropTypes.func.isRequired,
        termsAreEnabled: PropTypes.bool,
        newShippingId: PropTypes.number,
        newShippingStreet: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChangeEmailRequired: PropTypes.func.isRequired
    };

    static defaultProps = {
        newShippingId: 0,
        termsAreEnabled: false,
        cartTotalSubPrice: null
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

        const { paymentMethods } = props;

        this.state = {
            isSameAsShipping: false,
            isMounted: false,
            selectedCustomerAddressId: 0,
            prevPaymentMethods: paymentMethods,
            paymentMethod: ''
        };
    }

    componentDidUpdate(prevState) {
        const { customer: { default_billing, default_shipping }, newShippingId } = this.props;
        const { isMounted, isSameAsShipping: currIsSameAsShipping } = this.state;
        const { prevIsSameAsShipping } = prevState;
        const isSameAsShipping = this.isSameShippingAddress({ default_billing, default_shipping });

        // default billing & shipping are undefined on initial mount
        // wait until they become assigned to real values
        // then check for isSameAsShipping condition
        if (!isMounted && default_billing) {
            this.setState({ isSameAsShipping, isMounted: true });
        }

        if (prevIsSameAsShipping !== currIsSameAsShipping && currIsSameAsShipping) {
            this.onAddressSelect(
                // if the user selected a shipping address different from default
                newShippingId > 0 ? newShippingId : default_shipping
            );
        }
    }

    containerProps() {
        const {
            cartTotalSubPrice,
            paymentMethods,
            selectedShippingMethod,
            setDetailsStep,
            setLoading,
            shippingAddress,
            termsAndConditions,
            termsAreEnabled,
            totals
        } = this.props;
        const { isSameAsShipping, paymentMethod } = this.state;

        return {
            cartTotalSubPrice,
            paymentMethods,
            isSameAsShipping,
            selectedShippingMethod,
            setDetailsStep,
            setLoading,
            shippingAddress,
            termsAndConditions,
            termsAreEnabled,
            totals,
            paymentMethod
        };
    }

    isSameShippingAddress({
        default_shipping,
        default_billing
    }) {
        const {
            totals: { is_virtual },
            selectedShippingMethod,
            newShippingId
        } = this.props;

        if (is_virtual) {
            return false;
        }

        if (selectedShippingMethod === STORE_IN_PICK_UP_METHOD_CODE) {
            return false;
        }

        // if the user selected a shipping address different from default
        if (newShippingId > 0) {
            return newShippingId === parseInt(default_billing, 10);
        }

        // otherwise use the default values
        return default_shipping === default_billing;
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

    onBillingError(_, fields, validation) {
        const { onChangeEmailRequired } = this.props;

        onChangeEmailRequired();
        scrollToError(fields, validation);
    }

    onBillingSuccess(form, fields, asyncData) {
        const { savePaymentInformation, onChangeEmailRequired } = this.props;
        const { isSameAsShipping } = this.state;

        const extractedFields = transformToNameValuePair(fields);
        const address = this._getAddress(extractedFields);
        const paymentMethod = this._getPaymentData(extractedFields, asyncData);
        onChangeEmailRequired();

        savePaymentInformation({
            billing_address: address,
            paymentMethod,
            same_as_shipping: isSameAsShipping
        });
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

    _getPaymentData(fields, asyncData) {
        const { paymentMethod: code } = this.state;

        switch (code) {
        case KLARNA:
            const [{ authorization_token }] = asyncData;

            return {
                code,
                additional_data: {
                    authorization_token
                }
            };

        case PURCHASE_ORDER:
            const { purchaseOrderNumber } = fields;

            return {
                code,
                purchase_order_number: purchaseOrderNumber
            };

        default:
            return { code };
        }
    }

    getBillingSameAsShipping() {
        const { selectedShippingMethod, shippingAddress } = this.props;

        if (selectedShippingMethod === STORE_IN_PICK_UP_METHOD_CODE) {
            const { extension_attributes, ...billingAddress } = shippingAddress;

            return billingAddress;
        }

        return shippingAddress;
    }

    _getAddress(fields) {
        const { addressLinesQty } = this.props;

        const {
            isSameAsShipping,
            selectedCustomerAddressId
        } = this.state;

        const formFields = getFormFields(fields, addressLinesQty);

        if (isSameAsShipping) {
            return this.getBillingSameAsShipping();
        }

        if (!selectedCustomerAddressId) {
            const joinedStreetAddressFields = setAddressesInFormObject(formFields, addressLinesQty, 'street_');

            return trimCheckoutAddress(joinedStreetAddressFields);
        }

        const { customer: { addresses } } = this.props;
        const address = addresses.find(({ id }) => id === selectedCustomerAddressId);

        return {
            ...trimCheckoutCustomerAddress(address),
            save_in_address_book: false
        };
    }

    render() {
        return (
            <CheckoutBilling
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutBillingContainer);

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

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutAgreements from 'Component/CheckoutAgreements';
import CheckoutPayments from 'Component/CheckoutPayments';
import CheckoutTermsAndConditionsPopup from 'Component/CheckoutTermsAndConditionsPopup';
import Field from 'Component/Field';
import Form from 'Component/Form';
import { STORE_IN_PICK_UP_METHOD_CODE } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { BILLING_STEP } from 'Route/Checkout/Checkout.config';
import { addressType } from 'Type/Account';
import { paymentMethodsType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

import './CheckoutBilling.style';

/** @namespace Component/CheckoutBilling/Component */
export class CheckoutBilling extends PureComponent {
    state = {
        isOrderButtonVisible: true,
        isOrderButtonEnabled: true
    };

    static propTypes = {
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        isSameAsShipping: PropTypes.bool.isRequired,
        termsAreEnabled: PropTypes.bool,
        isAllRequiredAgreementsSelected: PropTypes.bool.isRequired,
        onSameAsShippingChange: PropTypes.func.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        onBillingSuccess: PropTypes.func.isRequired,
        onBillingError: PropTypes.func.isRequired,
        onAddressSelect: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        totals: TotalsType.isRequired,
        shippingAddress: addressType.isRequired,
        selectedShippingMethod: PropTypes.string.isRequired
    };

    static defaultProps = {
        termsAreEnabled: false
    };

    componentDidMount() {
        const { termsAreEnabled } = this.props;
        if (!termsAreEnabled) {
            this.setState({ isOrderButtonEnabled: true });
        }
    }

    setOrderButtonVisibility = (isOrderButtonVisible) => {
        this.setState({ isOrderButtonVisible });
    };

    setOrderButtonEnableStatus = (isOrderButtonEnabled) => {
        this.setState({ isOrderButtonEnabled });
    };

    renderTermsAndConditions() {
        return (
            <CheckoutAgreements />
        );
    }

    renderOrderTotal() {
        const { totals: { grand_total, quote_currency_code } } = this.props;

        const orderTotal = formatPrice(grand_total, quote_currency_code);

        return (
            <div block="Checkout" elem="OrderTotal">
                <span>
                    { __('Order total:') }
                </span>
                <span>
                    { orderTotal }
                </span>
            </div>
        );
    }

    renderActions() {
        const {
            isOrderButtonVisible,
            isOrderButtonEnabled
        } = this.state;

        const { termsAreEnabled, isAllRequiredAgreementsSelected } = this.props;

        if (!isOrderButtonVisible) {
            return null;
        }

        // if terms and conditions are enabled, validate for acceptance
        const isDisabled = termsAreEnabled
            ? !isOrderButtonEnabled || !isAllRequiredAgreementsSelected
            : !isOrderButtonEnabled;

        return (
            <div block="Checkout" elem="StickyButtonWrapper">
                { this.renderOrderTotal() }
                <button
                  type="submit"
                  block="Button"
                  disabled={ isDisabled }
                  mix={ { block: 'CheckoutBilling', elem: 'Button' } }
                >
                    { __('Complete order') }
                </button>
            </div>
        );
    }

    renderAddressBook() {
        const {
            onAddressSelect,
            isSameAsShipping,
            totals: { is_virtual }
        } = this.props;

        if (isSameAsShipping && !is_virtual) {
            return null;
        }

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              isBilling
            />
        );
    }

    renderSameAsShippingCheckbox() {
        const {
            isSameAsShipping,
            onSameAsShippingChange,
            totals: { is_virtual },
            selectedShippingMethod
        } = this.props;

        if (is_virtual) {
            return null;
        }

        return (
            <Field
              id="sameAsShippingAddress"
              name="sameAsShippingAddress"
              type="checkbox"
              label={ __('My billing and shipping are the same') }
              value="sameAsShippingAddress"
              mix={ { block: 'CheckoutBilling', elem: 'Checkbox' } }
              checked={ isSameAsShipping && selectedShippingMethod !== STORE_IN_PICK_UP_METHOD_CODE }
              onChange={ onSameAsShippingChange }
              isDisabled={ selectedShippingMethod === STORE_IN_PICK_UP_METHOD_CODE }
            />
        );
    }

    renderAddresses() {
        return (
            <>
                { this.renderSameAsShippingCheckbox() }
                { this.renderAddressBook() }
            </>
        );
    }

    renderPayments() {
        const {
            paymentMethods,
            onPaymentMethodSelect,
            setLoading,
            setDetailsStep,
            shippingAddress
        } = this.props;

        if (!paymentMethods.length) {
            return null;
        }

        return (
            <CheckoutPayments
              setLoading={ setLoading }
              setDetailsStep={ setDetailsStep }
              paymentMethods={ paymentMethods }
              onPaymentMethodSelect={ onPaymentMethodSelect }
              setOrderButtonVisibility={ this.setOrderButtonVisibility }
              billingAddress={ shippingAddress }
              setOrderButtonEnableStatus={ this.setOrderButtonEnableStatus }
            />
        );
    }

    renderPopup() {
        return <CheckoutTermsAndConditionsPopup />;
    }

    render() {
        const { onBillingSuccess, onBillingError } = this.props;

        return (
            <Form
              mix={ { block: 'CheckoutBilling' } }
              id={ BILLING_STEP }
              onSubmitError={ onBillingError }
              onSubmitSuccess={ onBillingSuccess }
            >
                { this.renderAddresses() }
                { this.renderPayments() }
                { this.renderTermsAndConditions() }
                { this.renderActions() }
                { this.renderPopup() }
            </Form>
        );
    }
}

export default CheckoutBilling;

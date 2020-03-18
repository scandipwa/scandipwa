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

import CheckoutTermsAndConditionsPopup from 'Component/CheckoutTermsAndConditionsPopup';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutPayments from 'Component/CheckoutPayments';
import { paymentMethodsType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { addressType } from 'Type/Account';
import Field from 'Component/Field';
import Form from 'Component/Form';
import './CheckoutBilling.style';

class CheckoutBilling extends PureComponent {
    state = {
        isOrderButtonVisible: true,
        isOrderButtonEnabled: true,
        isTermsAndConditionsAccepted: false
    };

    static propTypes = {
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        isSameAsShipping: PropTypes.bool.isRequired,
        termsAreEnabled: PropTypes.bool.isRequired,
        onSameAsShippingChange: PropTypes.func.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        onBillingSuccess: PropTypes.func.isRequired,
        onBillingError: PropTypes.func.isRequired,
        onAddressSelect: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        totals: TotalsType.isRequired,
        shippingAddress: addressType.isRequired,
        termsAndConditions: PropTypes.arrayOf(PropTypes.shape({
            checkbox_text: PropTypes.string
        })).isRequired
    };

    componentDidMount() {
        const { termsAreEnabled } = this.props;
        if (!termsAreEnabled) this.setState({ isOrderButtonEnabled: true });
    }

    setOrderButtonVisibility = (isOrderButtonVisible) => {
        this.setState({ isOrderButtonVisible });
    };

    setOrderButtonEnableStatus = (isOrderButtonEnabled) => {
        this.setState({ isOrderButtonEnabled });
    };

    setTACAccepted = () => {
        this.setState(({ isTermsAndConditionsAccepted: oldIsTACAccepted }) => ({
            isTermsAndConditionsAccepted: !oldIsTACAccepted
        }));
    };

    handleShowPopup = (e) => {
        const { showPopup } = this.props;
        e.preventDefault();
        showPopup();
    };

    renderTermsAndConditions() {
        const {
            termsAreEnabled,
            termsAndConditions
        } = this.props;

        const {
            checkbox_text = __('I agree to terms and conditions')
        } = termsAndConditions[0] || {};

        const { isTermsAndConditionsAccepted } = this.state;

        if (!termsAreEnabled) {
            return null;
        }

        return (
            <div
              block="CheckoutBilling"
              elem="TermsAndConditions"
            >
                <label
                  block="CheckoutBilling"
                  elem="TACLabel"
                  htmlFor="termsAndConditions"
                >
                    { checkbox_text }
                    <button
                      block="CheckoutBilling"
                      elem="TACLink"
                      onClick={ this.handleShowPopup }
                    >
                        { __('read more') }
                    </button>
                </label>
                <Field
                  id="termsAndConditions"
                  name="termsAndConditions"
                  type="checkbox"
                  value="termsAndConditions"
                  mix={ { block: 'CheckoutBilling', elem: 'TermsAndConditions-Checkbox' } }
                  checked={ isTermsAndConditionsAccepted }
                  onChange={ this.setTACAccepted }
                />
            </div>
        );
    }

    renderActions() {
        const {
            isOrderButtonVisible,
            isOrderButtonEnabled,
            isTermsAndConditionsAccepted
        } = this.state;

        const { termsAreEnabled } = this.props;

        if (!isOrderButtonVisible) return null;

        // if terms and conditions are enabled, validate for acceptance
        const isDisabled = termsAreEnabled
            ? !isOrderButtonEnabled || !isTermsAndConditionsAccepted
            : !isOrderButtonEnabled;

        return (
            <div block="Checkout" elem="StickyButtonWrapper">
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
        const { onAddressSelect } = this.props;

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              isBilling
            />
        );
    }

    renderAddresses() {
        const {
            isSameAsShipping,
            onSameAsShippingChange,
            totals: { is_virtual }
        } = this.props;

        return (
            <>
                { !is_virtual && (
                    <Field
                      id="sameAsShippingAddress"
                      name="sameAsShippingAddress"
                      type="checkbox"
                      label={ __('My billing and shipping are the same') }
                      value="sameAsShippingAddress"
                      mix={ { block: 'CheckoutBilling', elem: 'Checkbox' } }
                      checked={ isSameAsShipping }
                      onChange={ onSameAsShippingChange }
                    />
                ) }
                { !isSameAsShipping && this.renderAddressBook() }
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

        if (!paymentMethods.length) return null;

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

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

import Form from 'Component/Form';
import CheckoutPayments from 'Component/CheckoutPayments';
import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import { paymentMethodsType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import Field from 'Component/Field';

import './CheckoutBilling.style';

class CheckoutBilling extends PureComponent {
    static propTypes = {
        isSameAsShipping: PropTypes.bool.isRequired,
        onSameAsShippingChange: PropTypes.func.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        onBillingSuccess: PropTypes.func.isRequired,
        onBillingError: PropTypes.func.isRequired,
        onAddressSelect: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        totals: TotalsType.isRequired
    };

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'CheckoutBilling', elem: 'Button' } }
            >
                { __('Complete order') }
            </button>
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
        const { paymentMethods, onPaymentMethodSelect } = this.props;

        if (!paymentMethods.length) return null;

        return (
            <CheckoutPayments
              paymentMethods={ paymentMethods }
              onPaymentMethodSelect={ onPaymentMethodSelect }
            />
        );
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
                { this.renderActions() }
            </Form>
        );
    }
}

export default CheckoutBilling;

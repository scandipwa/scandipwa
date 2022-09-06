/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { MouseEvent, PureComponent } from 'react';

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutPayments from 'Component/CheckoutPayments';
import CheckoutTermsAndConditionsPopup from 'Component/CheckoutTermsAndConditionsPopup';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import { StoreInPickUpCode } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import { CheckoutBillingComponentProps, CheckoutBillingComponentState } from './CheckoutBilling.type';

import './CheckoutBilling.style';

/** @namespace Component/CheckoutBilling/Component */
export class CheckoutBilling extends PureComponent<CheckoutBillingComponentProps, CheckoutBillingComponentState> {
    state: CheckoutBillingComponentState = {
        isOrderButtonVisible: true,
        isOrderButtonEnabled: true,
        isTACAccepted: false
    };

    static defaultProps = {
        cartTotalSubPrice: null,
        paymentMethod: ''
    };

    __construct(props: CheckoutBillingComponentProps): void {
        super.__construct?.(props);

        this.setOrderButtonEnableStatus = this.setOrderButtonEnableStatus.bind(this);
        this.setTACAccepted = this.setTACAccepted.bind(this);
        this.handleShowPopup = this.handleShowPopup.bind(this);
    }

    componentDidMount(): void {
        const { termsAreEnabled } = this.props;

        if (!termsAreEnabled) {
            this.setState({ isOrderButtonEnabled: true });
        }
    }

    setOrderButtonEnableStatus(isOrderButtonEnabled: boolean): void {
        this.setState({ isOrderButtonEnabled });
    }

    setTACAccepted(): void {
        this.setState(({ isTACAccepted: oldIsTACAccepted }) => ({
            isTACAccepted: !oldIsTACAccepted
        }));
    }

    handleShowPopup(e: MouseEvent): void {
        const { showPopup } = this.props;

        e.preventDefault();
        showPopup();
    }

    renderTAC(): ReactElement {
        const {
            termsAreEnabled,
            termsAndConditions
        } = this.props;

        const {
            checkbox_text = __('I agree to terms and conditions')
        } = termsAndConditions[0] || {};

        const { isTACAccepted } = this.state;

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
                    <Field
                      type={ FieldType.CHECKBOX }
                      attr={ {
                          id: 'termsAndConditions',
                          name: 'termsAndConditions',
                          value: 'termsAndConditions',
                          checked: isTACAccepted
                      } }
                      events={ {
                          onChange: this.setTACAccepted
                      } }
                      mix={ { block: 'CheckoutBilling', elem: 'TermsAndConditions-Checkbox' } }
                    />
                   <div>
                        { `${checkbox_text } - ` }
                        <button
                          block="CheckoutBilling"
                          elem="TACLink"
                          onClick={ this.handleShowPopup }
                          type="button"
                        >
                            { __('read more') }
                        </button>
                   </div>
                </label>
            </div>
        );
    }

    renderOrderTotalExlTax(): ReactElement {
        const {
            cartTotalSubPrice,
            totals: { prices: { quote_currency_code = null } = {} }
        } = this.props;

        if (!cartTotalSubPrice) {
            return null;
        }

        const orderTotalExlTax = formatPrice(cartTotalSubPrice, quote_currency_code as GQLCurrencyEnum);

        return (
            <span>
                { `${ __('Excl. tax:') } ${ orderTotalExlTax }` }
            </span>
        );
    }

    renderOrderTotal(): ReactElement {
        const {
            totals: {
                prices: {
                    grand_total: {
                        value: grand_total = 0
                    } = {},
                    quote_currency_code = null
                } = {}
            }
        } = this.props;

        const orderTotal = formatPrice(grand_total || 0, quote_currency_code as GQLCurrencyEnum);

        return (
            <dl block="Checkout" elem="OrderTotal">
                <dt>
                    { __('Order total:') }
                </dt>
                <dd>
                    { orderTotal }
                    { this.renderOrderTotalExlTax() }
                </dd>
            </dl>
        );
    }

    renderActions(): ReactElement {
        const { paymentMethod } = this.props;

        const {
            isOrderButtonVisible,
            isOrderButtonEnabled,
            isTACAccepted
        } = this.state;

        const { termsAreEnabled } = this.props;

        if (!isOrderButtonVisible) {
            return null;
        }

        // if terms and conditions are enabled, validate for acceptance
        const isDisabled = termsAreEnabled
            ? !isOrderButtonEnabled || !isTACAccepted || !paymentMethod
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

    renderAddressBook(): ReactElement {
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
              is_virtual
            />
        );
    }

    renderSameAsShippingCheckbox(): ReactElement {
        const {
            isSameAsShipping,
            onSameAsShippingChange,
            totals: { is_virtual },
            selectedShippingMethod
        } = this.props;

        if (is_virtual) {
            return null;
        }

        if (selectedShippingMethod === StoreInPickUpCode.METHOD_CODE) {
            return null;
        }

        return (
            <Field
              type={ FieldType.CHECKBOX }
              attr={ {
                  id: 'sameAsShippingAddress',
                  name: 'sameAsShippingAddress',
                  value: 'sameAsShippingAddress',
                  checked: isSameAsShipping && selectedShippingMethod !== StoreInPickUpCode.METHOD_CODE
              } }
              events={ {
                  onChange: onSameAsShippingChange
              } }
              mix={ { block: 'CheckoutBilling', elem: 'Checkbox' } }
              label={ __('My billing and shipping are the same') }
              isDisabled={ selectedShippingMethod === StoreInPickUpCode.METHOD_CODE }
            />
        );
    }

    renderHeading(): ReactElement {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Billing address') }
            </h2>
        );
    }

    renderAddresses(): ReactElement {
        return (
            <>
                { this.renderHeading() }
                { this.renderSameAsShippingCheckbox() }
                { this.renderAddressBook() }
            </>
        );
    }

    renderPayments(): ReactElement {
        const {
            paymentMethods,
            onPaymentMethodSelect
            // setLoading,
            // setDetailsStep,
            // shippingAddress
        } = this.props;

        if (!paymentMethods.length) {
            return null;
        }

        return (
            <CheckoutPayments
            //   setLoading={ setLoading }
            //   setDetailsStep={ setDetailsStep }
              paymentMethods={ paymentMethods }
              onPaymentMethodSelect={ onPaymentMethodSelect }
            //   setOrderButtonVisibility={ this.setOrderButtonVisibility }
            //   billingAddress={ shippingAddress }
              setOrderButtonEnableStatus={ this.setOrderButtonEnableStatus }
            />
        );
    }

    renderPopup(): ReactElement {
        return <CheckoutTermsAndConditionsPopup />;
    }

    render(): ReactElement {
        const { onBillingSuccess, onBillingError } = this.props;

        return (
            <Form
              attr={ {
                  id: CheckoutSteps.BILLING_STEP
              } }
              mix={ { block: 'CheckoutBilling' } }
              onSubmit={ onBillingSuccess }
              onError={ onBillingError }
            >
                { this.renderAddresses() }
                { this.renderPayments() }
                { this.renderTAC() }
                { this.renderActions() }
                { this.renderPopup() }
            </Form>
        );
    }
}

export default CheckoutBilling;

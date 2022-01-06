/* eslint-disable */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import { OrderType } from 'Type/Order.type';

import './MyAccountOrderInformation.style';

/** @namespace Component/MyAccountOrderInformation/Component */
export class MyAccountOrderInformation extends PureComponent {
    static propTypes = {
        order: OrderType.isRequired
    };

    renderShippingMethod() {
        const { order: { shipping_method } } = this.props;

        if (!shipping_method) {
            return null;
        }

        return (
            <div
              block="MyAccountOrderInformation"
              elem="Column"
            >
                <div
                  block="MyAccountOrderInformation"
                  elem="ColumnTitle"
                >
                    <strong>
                        <span>{ __('Shipping Method') }</span>
                    </strong>
                </div>
                { shipping_method }
            </div>
        )
    }

    renderBillingAddress() {
        const { order: { billing_address } = {} } = this.props;

        if (!billing_address) {
            return null;
        }

        return (
            <div
              block="MyAccountOrderInformation"
              elem="Column"
              mods={ { type: 'billingAddress' } }
            >
                <div
                  block="MyAccountOrderInformation"
                  elem="ColumnTitle"
                >
                    <strong>
                        <span>{ __('Billing Address') }</span>
                    </strong>
                </div>
                <MyAccountAddressTable
                    address={ billing_address }
                    mix={ { block: 'MyAccountOrderInformation', elem: 'Address' } }
                    showAdditionalFields
                />
            </div>
        );
    }

    renderPaymentMethod (paymentMethod, index) {
        const { name, purchase_number } = paymentMethod;

        return (
            <div
                key={ `${name}-${index}` }
                block="MyAccountOrderInformation"
                elem="PaymentMethod"
            >
                <span>{ name }</span>
                { this.renderPurchaseNumber(purchase_number) }
            </div>
        )
    }

    renderPurchaseNumber(purchaseNumber) {
        if (!purchaseNumber) {
            return null;
        }

        return <span>{ __('Purchase Order Number: %s', purchaseNumber) }</span>
    }

    renderPaymentMethods() {
        const { order: { payment_methods = [] } } = this.props;

        return (
            <div
              block="MyAccountOrderInformation"
              elem="Column"
            >
                <div
                  block="MyAccountOrderInformation"
                  elem="ColumnTitle"
                >
                    <strong>
                        <span>{ __('Payment Method') }</span>
                    </strong>
                </div>
                { payment_methods.map(this.renderPaymentMethod.bind(this)) }
            </div>
        )
    }

    renderShippingAddress() {
        const { order: { shipping_address } = {} } = this.props;

        if (!shipping_address) {
            return null;
        }

        return (
            <div
              block="MyAccountOrderInformation"
              elem="Column"
              mods={ { type: 'shippingAddress' } }
            >
                <div
                  block="MyAccountOrderInformation"
                  elem="ColumnTitle"
                >
                    <strong>
                        <span>{ __('Shipping Address') }</span>
                    </strong>
                </div>
                <MyAccountAddressTable
                    address={ shipping_address }
                    mix={ { block: 'MyAccountOrderInformation', elem: 'Address' } }
                    showAdditionalFields
                />
            </div>
        );
    }

    renderContent() {
        return (
            <>
                <div
                  block="MyAccountOrderInformation"
                  elem="Title"
                >
                    { __('Order Information') }
                </div>
                <div
                  block="MyAccountOrderInformation"
                  elem="Information"
                >
                    { this.renderShippingAddress() }
                    { this.renderShippingMethod() }
                    { this.renderBillingAddress() }
                    { this.renderPaymentMethods() }
                </div>
            </>
        );
    }

    render() {
        const { order } = this.props;

        return (
            <div
              block="MyAccountOrderInformation"
              elem="Wrapper"
            >
                { this.renderContent() }
            </div>
        );
    }
}

export default MyAccountOrderInformation;

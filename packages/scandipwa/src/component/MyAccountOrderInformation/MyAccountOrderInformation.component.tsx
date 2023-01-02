/* eslint-disable */
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

import { PureComponent } from 'react';
import { ReactElement } from 'Type/Common.type';

import MyAccountAddressTable from 'Component/MyAccountAddressTable';

import './MyAccountOrderInformation.style';
import { MyAccountOrderInformationComponentProps, MyAccountOrderInformationComponentState } from './MyAccountOrderInformation.type';
import { OrderPaymentMethod } from 'Query/Order.type';

/** @namespace Component/MyAccountOrderInformation/Component */
export class MyAccountOrderInformation<
P extends Readonly<MyAccountOrderInformationComponentProps> = Readonly<MyAccountOrderInformationComponentProps>,
S extends MyAccountOrderInformationComponentState = MyAccountOrderInformationComponentState,
> extends PureComponent<P, S> {
    renderShippingMethod(): ReactElement {
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
                <span
                    block="MyAccountOrderInformation"
                    elem="ShippingMethod"
                >
                    { shipping_method }
                </span>
            </div>
        )
    }

    renderBillingAddress(): ReactElement {
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
                />
            </div>
        );
    }

    renderPaymentMethod (paymentMethod: OrderPaymentMethod, index: number): ReactElement {
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

    renderPurchaseNumber(purchaseNumber: string): ReactElement {
        if (!purchaseNumber) {
            return null;
        }

        return <span>{ __('Purchase Order Number: %s', purchaseNumber) }</span>
    }

    renderPaymentMethods(): ReactElement {
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

    renderShippingAddress(): ReactElement {
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
                />
            </div>
        );
    }

    renderContent(): ReactElement {
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

    render(): ReactElement {
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

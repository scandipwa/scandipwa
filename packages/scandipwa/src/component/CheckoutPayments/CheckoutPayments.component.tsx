/* eslint-disable no-console */
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

import { ErrorInfo, PureComponent } from 'react';

import CheckoutPayment from 'Component/CheckoutPayment';
import NotSupportedPayment from 'Component/NotSupportedPayment';
import { PurchaseOrder } from 'Component/PurchaseOrder/PurchaseOrder.component';
import { PaymentMethod } from 'Query/Checkout.type';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { ReactElement } from 'Type/Common.type';

import { PaymentMethods } from './CheckoutPayments.config';
import { CheckoutPaymentsComponentProps } from './CheckoutPayments.type';

import './CheckoutPayments.style';

/** @namespace Component/CheckoutPayments/Component */
export class CheckoutPayments extends PureComponent<CheckoutPaymentsComponentProps> {
    paymentRenderMap: Record<string, () => ReactElement> = {
        // [KLARNA]: this.renderKlarnaPayment.bind(this),
        [PaymentMethods.PURCHASE_ORDER]: this.renderPurchaseOrderPayment.bind(this),
    };

    state = {
        hasError: false,
    };

    __construct(props: CheckoutPaymentsComponentProps): void {
        super.__construct?.(props);
        this.renderPayment = this.renderPayment.bind(this);
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        const { showError, setOrderButtonEnableStatus } = this.props;

        console.groupCollapsed('Suppressed error log:');
        console.error(error.toString(), info.toString());
        console.groupEnd();

        this.setState(
            { hasError: true },
            () => {
                setOrderButtonEnableStatus(false);
                showError(`${error} Please try again later`);
            },
        );
    }

    // renderKlarnaPayment(): ReactElement {
    //     const { setOrderButtonEnableStatus } = this.props;

    //     return <Klarna setOrderButtonEnableStatus={ setOrderButtonEnableStatus } />;
    // }

    renderPurchaseOrderPayment(): ReactElement {
        return <PurchaseOrder id={ CheckoutSteps.BILLING_STEP } />;
    }

    renderNotSupported(): ReactElement {
        const { setOrderButtonEnableStatus } = this.props;

        return <NotSupportedPayment disableButton={ setOrderButtonEnableStatus } />;
    }

    renderPayment(method: PaymentMethod): ReactElement {
        const {
            selectPaymentMethod,
            selectedPaymentCode,
        } = this.props;

        const { code } = method;
        const isSelected = selectedPaymentCode === code;

        return (
            <CheckoutPayment
              key={ code }
              isSelected={ isSelected }
              method={ method }
              onClick={ selectPaymentMethod }
            />
        );
    }

    renderPayments(): ReactElement {
        const { paymentMethods } = this.props;

        return paymentMethods.map(this.renderPayment);
    }

    renderSelectedPayment(): ReactElement {
        const { selectedPaymentCode } = this.props;
        const render = this.paymentRenderMap[selectedPaymentCode];

        if (!render) {
            return null;
        }

        return render();
    }

    renderHeading(): ReactElement {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Payment method') }
            </h2>
        );
    }

    renderContent(): ReactElement {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <p>{ __('The error occurred during initializing payment methods. Please try again later!') }</p>
            );
        }

        return (
            <>
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
            </>
        );
    }

    render(): ReactElement {
        return (
            <div block="CheckoutPayments">
                { this.renderContent() }
            </div>
        );
    }
}

export default CheckoutPayments;

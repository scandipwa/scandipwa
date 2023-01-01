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

import { NotSupportedPaymentComponentProps } from './NotSupportedPayment.type';

import './NotSupportedPayment.style';

/** @namespace Component/NotSupportedPayment/Component */
export class NotSupportedPaymentComponent<
P extends Readonly<NotSupportedPaymentComponentProps> = Readonly<NotSupportedPaymentComponentProps>,
S extends NotSupportedPaymentComponentState = NotSupportedPaymentComponentState,
> extends PureComponent<P, S> {
    componentDidMount(): void {
        const { disableButton } = this.props;

        disableButton(true);
    }

    render(): ReactElement {
        return (
            <div block="NotSupportedPayment">
                <p>{ __('This payment method is not supported yet.') }</p>
            </div>
        );
    }
}

export default NotSupportedPaymentComponent;

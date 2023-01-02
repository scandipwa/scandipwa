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

import CheckoutDeliveryOption from 'Component/CheckoutDeliveryOption';
import { ShippingMethod } from 'Query/Checkout.type';
import { ReactElement } from 'Type/Common.type';

import { CheckoutDeliveryOptionsComponentProps, CheckoutDeliveryOptionsComponentState } from './CheckoutDeliveryOptions.type';

import './CheckoutDeliveryOptions.style';

/** @namespace Component/CheckoutDeliveryOptions/Component */
export class CheckoutDeliveryOptionsComponent<
P extends Readonly<CheckoutDeliveryOptionsComponentProps> = Readonly<CheckoutDeliveryOptionsComponentProps>,
S extends CheckoutDeliveryOptionsComponentState = CheckoutDeliveryOptionsComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CheckoutDeliveryOptionsComponentProps> = {
        selectedShippingMethod: {},
    };

    renderHeading(): ReactElement {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Shipping method') }
            </h2>
        );
    }

    renderDeliveryOption(option: ShippingMethod): ReactElement {
        const {
            selectShippingMethod,
            selectedShippingMethod: { method_code: selectedMethodCode = '' } = {},
        } = this.props;

        const { carrier_code, method_code } = option;
        const isSelected = selectedMethodCode === method_code;

        return (
            <CheckoutDeliveryOption
              key={ carrier_code }
              isSelected={ isSelected }
              option={ option }
              onClick={ selectShippingMethod }
            />
        );
    }

    renderNoDeliveryOptions(): ReactElement {
        return (
            <p block="CheckoutDeliveryOptions" elem="NoOptions">
                { __('There are no shipping methods available, try different address.') }
            </p>
        );
    }

    renderShippingMethods(): ReactElement {
        const { shippingMethods } = this.props;

        if (!shippingMethods.length) {
            return this.renderNoDeliveryOptions();
        }

        return shippingMethods.map(this.renderDeliveryOption.bind(this));
    }

    render(): ReactElement {
        return (
            <div block="CheckoutDeliveryOptions">
                { this.renderHeading() }
                <ul>
                    { this.renderShippingMethods() }
                </ul>
            </div>
        );
    }
}

export default CheckoutDeliveryOptionsComponent;

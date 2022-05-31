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

import { ShippingMethod } from 'Query/Checkout.type';
import { ReactElement } from 'Type/Common.type';

import CheckoutDeliveryOptions from './CheckoutDeliveryOptions.component';
import {
    CheckoutDeliveryOptionsComponent,
    CheckoutDeliveryOptionsContainerProps,
    CheckoutDeliveryOptionsContainerPropsKeys,
    CheckoutDeliveryOptionsContainerState
} from './CheckoutDeliveryOptions.type';

/** @namespace Component/CheckoutDeliveryOptions/Container */
export class CheckoutDeliveryOptionsContainer extends PureComponent<
CheckoutDeliveryOptionsContainerProps,
CheckoutDeliveryOptionsContainerState
> {
    static defaultProps = {
        selectedShippingMethod: {}
    };

    state: CheckoutDeliveryOptionsContainerState = {
        isShippingMethodPreSelected: true
    };

    containerFunctions = {
        selectShippingMethod: this.selectShippingMethod.bind(this)
    };

    containerProps(): Pick<CheckoutDeliveryOptionsComponent, CheckoutDeliveryOptionsContainerPropsKeys> {
        const {
            shippingMethods,
            handleSelectDeliveryMethod,
            selectedShippingMethod
        } = this.props;
        const { isShippingMethodPreSelected } = this.state;

        return {
            selectedShippingMethod,
            shippingMethods,
            handleSelectDeliveryMethod,
            isShippingMethodPreSelected
        };
    }

    selectShippingMethod(shippingMethod: ShippingMethod): void {
        const { onShippingMethodSelect } = this.props;
        const { isShippingMethodPreSelected } = this.state;

        if (isShippingMethodPreSelected) {
            this.setState({ isShippingMethodPreSelected: false });
        }

        onShippingMethodSelect(shippingMethod);
    }

    render(): ReactElement {
        return (
            <CheckoutDeliveryOptions
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default CheckoutDeliveryOptionsContainer;

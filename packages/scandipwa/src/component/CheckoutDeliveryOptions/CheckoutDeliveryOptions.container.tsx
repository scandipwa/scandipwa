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
import { connect } from 'react-redux';

import { ShippingMethod } from 'Query/Checkout.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import CheckoutDeliveryOptions from './CheckoutDeliveryOptions.component';
import {
    CheckoutDeliveryOptionsComponentProps,
    CheckoutDeliveryOptionsContainerMapDispatchProps,
    CheckoutDeliveryOptionsContainerMapStateProps,
    CheckoutDeliveryOptionsContainerProps,
    CheckoutDeliveryOptionsContainerPropsKeys,
    CheckoutDeliveryOptionsContainerState,
} from './CheckoutDeliveryOptions.type';

/** @namespace Component/CheckoutDeliveryOptions/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutDeliveryOptionsContainerMapStateProps => ({
    shippingMethods: state.CheckoutReducer.shippingMethods,
    selectedShippingMethod: state.CheckoutReducer.selectedShippingMethod,
});

/** @namespace Component/CheckoutDeliveryOptions/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CheckoutDeliveryOptionsContainerMapDispatchProps => ({});

/** @namespace Component/CheckoutDeliveryOptions/Container */
export class CheckoutDeliveryOptionsContainer extends PureComponent<
CheckoutDeliveryOptionsContainerProps,
CheckoutDeliveryOptionsContainerState
> {
    containerFunctions = {
        selectShippingMethod: this.selectShippingMethod.bind(this),
    };

    dataMap = {};

    containerProps(): Pick<CheckoutDeliveryOptionsComponentProps, CheckoutDeliveryOptionsContainerPropsKeys> {
        const {
            shippingMethods,
            handleSelectDeliveryMethod,
            selectedShippingMethod,
        } = this.props;

        return {
            selectedShippingMethod,
            shippingMethods,
            handleSelectDeliveryMethod,
        };
    }

    // eslint-disable-next-line consistent-return
    selectShippingMethod(shippingMethod: ShippingMethod): void {
        const { onShippingMethodSelect, handleSelectDeliveryMethod } = this.props;
        const { method_code } = shippingMethod;

        if (method_code === 'pickup') {
            handleSelectDeliveryMethod();

            return;
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionsContainer);

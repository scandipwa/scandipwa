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
import { Dispatch } from 'redux';

import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
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
    isPickInStoreMethodSelected: state.CheckoutReducer.isPickInStoreMethodSelected,
});

/** @namespace Component/CheckoutDeliveryOptions/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutDeliveryOptionsContainerMapDispatchProps => ({
    updateCheckoutStore: (state) => dispatch(updateCheckoutStore(state)),
});

/** @namespace Component/CheckoutDeliveryOptions/Container */
export class CheckoutDeliveryOptionsContainer extends PureComponent<
CheckoutDeliveryOptionsContainerProps,
CheckoutDeliveryOptionsContainerState
> {
    dataMap = {};

    containerProps(): Pick<CheckoutDeliveryOptionsComponentProps, CheckoutDeliveryOptionsContainerPropsKeys> {
        const {
            shippingMethods,
            selectedShippingMethod,
        } = this.props;

        return {
            selectedShippingMethod,
            shippingMethods,
        };
    }

    render(): ReactElement {
        return (
             <CheckoutDeliveryOptions
               { ...this.containerProps() }
             />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionsContainer);

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

import { StoreInPickUpCode } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { ReactElement } from 'Type/Common.type';
import { getCartShippingItemPrice, getCartShippingItemSubPrice } from 'Util/Cart';
import { RootState } from 'Util/Store/Store.type';

import CheckoutDeliveryOption from './CheckoutDeliveryOption.component';
import {
    CheckoutDeliveryOptionComponentProps,
    CheckoutDeliveryOptionContainerFunctions,
    CheckoutDeliveryOptionContainerMapDispatchProps,
    CheckoutDeliveryOptionContainerMapStateProps,
    CheckoutDeliveryOptionContainerProps,
    CheckoutDeliveryOptionContainerPropsKeys,
} from './CheckoutDeliveryOption.type';

/** @namespace Component/CheckoutDeliveryOption/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutDeliveryOptionContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    getCartShippingItemPrice: getCartShippingItemPrice(state),
    getCartShippingItemSubPrice: getCartShippingItemSubPrice(state),
    isPickInStoreMethodSelected: state.CheckoutReducer.isPickInStoreMethodSelected,
});

/** @namespace Component/CheckoutDeliveryOption/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutDeliveryOptionContainerMapDispatchProps => ({
    updateCheckoutStore: (state) => dispatch(updateCheckoutStore(state)),
});

/** @namespace Component/CheckoutDeliveryOption/Container */
export class CheckoutDeliveryOptionContainer extends PureComponent<CheckoutDeliveryOptionContainerProps> {
    containerFunctions: CheckoutDeliveryOptionContainerFunctions = {
        onOptionClick: this.onOptionClick.bind(this),
    };

    containerProps(): Pick<CheckoutDeliveryOptionComponentProps, CheckoutDeliveryOptionContainerPropsKeys> {
        const {
            isSelected,
            getCartShippingItemPrice,
            getCartShippingItemSubPrice,
            option,
            totals: {
                prices: {
                    quote_currency_code = null,
                } = {},
            },
        } = this.props;

        return {
            isSelected,
            option,
            optionPrice: getCartShippingItemPrice(option),
            optionSubPrice: getCartShippingItemSubPrice(option),
            currency: quote_currency_code || 'USD',
        };
    }

    onOptionClick(): void {
        const {
            updateCheckoutStore,
            option,
            option: { method_code, available },
            isPickInStoreMethodSelected,
        } = this.props;

        if (!available) {
            return;
        }

        if (method_code === StoreInPickUpCode.METHOD_CODE) {
            updateCheckoutStore({ isPickInStoreMethodSelected: !isPickInStoreMethodSelected });

            return;
        }

        updateCheckoutStore({ selectedShippingMethod: option });
    }

    render(): ReactElement {
        return (
            <CheckoutDeliveryOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionContainer);

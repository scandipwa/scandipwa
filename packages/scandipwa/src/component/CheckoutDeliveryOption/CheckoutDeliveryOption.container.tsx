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
import { connect } from 'react-redux';

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
    CheckoutDeliveryOptionContainerPropsKeys
} from './CheckoutDeliveryOption.type';

/** @namespace Component/CheckoutDeliveryOption/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutDeliveryOptionContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    getCartShippingItemPrice: getCartShippingItemPrice(state),
    getCartShippingItemSubPrice: getCartShippingItemSubPrice(state)
});

/** @namespace Component/CheckoutDeliveryOption/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CheckoutDeliveryOptionContainerMapDispatchProps => ({});

/** @namespace Component/CheckoutDeliveryOption/Container */
export class CheckoutDeliveryOptionContainer extends PureComponent<CheckoutDeliveryOptionContainerProps> {
    containerFunctions: CheckoutDeliveryOptionContainerFunctions = {
        onOptionClick: this.onOptionClick.bind(this)
    };

    containerProps(): Pick<CheckoutDeliveryOptionComponentProps, CheckoutDeliveryOptionContainerPropsKeys> {
        const {
            isSelected,
            getCartShippingItemPrice,
            getCartShippingItemSubPrice,
            option,
            totals: {
                quote_currency_code
            }
        } = this.props;

        return {
            isSelected,
            option,
            optionPrice: getCartShippingItemPrice(option),
            optionSubPrice: getCartShippingItemSubPrice(option),
            currency: quote_currency_code || 'USD'
        };
    }

    onOptionClick(): void {
        const { onClick, option } = this.props;

        if (!option.available) {
            return;
        }

        onClick(option);
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

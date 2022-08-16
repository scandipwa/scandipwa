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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ShippingMethodType } from 'Type/Checkout.type';
import { TotalsType } from 'Type/MiniCart.type';
import { getCartShippingItemPrice, getCartShippingItemSubPrice } from 'Util/Cart';

import CheckoutDeliveryOption from './CheckoutDeliveryOption.component';

/** @namespace Component/CheckoutDeliveryOption/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    getCartShippingItemPrice: getCartShippingItemPrice(state),
    getCartShippingItemSubPrice: getCartShippingItemSubPrice(state)
});

/** @namespace Component/CheckoutDeliveryOption/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CheckoutDeliveryOption/Container */
export class CheckoutDeliveryOptionContainer extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        getCartShippingItemPrice: PropTypes.func.isRequired,
        getCartShippingItemSubPrice: PropTypes.func.isRequired,
        option: ShippingMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired
    };

    containerFunctions = {
        onOptionClick: this.onOptionClick.bind(this)
    };

    containerProps() {
        const {
            isSelected,
            getCartShippingItemPrice,
            getCartShippingItemSubPrice,
            option = {},
            errorMessage,
            totals: {
                prices: {
                    quote_currency_code = null
                } = {}
            }
        } = this.props;

        return {
            isSelected,
            option,
            errorMessage,
            optionPrice: getCartShippingItemPrice(option),
            optionSubPrice: getCartShippingItemSubPrice(option),
            currency: quote_currency_code
        };
    }

    onOptionClick() {
        const { onClick, option = {} } = this.props;

        if (!option.available) {
            return;
        }

        onClick(option);
    }

    render() {
        return (
            <CheckoutDeliveryOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionContainer);

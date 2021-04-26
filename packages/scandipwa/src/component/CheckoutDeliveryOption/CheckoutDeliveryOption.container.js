/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { shippingMethodType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
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
        option: shippingMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired
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
            totals: {
                quote_currency_code
            }
        } = this.props;

        return {
            isSelected,
            option,
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

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
        getCartShippingItemPrice: PropTypes.func.isRequired,
        getCartShippingItemSubPrice: PropTypes.func.isRequired,
        option: shippingMethodType.isRequired
    };

    containerProps() {
        const {
            getCartShippingItemPrice,
            getCartShippingItemSubPrice,
            option = {}
        } = this.props;

        return {
            optionPrice: getCartShippingItemPrice(option),
            optionSubPrice: getCartShippingItemSubPrice(option)
        };
    }

    render() {
        return (
            <CheckoutDeliveryOption
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOption);

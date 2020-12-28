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

import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { TotalsType } from 'Type/MiniCart';
import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartSubtotal,
    getCartSubtotalSubPrice,
    getCartTotalSubPrice
} from 'Util/Cart';

import CheckoutOrderSummary from './CheckoutOrderSummary.component';

/** @namespace Component/CheckoutOrderSummary/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    cartSubtotal: getCartSubtotal(state),
    cartSubtotalSubPrice: getCartSubtotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state),
    cartTotalSubPrice: getCartTotalSubPrice(state)
});

/** @namespace Component/CheckoutOrderSummary/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export class CheckoutOrderSummaryContainer extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        paymentTotals: TotalsType,
        checkoutStep: PropTypes.string.isRequired
    };

    static defaultProps = {
        totals: {},
        paymentTotals: {}
    };

    containerProps() {
        return {
            cartTotalPrice: this.getOrderTotal()
        };
    }

    getOrderTotal() {
        const {
            totals: {
                subtotal_with_discount,
                tax_amount,
                grand_total
            },
            paymentTotals: {
                grand_total: payment_grand_total
            },
            checkoutStep
        } = this.props;

        if (checkoutStep !== SHIPPING_STEP) {
            return payment_grand_total || grand_total;
        }

        return subtotal_with_discount + tax_amount;
    }

    render() {
        return (
            <CheckoutOrderSummary
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrderSummary);

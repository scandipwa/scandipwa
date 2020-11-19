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

import CartItemPrice from './CartItemPrice.component';
import {
    DISPLAY_CART_TAX_IN_PRICE_BOTH,
    DISPLAY_CART_TAX_IN_PRICE_EXL_TAX
} from './CartItemPrice.config';

/** @namespace Component/CartItemPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => {
    const {
        CartReducer: {
            cartTotals: {
                cart_display_config: {
                    display_tax_in_price
                } = {}
            }
        }
    } = state;

    return {
        displayTaxInPrice: display_tax_in_price
    };
};

/** @namespace Component/CartItemPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CartItemPrice/Container */
export class CartItemPriceContainer extends PureComponent {
    static propTypes = {
        displayTaxInPrice: PropTypes.string.isRequired,
        row_total: PropTypes.number.isRequired,
        row_total_incl_tax: PropTypes.number.isRequired
    };

    containerProps = () => ({
        price: this.getPrice(),
        subPrice: this.getSubPrice()
    });

    getPrice() {
        const {
            row_total,
            row_total_incl_tax,
            displayTaxInPrice
        } = this.props;

        if (displayTaxInPrice === DISPLAY_CART_TAX_IN_PRICE_EXL_TAX) {
            return row_total;
        }

        return row_total_incl_tax;
    }

    getSubPrice() {
        const {
            row_total,
            displayTaxInPrice
        } = this.props;

        if (displayTaxInPrice === DISPLAY_CART_TAX_IN_PRICE_BOTH) {
            return row_total;
        }

        return null;
    }

    render() {
        return <CartItemPrice { ...this.props } { ...this.containerProps() } />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemPriceContainer);

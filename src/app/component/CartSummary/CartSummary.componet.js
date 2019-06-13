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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'Util/Price';
import { TotalsType } from 'Type/MiniCart';
import './CartSummary.style';

/**
 * Summary block with totals
 * @class CartSummary
 */
class CartSummary extends Component {
    renderPriceLine(price, name, mods) {
        const { totals: { base_currency_code } } = this.props;
        const priceString = formatCurrency(price ? parseFloat(price).toFixed(2) : 0, base_currency_code);

        return (
            <li block="CartSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CartSummary" elem="Text" mods={ { align: 'left' } }>{ name }</strong>
                <strong block="CartSummary" elem="Text" mods={ { align: 'right' } }>{ priceString }</strong>
            </li>
        );
    }

    render() {
        const {
            totals: {
                subtotal, tax_amount, grand_total, shipping_amount, items
            }
        } = this.props;
        const cartIsEmpty = !Object.keys(items).length;

        // eslint-disable-next-line no-param-reassign, no-return-assign
        const itemsTax = items ? items.reduce((sum, { tax_amount }) => sum += tax_amount, tax_amount) : 0;

        return (
            <div block="CartSummary" aria-label="Cart Summary">
                <h3>{ __('Summary') }</h3>
                <ul>
                    { this.renderPriceLine(subtotal, __('Subtotal')) }
                    { this.renderPriceLine(itemsTax, __('Tax'), { divider: true }) }
                    { shipping_amount && this.renderPriceLine(shipping_amount, __('Shipping'), { divider: true }) }
                    { this.renderPriceLine(grand_total, __('Order Total')) }
                </ul>
                <Link to="/checkout/shipping" disabled={ cartIsEmpty }>{ __('Proceed to checkout') }</Link>
                <Link to="/">{ __('Continue shopping') }</Link>
            </div>
        );
    }
}

CartSummary.propTypes = {
    totals: TotalsType
};

CartSummary.defaultProps = {
    totals: {}
};

export default CartSummary;

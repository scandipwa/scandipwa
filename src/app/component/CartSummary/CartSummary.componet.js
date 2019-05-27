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
import TextPlaceholder from 'Component/TextPlaceholder';
import { TotalsType } from 'Type/MiniCart';
import './CartSummary.style';

/**
 * Summary block with totals
 * @class CartSummary
 */
class CartSummary extends Component {
    renderPriceLine(price, name, mods) {
        return (
            <li block="CartSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CartSummary" elem="Text" mods={ { align: 'left' } }>{ name }</strong>
                <strong block="CartSummary" elem="Text" mods={ { align: 'right' } }>
                    {/* TODO: Use value from configuration file */}
                    { `$ ${ price || 0 }` }
                </strong>
            </li>
        );
    }

    render() {
        const {
            totals: { subtotal, tax_amount, grand_total }
        } = this.props;

        return (
            <div block="CartSummary" aria-label="Cart Summary">
                <h3>Summary</h3>
                <ul>
                    { this.renderPriceLine(subtotal, 'Subtotal') }
                    { this.renderPriceLine(tax_amount, 'Tax', { divider: true }) }
                    { this.renderPriceLine(grand_total, 'Order Total') }
                </ul>
                <Link to="/checkout/shipping">Proceed to checkout</Link>
                <Link to="/">Continue shopping</Link>
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

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
import PropTypes from 'prop-types';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import TextPlaceholder from 'Component/TextPlaceholder';
import CartItem from 'Component/CartItem';
import './CheckoutOrderSummary.style';

/**
 *
 */
class CheckoutOrderSummary extends Component {
    /**
     * Render price line
     */
    renderPriceLine(price, name, mods) {
        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">{ name }</strong>
                <strong block="CheckoutOrderSummary" elem="Text">
                    {/* TODO: Use value from configuration file */ }
                    $
                    <TextPlaceholder content={ price } />
                </strong>
            </li>
        );
    }

    /**
     * Render order summury cart item
     * @param key
     * @param item
     * @returns {*}
     */
    renderItem(key, item) {
        return (
            <CartItem key={ key } product={ item } />
        );
    }

    /**
     * Render checkout order summary block
     * @returns {*}
     */
    render() {
        const {
            totals: { grandTotalPrice },
            products,
            shippingMethod: { price_incl_tax: price, carrier_title: title }
        } = this.props;

        const productCount = Object.keys(products).length;

        // calculate grand totals including shipping price
        const grandTotalWithShipping = (price) ? parseFloat(grandTotalPrice) + parseFloat(price) : grandTotalPrice;

        return (
            <article block="CheckoutOrderSummary" aria-label="Order Summary">
                <h3
                  block="CheckoutOrderSummary"
                  elem="Header"
                  mix={ { block: 'CheckoutPage', elem: 'Heading', mods: { hasDivider: true } } }
                >
                    <span>Order Summary</span>
                    <p block="CheckoutOrderSummary" elem="ItemsInCart">{ `${ productCount } Items In Cart` }</p>
                </h3>
                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products)
                            .map(key => this.renderItem(key, products[key])) }
                    </ul>
                </div>
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <ul>
                        { title && this.renderPriceLine(String(price), `Shipping (${ title })`, { divider: true }) }
                        { this.renderPriceLine(String(grandTotalWithShipping), 'Order Total') }
                    </ul>
                </div>
            </article>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType,
    products: PropTypes.objectOf(ProductType),
    shippingMethod: PropTypes.shape({
        price: PropTypes.number,
        title: PropTypes.string
    })
};

CheckoutOrderSummary.defaultProps = {
    totals: {},
    products: {},
    shippingMethod: {}
};

export default CheckoutOrderSummary;

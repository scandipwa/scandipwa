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
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
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
        const {
            thumbnail,
            manufacturer,
            name,
            quantity,
            price
        } = item;
        return (
            <li key={ key } block="CheckoutOrderSummary" elem="CartItem">
                <div
                  block="CheckoutOrderSummary"
                  elem="Thumbnail"
                  aria-label="Cart Thumbnail"
                >
                    <Image src={ `/media/catalog/product${ thumbnail }` } alt="Cart Thumbnail" />
                </div>

                <div block="CheckoutOrderSummary" elem="Title">
                    { manufacturer && <span>{ manufacturer }</span> }
                    <p>{ name }</p>
                    <p>{`Qty: ${ quantity }`}</p>
                </div>

                <div
                  block="CheckoutOrderSummary"
                  elem="Details"
                >
                    <div block="CheckoutOrderSummary" elem="Price">
                        <ProductPrice price={ price } mods={ { type: 'regular' } } />
                    </div>
                </div>
            </li>
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
            shippingMethod: { price, title }
        } = this.props;

        // calculate grand totals including shipping price
        const grandTotalWithShipping = (price) ? parseFloat(grandTotalPrice) + parseFloat(price) : grandTotalPrice;

        return (
            <div block="CheckoutOrderSummary" aria-label="Order Summary">
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <h3>Order Summary</h3>
                    <ul>
                        { this.renderPriceLine(grandTotalPrice, 'Cart Subtotal') }
                        { price && this.renderPriceLine(String(price), `Shipping (${ title })`, { divider: true }) }
                        { this.renderPriceLine(String(grandTotalWithShipping), 'Order Total') }
                    </ul>
                </div>

                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <h3>{ `${ Object.keys(products).length } Items In Cart` }</h3>
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products).map(key => this.renderItem(key, products[key])) }
                    </ul>
                </div>
            </div>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType,
    products: PropTypes.objectOf(ProductType),
    shippingMethod: PropTypes.object
};

CheckoutOrderSummary.defaultProps = {
    totals: {},
    products: {},
    shippingMethod: {}
};

export default CheckoutOrderSummary;

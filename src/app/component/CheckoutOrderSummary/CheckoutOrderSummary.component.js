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
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import './CheckoutOrderSummary.style';
import PropTypes from "prop-types";

/**
 *
 */
class CheckoutOrderSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isItemListOpen: false,
        }
    }

    /**
     * Render price line
     */
    renderPriceLine(price, name, mods) {
        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text" mods={ { align: 'left' } }>{ name }</strong>
                <strong block="CheckoutOrderSummary" elem="Text" mods={ { align: 'right' } }>
                    {/* TODO: Use value from configuration file */ }
                    $
                    <TextPlaceholder content={ price }/>
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
            <li key={ key } block="CheckoutOrderSummary" elem="CartItem">
                <div
                    block="CheckoutOrderSummary"
                    elem="Thumbnail"
                    aria-label="Cart Thumbnail"
                >
                    <Image src={ `/media/catalog/product${ item.thumbnail }` } alt="Cart Thumbnail"/>
                </div>

                <div block="CheckoutOrderSummary" elem="Title">
                    { item.manufacturer && <span>{ item.manufacturer }</span> }
                    <p><TextPlaceholder content={ item.name }/></p>
                    <p><TextPlaceholder content={ `Qty: ${ item.quantity }` }/></p>
                </div>

                <div
                    block="CheckoutOrderSummary"
                    elem="Details"
                >
                    <div block="CheckoutOrderSummary" elem="Price">
                        <ProductPrice price={ item.price } mods={ { type: 'regular' } }/>
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
        const { isItemListOpen } = this.state;
        const {
            totals: { grandTotalPrice },
            products,
            shippingMethod,
        } = this.props;

        // calculate grand totals including shipping price
        const grandTotalWithShipping = (shippingMethod.price) ? parseFloat(grandTotalPrice) + parseFloat(shippingMethod.price) : grandTotalPrice;

        return (
            <div block="CheckoutOrderSummary" aria-label="Order Summary">
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <h3>Order Summary</h3>
                    <ul>
                        { this.renderPriceLine(grandTotalPrice, 'Cart Subtotal') }
                        { shippingMethod.price && this.renderPriceLine(String(shippingMethod.price), `Shipping (${ shippingMethod.title })`, { divider: true }) }
                        { this.renderPriceLine(String(grandTotalWithShipping), 'Order Total') }
                    </ul>
                </div>

                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <h3 onClick={ () => this.setState({ isItemListOpen: !isItemListOpen }) }>{ `${ Object.keys(products).length } Items In Cart` }</h3>
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products).map(key => {
                            return this.renderItem(key, products[key]);
                        }) }
                    </ul>
                </div>
            </div>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType,
    products: PropTypes.objectOf(ProductType),
    shippingMethod: PropTypes.object,
};

CheckoutOrderSummary.defaultProps = {
    totals: {},
    products: {},
    shippingMethod: {}
};

export default CheckoutOrderSummary;

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
import Html from 'Component/Html';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import { formatCurrency } from 'Util/Price';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import './CheckoutOrderSummary.style';

/**
 *
 */
class CheckoutOrderSummary extends Component {
    getDataSource(item) {
        const { configurableVariantIndex, variants } = item;

        if (typeof configurableVariantIndex === 'number' && variants) {
            return variants[configurableVariantIndex] || {};
        }

        return item;
    }

    /**
     * Render price line
     */
    renderPriceLine(price, name, mods) {
        if (!price) return null;

        const { totals: { base_currency_code } } = this.props;
        const priceString = formatCurrency(parseFloat(price).toFixed(2), base_currency_code);

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">{ name }</strong>
                <strong block="CheckoutOrderSummary" elem="Text">{ priceString }</strong>
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
            thumbnail: { path } = {},
            short_description: { html } = {},
            manufacturer,
            name,
            quantity,
            price
        } = this.getDataSource(item);

        return (
            <li key={ key } block="CheckoutOrderSummary" elem="CartItem">
                <div
                  block="CheckoutOrderSummary"
                  elem="Thumbnail"
                >
                    <Image src={ `/media/catalog/product${ path }` } alt={ __('Cart Thumbnail') } />
                </div>

                <div block="CheckoutOrderSummary" elem="Title">
                    { manufacturer && <span>{ manufacturer }</span> }
                    <p><strong>{ name }</strong></p>
                    <div block="CheckoutOrderSummary" elem="CartItemDescription">
                        <Html content={ html } />
                    </div>
                </div>

                <div
                  block="CheckoutOrderSummary"
                  elem="Details"
                >
                    <div block="CheckoutOrderSummary" elem="Price">
                        <ProductPrice price={ price } mods={ { type: 'regular' } } />
                    </div>
                    <p block="CheckoutOrderSummary" elem="Qty">
                        <strong>{ __('Qty:') }</strong>
                        <span>{ quantity }</span>
                    </p>
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
            totals: {
                grand_total, subtotal, tax_amount, items, shipping_amount
            },
            products
        } = this.props;

        // eslint-disable-next-line no-param-reassign, no-return-assign
        const itemsTax = items ? items.reduce((sum, { tax_amount }) => sum += tax_amount, tax_amount) : 0;

        const productCount = Object.keys(products).length;

        return (
            <div block="CheckoutOrderSummary" aria-label="Order Summary">
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <h3>{ __('Order Summary') }</h3>
                    <ul>
                        { this.renderPriceLine(subtotal, __('Cart Subtotal')) }
                        { this.renderPriceLine(itemsTax, __('Tax')) }
                        { this.renderPriceLine(shipping_amount, __('Shipping'), { divider: true }) }
                        { this.renderPriceLine(grand_total, __('Order Total')) }
                    </ul>
                </div>

                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <h3>{ __('%s Items In Cart', productCount) }</h3>
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products)
                            .map(key => this.renderItem(key, products[key])) }
                    </ul>
                </div>
            </div>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType,
    products: PropTypes.objectOf(ProductType)
};

CheckoutOrderSummary.defaultProps = {
    totals: {},
    products: {}
};

export default CheckoutOrderSummary;

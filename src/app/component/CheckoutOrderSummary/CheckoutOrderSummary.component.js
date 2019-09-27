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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import CartItem from 'Component/CartItem';
import { formatCurrency } from 'Util/Price';
import './CheckoutOrderSummary.style';

/**
 *
 */
export default class CheckoutOrderSummary extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        products: PropTypes.objectOf(ProductType)
    };

    static defaultProps = {
        totals: {},
        products: {}
    };

    renderPriceLine(price, name, mods) {
        if (!price) return null;

        const { totals: { base_currency_code } } = this.props;
        const priceString = formatCurrency(base_currency_code);

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">
                    { name }
                </strong>
                <strong block="CheckoutOrderSummary" elem="Text">
                    { `${parseFloat(price).toFixed(2)}${priceString}` }
                </strong>
            </li>
        );
    }

    /**
     * Render order summary cart item
     * @param key
     * @param item
     * @returns {*}
     */
    renderItem(key, item) {
        return (
            <CartItem key={ key } item={ item } />
        );
    }

    renderDiscountLine() {
        const {
            totals: {
                discount_amount,
                coupon_code
            }
        } = this.props;

        if (!coupon_code) return null;

        return this.renderPriceLine(-Math.abs(discount_amount), __('Coupon %s:', coupon_code.toUpperCase()));
    }

    /**
     * Render checkout order summary block
     * @returns {*}
     */
    render() {
        const {
            totals: {
                grand_total, subtotal,
                tax_amount, shipping_amount,
                items_qty
            },
            products
        } = this.props;

        return (
            <article block="CheckoutOrderSummary" aria-label="Order Summary">
                <h3
                  block="CheckoutOrderSummary"
                  elem="Header"
                  mix={ { block: 'CheckoutPage', elem: 'Heading', mods: { hasDivider: true } } }
                >
                    <span>{ __('Order Summary') }</span>
                    <p block="CheckoutOrderSummary" elem="ItemsInCart">{ __('%s Items In Cart', items_qty) }</p>
                </h3>
                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { Object.keys(products)
                            .map(key => this.renderItem(key, products[key])) }
                    </ul>
                </div>
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <ul>
                        { this.renderPriceLine(shipping_amount, __('Shipping'), { divider: true }) }
                        { this.renderPriceLine(subtotal, __('Cart Subtotal')) }
                        { this.renderDiscountLine() }
                        { this.renderPriceLine(tax_amount, __('Tax')) }
                        { this.renderPriceLine(grand_total, __('Order Total')) }
                    </ul>
                </div>
            </article>
        );
    }
}

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

import CartItem from 'Component/CartItem';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

import './CheckoutOrderSummary.style';

/**
 * Checkout Order Summary component
 * @namespace Component/CheckoutOrderSummary/Component
 */
export class CheckoutOrderSummary extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        checkoutStep: PropTypes.string.isRequired
    };

    static defaultProps = {
        totals: {}
    };

    renderPriceLine(price, name, mods) {
        if (!price) {
            return null;
        }

        const { totals: { quote_currency_code } } = this.props;
        const priceString = formatPrice(price, quote_currency_code);

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">
                    { name }
                </strong>
                <strong block="CheckoutOrderSummary" elem="Text">
                    { `${priceString}` }
                </strong>
            </li>
        );
    }

    renderItem = (item) => {
        const {
            totals: {
                quote_currency_code
            }
        } = this.props;

        const { item_id } = item;

        return (
            <CartItem
              key={ item_id }
              item={ item }
              currency_code={ quote_currency_code }
            />
        );
    };

    renderDiscount() {
        const {
            totals: {
                applied_rule_ids,
                discount_amount,
                coupon_code
            }
        } = this.props;

        if (!applied_rule_ids) {
            return null;
        }

        if (!coupon_code) {
            return this.renderPriceLine(
                -Math.abs(discount_amount),
                __('Discount %s:', '')
            );
        }

        return this.renderPriceLine(
            -Math.abs(discount_amount),
            __('Discount/Coupon %s:', coupon_code.toUpperCase())
        );
    }

    renderItems() {
        const { totals: { items = [] } } = this.props;

        return (
            <div block="CheckoutOrderSummary" elem="OrderItems">
                <ul block="CheckoutOrderSummary" elem="CartItemList">
                    { items.map(this.renderItem) }
                </ul>
            </div>
        );
    }

    renderHeading() {
        const { totals: { items_qty } } = this.props;

        return (
            <h3
              block="CheckoutOrderSummary"
              elem="Header"
              mix={ { block: 'CheckoutPage', elem: 'Heading', mods: { hasDivider: true } } }
            >
                <span>{ __('Order Summary') }</span>
                <p block="CheckoutOrderSummary" elem="ItemsInCart">{ __('%s Item(s) In Cart', items_qty) }</p>
            </h3>
        );
    }

    renderTotals() {
        const {
            totals: {
                subtotal,
                subtotal_with_discount,
                tax_amount,
                grand_total,
                shipping_amount
            },
            checkoutStep
        } = this.props;

        return (
            <div block="CheckoutOrderSummary" elem="OrderTotals">
                <ul>
                    { this.renderPriceLine(subtotal, __('Cart Subtotal')) }
                    { checkoutStep !== SHIPPING_STEP
                        ? this.renderPriceLine(shipping_amount, __('Shipping'), { divider: true })
                        : null }
                    { this.renderDiscount() }
                    { this.renderPriceLine(tax_amount, __('Tax')) }
                    { checkoutStep !== SHIPPING_STEP
                        ? this.renderPriceLine(grand_total, __('Order total'))
                        : this.renderPriceLine(subtotal_with_discount + tax_amount, __('Order total')) }

                </ul>
            </div>
        );
    }

    render() {
        return (
            <article block="CheckoutOrderSummary" aria-label="Order Summary">
                { this.renderHeading() }
                { this.renderItems() }
                { this.renderTotals() }
            </article>
        );
    }
}

export default CheckoutOrderSummary;

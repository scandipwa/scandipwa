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

import CartCoupon from 'Component/CartCoupon';
import CartItem from 'Component/CartItem';
import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import ExpandableContent from 'Component/ExpandableContent';
import {
    DISPLAY_CART_TAX_IN_SHIPPING_BOTH,
    DISPLAY_CART_TAX_IN_SHIPPING_INCL_TAX,
    DISPLAY_CART_TAX_IN_SUBTOTAL_BOTH,
    DISPLAY_CART_TAX_IN_SUBTOTAL_INCL_TAX
} from 'Route/CartPage/CartPage.config';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { TotalsType } from 'Type/MiniCart';

import './CheckoutOrderSummary.style';

/**
 * Checkout Order Summary component
 * @namespace Component/CheckoutOrderSummary/Component
 */
export class CheckoutOrderSummary extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        paymentTotals: TotalsType,
        checkoutStep: PropTypes.string.isRequired,
        couponCode: PropTypes.string,
        renderCmsBlock: PropTypes.func,
        isExpandable: PropTypes.bool
    };

    static defaultProps = {
        totals: {},
        paymentTotals: {},
        couponCode: '',
        renderCmsBlock: () => {},
        isExpandable: false
    };

    renderPriceLine(price, title, mods) {
        if (!price) {
            return null;
        }

        const { totals: { quote_currency_code } } = this.props;

        return (
            <CheckoutOrderSummaryPriceLine
              price={ price }
              currency={ quote_currency_code }
              title={ title }
              mods={ mods }
            />
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

    renderSubTotal() {
        const {
            totals: {
                subtotal,
                subtotal_incl_tax,
                quote_currency_code,
                cart_display_config: {
                    display_tax_in_subtotal
                } = {}
            }
        } = this.props;
        const title = __('Cart Subtotal');

        if (display_tax_in_subtotal === DISPLAY_CART_TAX_IN_SUBTOTAL_BOTH) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ subtotal_incl_tax }
                  currency={ quote_currency_code }
                  title={ title }
                  subPrice={ subtotal }
                />
            );
        }

        if (display_tax_in_subtotal === DISPLAY_CART_TAX_IN_SUBTOTAL_INCL_TAX) {
            return this.renderPriceLine(subtotal_incl_tax, title);
        }

        return this.renderPriceLine(subtotal, title);
    }

    renderShipping() {
        const {
            totals: {
                shipping_amount,
                shipping_incl_tax,
                quote_currency_code,
                cart_display_config: {
                    display_tax_in_shipping_amount
                } = {}
            },
            checkoutStep
        } = this.props;
        const title = __('Shipping');
        const mods = { divider: true };

        if (checkoutStep === SHIPPING_STEP) {
            return null;
        }

        if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING_BOTH) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ shipping_incl_tax }
                  currency={ quote_currency_code }
                  title={ title }
                  mods={ mods }
                  subPrice={ shipping_amount }
                />
            );
        }

        if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING_INCL_TAX) {
            return this.renderPriceLine(shipping_incl_tax, title, mods);
        }

        return this.renderPriceLine(shipping_amount, title, mods);
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

    renderOrderTotal() {
        const {
            totals: {
                tax_amount,
                quote_currency_code,
                cart_display_config: {
                    include_tax_in_order_total
                } = {}
            }
        } = this.props;
        const title = __('Order total');
        const orderTotal = this.getOrderTotal();

        if (include_tax_in_order_total) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ orderTotal }
                  currency={ quote_currency_code }
                  title={ title }
                  subPrice={ orderTotal - tax_amount }
                />
            );
        }

        return this.renderPriceLine(orderTotal, title);
    }

    renderTaxFullSummary() {
        const {
            totals: {
                cart_display_config: {
                    display_full_tax_summary
                } = {},
                applied_taxes
            }
        } = this.props;

        if (!display_full_tax_summary || !applied_taxes.length) {
            return null;
        }

        return applied_taxes
            .flatMap(({ rates }) => rates)
            .map(({ percent, title }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div block="CheckoutOrderSummary" elem="AppendedContent" key={ i }>
                    { `${title} (${percent}%)` }
                </div>
            ));
    }

    renderTax() {
        const {
            totals: {
                tax_amount = 0,
                quote_currency_code,
                cart_display_config: {
                    display_full_tax_summary,
                    display_zero_tax_subtotal
                } = {}
            }
        } = this.props;

        if (!tax_amount && !display_zero_tax_subtotal) {
            return null;
        }

        return (
            <CheckoutOrderSummaryPriceLine
              price={ tax_amount }
              currency={ quote_currency_code }
              title={ __('Tax') }
              mods={ { withAppendedContent: display_full_tax_summary } }
            >
                { this.renderTaxFullSummary() }
            </CheckoutOrderSummaryPriceLine>
        );
    }

    renderTotals() {
        return (
            <div block="CheckoutOrderSummary" elem="OrderTotals">
                <ul>
                    { this.renderSubTotal() }
                    { this.renderShipping() }
                    { this.renderDiscount() }
                    { this.renderTax() }
                    { this.renderOrderTotal() }
                </ul>
            </div>
        );
    }

    renderCoupon() {
        const { couponCode } = this.props;

        return (
            <CartCoupon
              couponCode={ couponCode }
              mix={ { block: 'CheckoutOrderSummary', elem: 'Coupon' } }
              title={ __('Have a discount code?') }
            />
        );
    }

    renderCmsBlock() {
        const { renderCmsBlock } = this.props;

        return (
            <div
              block="CheckoutOrderSummary"
              elem="CmsBlock"
            >
                { renderCmsBlock() }
            </div>
        );
    }

    renderExpandableContent() {
        return (
            <ExpandableContent
              heading={ __('Order summary') }
              mix={ { block: 'CheckoutOrderSummary', elem: 'ExpandableContent' } }
            >
                { this.renderItems() }
                { this.renderCmsBlock() }
                { this.renderCoupon() }
                { this.renderTotals() }
            </ExpandableContent>
        );
    }

    renderContent() {
        const { isExpandable } = this.props;

        if (isExpandable) {
            return this.renderExpandableContent();
        }

        return (
            <>
                { this.renderHeading() }
                { this.renderItems() }
                { this.renderTotals() }
            </>
        );
    }

    render() {
        return (
            <article block="CheckoutOrderSummary" aria-label="Order Summary">
                { this.renderContent() }
            </article>
        );
    }
}

export default CheckoutOrderSummary;

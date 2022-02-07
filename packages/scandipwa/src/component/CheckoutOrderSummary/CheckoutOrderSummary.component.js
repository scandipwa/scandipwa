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
import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import ExpandableContent from 'Component/ExpandableContent';
import { BILLING_STEP } from 'Route/Checkout/Checkout.config';
import { CheckoutStepType } from 'Type/Checkout.type';
import { ChildrenType } from 'Type/Common.type';
import { CartConfigType } from 'Type/Config.type';
import { TotalsType } from 'Type/MiniCart.type';
import { getItemsCountLabel } from 'Util/Cart';
import { noopFn } from 'Util/Common';

import './CheckoutOrderSummary.style';

/**
 * Checkout Order Summary component
 * @namespace Component/CheckoutOrderSummary/Component
 */
export class CheckoutOrderSummary extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        checkoutStep: CheckoutStepType,
        renderCmsBlock: PropTypes.func,
        isExpandable: PropTypes.bool,
        cartDisplayConfig: CartConfigType.isRequired,
        cartTotalSubPrice: PropTypes.number,
        showItems: PropTypes.bool,
        children: ChildrenType
    };

    static defaultProps = {
        totals: {},
        renderCmsBlock: noopFn,
        isExpandable: false,
        cartTotalSubPrice: null,
        showItems: true,
        children: [],
        checkoutStep: null
    };

    renderPriceLine(price, title, mods) {
        if (!price) {
            return null;
        }

        const { totals: { prices: { currency } = {} } = {} } = this.props;

        return (
            <CheckoutOrderSummaryPriceLine
              price={ price }
              currency={ currency }
              title={ title }
              mods={ mods }
            />
        );
    }

    renderItem(item) {
        const { totals: { prices: { currency } = {} } = {} } = this.props;

        const { item_id } = item;

        return (
            <CartItem
              key={ item_id }
              item={ item }
              currency_code={ currency }
            />
        );
    }

    renderDiscount() {
        const {
            totals: {
                applied_coupons: appliedCoupons = [],
                prices: {
                    discounts = []
                } = {}
            } = {}
        } = this.props;

        if (!(appliedCoupons && appliedCoupons.length) && !(discounts && discounts.length)) {
            return null;
        }

        const label = appliedCoupons.length ? __('Coupon code discount ') : __('Discount: ');
        const { amount: { value = 0 } = {} } = discounts[0] || {};
        const { code } = appliedCoupons[0] || {};
        const discount = -Math.abs(value);

        return (
            <CheckoutOrderSummaryPriceLine
              price={ discount }
              title={ label }
              coupon_code={ code }
            />
        );
    }

    renderItems() {
        const { showItems, totals: { items_qty, items = [] } } = this.props;

        if (!showItems) {
            return null;
        }

        return (
            <>
            <div block="CheckoutOrderSummary" elem="ItemsInCart">
                { getItemsCountLabel(items_qty) }
            </div>
            <div block="CheckoutOrderSummary" elem="OrderItems">
                <div block="CheckoutOrderSummary" elem="CartItemList">
                    { items.map(this.renderItem.bind(this)) }
                </div>
            </div>
            </>
        );
    }

    renderHeading() {
        return (
            <div
              block="CheckoutOrderSummary"
              elem="Header"
              mix={ { block: 'CheckoutPage', elem: 'Heading', mods: { hasDivider: true } } }
            >
                <h2>{ __('Summary') }</h2>
            </div>
        );
    }

    renderSubTotal() {
        const {
            totals: {
                prices: {
                    currency,
                    subtotal_including_tax: subIncTax = 0,
                    subtotal_excluding_tax: subExclTax = 0
                } = {}
            }
        } = this.props;

        const title = __('Subtotal');

        if (subIncTax) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ subIncTax }
                  currency={ currency }
                  title={ title }
                  subPrice={ subExclTax }
                />
            );
        }

        return this.renderPriceLine(subIncTax, title);
    }

    getShippingLabel() {
        const { checkoutStep } = this.props;

        if (checkoutStep === BILLING_STEP) {
            return __('Shipping');
        }

        return __('Estimated Shipping');
    }

    renderShipping() {
        const {
            totals: {
                prices: {
                    currency
                } = {},
                shipping_addresses: shippingAddresses = []
            } = {}
        } = this.props;
        const title = this.getShippingLabel();
        const mods = { divider: true };

        if (!shippingAddresses.length) {
            return this.renderPriceLine(0, title, mods);
        }

        const {
            selected_shipping_method: {
                amount: {
                    value
                },
                amount_with_tax: {
                    value: valueWithTax
                }
            }
        } = shippingAddresses[0];

        if (!value) {
            return this.renderPriceLine(valueWithTax, title, mods);
        }

        return (
            <CheckoutOrderSummaryPriceLine
              price={ valueWithTax }
              currency={ currency }
              title={ title }
              mods={ mods }
              subPrice={ value }
            />
        );
    }

    renderOrderTotal() {
        const {
            totals: {
                prices: {
                    grand_total = 0,
                    currency
                } = {}
            } = {},
            cartTotalSubPrice
        } = this.props;
        const title = __('Order total');

        if (cartTotalSubPrice) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ grand_total }
                  currency={ currency }
                  title={ title }
                  subPrice={ cartTotalSubPrice }
                  mods={ { isTotal: true } }
                />
            );
        }

        return this.renderPriceLine(grand_total, title, { isTotal: true });
    }

    renderTaxFullSummary() {
        const {
            totals: {
                prices: {
                    applied_taxes = []
                } = {}
            },
            cartDisplayConfig: {
                display_full_tax_summary
            } = {}
        } = this.props;

        if (!display_full_tax_summary || !applied_taxes.length) {
            return null;
        }

        return applied_taxes
            .map(({ label, title, percent }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div block="CheckoutOrderSummary" elem="AppendedContent" key={ i }>
                    { `${title || label} (${percent}%)` }
                </div>
            ));
    }

    renderTax() {
        const {
            totals: {
                prices: {
                    tax_amount = 0,
                    currency
                } = {}
            },
            cartDisplayConfig: {
                display_full_tax_summary,
                display_zero_tax_subtotal
            } = {}
        } = this.props;

        if (!currency || (!tax_amount && !display_zero_tax_subtotal)) {
            return null;
        }

        return (
            <CheckoutOrderSummaryPriceLine
              price={ tax_amount.toFixed(2) } // since we display tax even if value is 0
              currency={ currency }
              title={ __('Tax') }
              mods={ { withAppendedContent: display_full_tax_summary } }
            >
                { this.renderTaxFullSummary() }
            </CheckoutOrderSummaryPriceLine>
        );
    }

    renderTotals() {
        const { children, totals: { items = [] } } = this.props;

        return (
            <div block="CheckoutOrderSummary" elem="OrderTotals">
                <ul>
                    { this.renderSubTotal() }
                    { this.renderTax() }
                    { this.renderDiscount() }
                    { this.renderShipping() }
                    <div block="CheckoutOrderSummary" elem="ButtonWrapper" mods={ { isEmpty: items.length < 1 } }>
                        { this.renderOrderTotal() }
                        { children }
                    </div>
                </ul>
            </div>
        );
    }

    renderCmsBlock() {
        const { renderCmsBlock } = this.props;

        const content = renderCmsBlock();

        if (!content) {
            return null;
        }

        return (
            <div
              block="CheckoutOrderSummary"
              elem="CmsBlock"
            >
                { content }
            </div>
        );
    }

    renderExpandableContent() {
        return (
            <ExpandableContent
              heading={ __('Summary') }
              mix={ { block: 'CheckoutOrderSummary', elem: 'ExpandableContent' } }
            >
                { this.renderItems() }
                { this.renderCmsBlock() }
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

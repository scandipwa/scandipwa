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

import { Component } from 'react';
import Link from 'Component/Link';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import CartItem from 'Component/CartItem';
import CartCoupon from 'Component/CartCoupon';
import { TotalsType } from 'Type/MiniCart';
import isMobile from 'Util/Mobile';
import ExpandableContent from 'Component/ExpandableContent';
import { formatCurrency, roundPrice } from 'Util/Price';
import Meta from 'Component/Meta';

import './CartPage.style';

export default class CartPage extends Component {
    static propTypes = {
        isEditing: PropTypes.bool.isRequired,
        totals: TotalsType.isRequired
    };

    renderCartItems() {
        const { isEditing, totals: { items, base_currency_code } } = this.props;

        if (!items || items.length < 1) {
            return (
                <p block="CartPage" elem="Empty">{ __('There are no products in cart.') }</p>
            );
        }

        return (
            <>
                <p block="CartPage" elem="TableHead" aria-hidden>
                    <span>{ __('item') }</span>
                    <span>{ __('qty') }</span>
                    <span>{ __('subtotal') }</span>
                </p>
                <ul block="CartPage" elem="Items" aria-label="List of items in cart">
                    { items.map(item => (
                        <CartItem
                          key={ item.item_id }
                          item={ item }
                          currency_code={ base_currency_code }
                          isEditing={ !isMobile.any() || isEditing }
                          isLikeTable
                        />
                    )) }
                </ul>
            </>
        );
    }

    renderDiscountCode() {
        const {
            totals: { coupon_code }
        } = this.props;

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    renderPriceLine(price) {
        const { totals: { base_currency_code } } = this.props;
        return `${formatCurrency(base_currency_code)}${roundPrice(price)}`;
    }

    renderTotals() {
        const {
            totals: {
                grand_total = 0,
                subtotal = 0,
                tax_amount = 0,
                items
            }
        } = this.props;

        const props = !items || items.length < 1
            ? {
                onClick: e => e.preventDefault(),
                disabled: true
            }
            : {};

        return (
            <article block="CartPage" elem="Summary">
                <h4 block="CartPage" elem="SummaryHeading">{ __('Summary') }</h4>
                <dl block="CartPage" elem="TotalDetails" aria-label="Order total details">
                    <dt>{ __('Subtotal:') }</dt>
                    <dd>{ this.renderPriceLine(subtotal) }</dd>
                    { this.renderDiscount() }
                    <dt>{ __('Tax:') }</dt>
                    <dd>{ this.renderPriceLine(tax_amount) }</dd>
                </dl>
                <dl block="CartPage" elem="Total" aria-label="Complete order total">
                    <dt>{ __('Order total:') }</dt>
                    <dd>{ this.renderPriceLine(grand_total) }</dd>
                </dl>
                <Link
                  block="CartPage"
                  elem="CheckoutButton"
                  mix={ { block: 'Button' } }
                  to="/checkout"
                  { ...props }
                >
                    <span />
                    { __('Secure checkout') }
                </Link>
                <Link
                  block="CartPage"
                  elem="ContinueShopping"
                  to="/"
                >
                    { __('Continue Shopping') }
                </Link>
            </article>
        );
    }

    renderDiscount() {
        const {
            totals: {
                coupon_code,
                discount_amount = 0
            }
        } = this.props;

        if (!coupon_code) return null;

        return (
            <>
                <dt>
                    { __('Coupon ') }
                    <strong block="CartPage" elem="DiscountCoupon">{ coupon_code.toUpperCase() }</strong>
                </dt>
                <dd>{ `-${this.renderPriceLine(Math.abs(discount_amount))}` }</dd>
            </>
        );
    }

    renderPaymentMethods() {
        return (
            <img
              block="CartPage"
              elem="PaymentMethods"
              src="/media/wysiwyg/etc/payment-methods.jpg"
              alt="Shipping car icon"
            />
        );
    }

    renderPromo() {
        return (
            <figure
              block="CartPage"
              elem="Promo"
            >
                <img
                  block="CartPage"
                  elem="PromoImage"
                  src="/media/wysiwyg/etc/shipping-car.svg"
                  alt="Shipping car icon"
                />
                <figcaption block="CartPage" elem="PromoText">
                    <strong>Free shipping</strong>
                    on orders
                    <strong>49$</strong>
                    and more.
                </figcaption>
            </figure>
        );
    }

    render() {
        return (
            <main block="CartPage" aria-label="Cart Page">
                <Meta metaObject={ { title: 'Cart' } } />
                <ContentWrapper
                  mix={ { block: 'CartPage' } }
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                  label="Cart page details"
                >
                    <div block="CartPage" elem="Static">
                        <h2 block="CartPage" elem="Heading">{ __('Shopping cart') }</h2>
                        { this.renderCartItems() }
                        { this.renderDiscountCode() }
                    </div>
                    <div block="CartPage" elem="Floating">
                        { this.renderPaymentMethods() }
                        { this.renderPromo() }
                        { this.renderTotals() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

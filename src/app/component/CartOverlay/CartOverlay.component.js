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

import Link from 'Component/Link';
import isMobile from 'Util/Mobile';
import Overlay from 'Component/Overlay';
import CartItem from 'Component/CartItem';
import { TotalsType } from 'Type/MiniCart';
import { formatCurrency } from 'Util/Price';
import CmsBlock from 'Component/CmsBlock';

import './CartOverlay.style';

export default class CartOverlay extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        isEditing: PropTypes.bool.isRequired
    };

    renderPriceLine(price) {
        const { totals: { quote_currency_code } } = this.props;
        return `${formatCurrency(quote_currency_code)}${parseFloat(price).toFixed(2)}`;
    }

    renderCartItems() {
        const { isEditing, totals: { items, quote_currency_code } } = this.props;

        if (!items || items.length < 1) return this.renderNoCartItems();

        return (
            <ul block="CartOverlay" elem="Items" aria-label="List of items in cart">
                { items.map(item => (
                    <CartItem
                      key={ item.item_id }
                      item={ item }
                      currency_code={ quote_currency_code }
                      isEditing={ !isMobile.any() || isEditing }
                    />
                )) }
            </ul>
        );
    }

    renderNoCartItems() {
        return (
            <p block="CartOverlay" elem="Empty">
                { __('There are no products in cart.') }
            </p>
        );
    }

    renderTotals() {
        const { totals: { subtotal_incl_tax = 0 } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Total"
            >
                <dt>{ __('Order total:') }</dt>
                <dd>{ this.renderPriceLine(subtotal_incl_tax) }</dd>
            </dl>
        );
    }

    renderTax() {
        const { totals: { tax_amount = 0 } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Tax"
            >
                <dt>{ __('Tax total:') }</dt>
                <dd>{ this.renderPriceLine(tax_amount || 0) }</dd>
            </dl>
        );
    }

    renderDiscount() {
        const { totals: { coupon_code, discount_amount = 0 } } = this.props;

        if (!coupon_code) return null;

        return (
            <dl
              block="CartOverlay"
              elem="Discount"
            >
                <dt>
                    { __('Coupon ') }
                    <strong block="CartOverlay" elem="DiscountCoupon">{ coupon_code.toUpperCase() }</strong>
                </dt>
                <dd>{ `-${this.renderPriceLine(Math.abs(discount_amount))}` }</dd>
            </dl>
        );
    }

    renderActions() {
        const { totals: { items } } = this.props;

        const options = !items || items.length < 1
            ? {
                onClick: e => e.preventDefault(),
                disabled: true
            }
            : {};

        return (
            <div block="CartOverlay" elem="Actions">
                <Link
                  block="CartOverlay"
                  elem="CartButton"
                  mix={ { block: 'Button', mods: { isHollow: true } } }
                  to="/cart"
                >
                    { __('View cart') }
                </Link>
                <Link
                  block="CartOverlay"
                  elem="CheckoutButton"
                  mix={ { block: 'Button' } }
                  to="/checkout"
                  { ...options }
                >
                    <span />
                    { __('Secure checkout') }
                </Link>
            </div>
        );
    }

    renderPromo() {
        const { minicart_content: { minicart_cms } = {} } = window.contentConfiguration;

        if (minicart_cms) {
            return <CmsBlock identifiers={ [minicart_cms] } />;
        }

        return (
            <p
              block="CartOverlay"
              elem="Promo"
            >
                { __('Free shipping on order 49$ and more.') }
            </p>
        );
    }

    render() {
        const { changeHeaderState } = this.props;

        return (
            <Overlay
              id="cart"
              onVisible={ changeHeaderState }
              mix={ { block: 'CartOverlay' } }
            >
                { this.renderPromo() }
                { this.renderCartItems() }
                { this.renderDiscount() }
                { this.renderTax() }
                { this.renderTotals() }
                { this.renderActions() }
            </Overlay>
        );
    }
}

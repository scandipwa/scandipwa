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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'Component/Link';
import isMobile from 'Util/Mobile';
import Overlay from 'Component/Overlay';
import CartItem from 'Component/CartItem';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';

import './CartOverlay.style';

class CartOverlay extends PureComponent {
    static propTypes = {
        products: PropTypes.objectOf(ProductType),
        totals: TotalsType.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        isEditing: PropTypes.bool.isRequired
    }

    static defaultProps = {
        products: {}
    }

    renderCartItems() {
        const { products, isEditing } = this.props;

        if (!Object.keys(products).length) return this.renderNoCartItems();

        return (
            <ul block="CartOverlay" elem="Items" aria-label="List of items in cart">
                { Object.entries(products).map(([id, product]) => (
                    <CartItem key={ id } product={ product } isEditing={ !isMobile.any() || isEditing } />
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
        const { totals: { grand_total } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Total"
            >
                <dt>{ __('Order total:') }</dt>
                <dd>{ `$${grand_total || '0'}` }</dd>
            </dl>
        );
    }

    renderTax() {
        const { totals: { tax_amount } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Tax"
            >
                <dt>{ __('Tax total:') }</dt>
                <dd>{ `$${tax_amount || '0'}` }</dd>
            </dl>
        );
    }

    renderActions() {
        const { products } = this.props;
        const isDisabled = !Object.keys(products).length;
        const options = isDisabled
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
                  mix={ { block: 'Button', mods: { hollow: true } } }
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
        return (
            <p
              block="CartOverlay"
              elem="Promo"
            >
                <strong>Free shipping</strong>
                on orders
                <strong>49$</strong>
                and more.
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
                { this.renderTax() }
                { this.renderTotals() }
                { this.renderActions() }
            </Overlay>
        );
    }
}

export default CartOverlay;

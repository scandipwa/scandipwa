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
import { Link } from 'react-router-dom';

import isMobile from 'Util/Mobile';
import Overlay from 'Component/Overlay';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import CartItem from 'Component/CartItem';
import './CartOverlay.style';

class CartOverlay extends Component {
    renderCartItems() {
        const { products, isEditing } = this.props;

        if (!Object.keys(products).length) {
            return (
                <p block="CartOverlay" elem="Empty">There are no products in cart.</p>
            );
        }

        return (
            <ul block="CartOverlay" elem="Items" aria-label="List of items in cart">
                { Object.entries(products).map(([id, product]) => (
                    <CartItem key={ id } product={ product } isEditing={ !isMobile.any() || isEditing } />
                )) }
            </ul>
        );
    }

    renderTotals() {
        const { totals: { grand_total = 0 } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Total"
            >
                <dt>Order total:</dt>
                <dd>{ `$${grand_total}` }</dd>
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
                <dt>Tax total:</dt>
                <dd>{ `$${tax_amount || 0}` }</dd>
            </dl>
        );
    }

    renderActions() {
        const { products } = this.props;
        const isDisabled = !Object.keys(products).length;
        const disabled = isDisabled
            ? {
                onClick: e => e.preventDefault(),
                disabled: true
            }
            : {};

        return (
            <div block="CartOverlay" elem="Actions">
                <Link
                  className="CartOverlay-CartButton Button Button_hollow"
                  to="/cart"
                >
                    View cart
                </Link>
                <Link
                  className="CartOverlay-CheckoutButton Button"
                  to="/checkout"
                  { ...disabled }
                >
                    <span />
                    Secure checkout
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

CartOverlay.propTypes = {
    products: PropTypes.objectOf(ProductType),
    totals: TotalsType.isRequired,
    changeHeaderState: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
};

CartOverlay.defaultProps = {
    products: {}
};

export default CartOverlay;

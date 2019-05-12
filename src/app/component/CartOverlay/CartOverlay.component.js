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
import { CART, CART_EDITING } from 'Component/Header';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import CartItem from 'Component/CartItem';
import './CartOverlay.style';

class CartOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = { isEditing: false };

        this.changeHeaderState = this.changeHeaderState.bind(this);
    }

    changeHeaderState() {
        const { changeHeaderState, totals: { count } } = this.props;
        const title = `${ count || 0 } Items`;

        changeHeaderState({
            name: CART,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false })
                });
            },
            onCloseClick: () => this.setState({ isEditing: false })
        });
    }

    renderCartItems() {
        const { products } = this.props;
        const { isEditing } = this.state;

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
        const { totals: { grandTotalPrice } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Total"
            >
                <dt>Order total:</dt>
                <dd>{ `$${grandTotalPrice}` }</dd>
            </dl>
        );
    }

    renderTax() {
        const { totals: { taxPrice } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Tax"
            >
                <dt>Tax total:</dt>
                <dd>{ `$${taxPrice}` }</dd>
            </dl>
        );
    }

    renderActions() {
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
                >
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
        return (
            <Overlay
              id="cart"
              onVisible={ this.changeHeaderState }
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
    changeHeaderState: PropTypes.func.isRequired
};

CartOverlay.defaultProps = {
    products: {}
};

export default CartOverlay;

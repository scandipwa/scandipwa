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
import Link from 'Component/Link';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import CartItem from 'Component/CartItem';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import isMobile from 'Util/Mobile';
import ExpandableContent from 'Component/ExpandableContent';

import './CartPage.style';

class CartPage extends Component {
    renderCartItems() {
        const { products, isEditing } = this.props;

        if (!Object.keys(products).length) {
            return (
                <p block="CartPage" elem="Empty">There are no products in cart.</p>
            );
        }

        return (
            <>
                <p block="CartPage" elem="TableHead" aria-hidden>
                    <span>item</span>
                    <span>qty</span>
                    <span>subtotal</span>
                </p>
                <ul block="CartPage" elem="Items" aria-label="List of items in cart">
                    { Object.entries(products).map(([id, product]) => (
                        <CartItem
                          key={ id }
                          product={ product }
                          isEditing={ !isMobile.any() || isEditing }
                          isLikeTable
                        />
                    )) }
                </ul>
            </>
        );
    }

    renderDiscountCode() {
        return (
            <ExpandableContent
              heading="Have a discount code?"
              mix={ { block: 'CartPage', elem: 'Discount' } }
            >
                <p>{ __('Discount functionality coming soon!') }</p>
            </ExpandableContent>
        );
    }

    renderTotals() {
        const {
            products,
            totals: {
                grand_total = 0,
                subtotal = 0,
                tax_amount = 0
            }
        } = this.props;
        const isDisabled = !Object.keys(products).length;
        const options = isDisabled
            ? {
                onClick: e => e.preventDefault(),
                disabled: true
            }
            : {};

        return (
            <article block="CartPage" elem="Summary">
                <h4 block="CartPage" elem="SummaryHeading">Summary</h4>
                <dl block="CartPage" elem="TotalDetails" aria-label="Order total details">
                    <dt>Subtotal:</dt>
                    <dd>{ `$${subtotal}` }</dd>
                    <dt>Tax:</dt>
                    <dd>{ `$${tax_amount || 0}` }</dd>
                </dl>
                <dl block="CartPage" elem="Total" aria-label="Complete order total">
                    <dt>Order total:</dt>
                    <dd>{ `$${grand_total}` }</dd>
                </dl>
                <Link
                  block="CartPage"
                  elem="CheckoutButton"
                  mix={ { block: 'Button' } }
                  to="/checkout"
                  { ...options }
                >
                    <span />
                    Secure checkout
                </Link>
                <Link
                  block="CartPage"
                  elem="ContinueShopping"
                  to="/"
                >
                    Continue Shopping
                </Link>
            </article>
        );
    }

    renderPaymentMethods() {
        return (
            <img
              block="CartPage"
              elem="PaymenyMethods"
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
                <ContentWrapper
                  mix={ { block: 'CartPage' } }
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                  label="Cart page details"
                >
                    <div block="CartPage" elem="Static">
                        <h2 block="CartPage" elem="Heading">Shopping cart</h2>
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

CartPage.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    products: PropTypes.objectOf(ProductType),
    totals: TotalsType.isRequired
};

CartPage.defaultProps = {
    products: {}
};

export default CartPage;

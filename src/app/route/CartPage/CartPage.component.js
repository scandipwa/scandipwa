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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from 'Route';
import ContentWrapper from 'Component/ContentWrapper';
import CartItem from 'Component/CartItem';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import { CART, CART_EDITING } from 'Component/Header';
import isMobile from 'Util/Mobile';
import ExpandableContent from 'Component/ExpandableContent';

import './CartPage.style';

class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = { isEditing: false };

        this.changeHeaderState = this.changeHeaderState.bind(this);
    }

    componentDidMount() {
        this.updateBreadcrumbs();
        this.changeHeaderState();
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            { url: '/cart', name: 'Shopping cart' },
            { url: '/', name: 'Home' }
        ];

        updateBreadcrumbs(breadcrumbs);
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
            onCloseClick: () => {
                this.setState({ isEditing: false });
                history.goBack();
            }
        });
    }

    renderCartItems() {
        const { products } = this.props;
        const { isEditing } = this.state;

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
                <p>Discount functionality coming soon!</p>
            </ExpandableContent>
        );
    }

    renderTotals() {
        const {
            totals: {
                grandTotalPrice,
                subTotalPrice,
                taxPrice
            }
        } = this.props;

        return (
            <article block="CartPage" elem="Summary">
                <h4 block="CartPage" elem="SummaryHeading">Summary</h4>
                <dl block="CartPage" elem="TotalDetails" aria-label="Order total details">
                    <dt>Subtotal:</dt>
                    <dd>{ `$${subTotalPrice}` }</dd>
                    <dt>Tax:</dt>
                    <dd>{ `$${taxPrice}` }</dd>
                </dl>
                <dl block="CartPage" elem="Total" aria-label="Complete order total">
                    <dt>Order total:</dt>
                    <dd>{ `$${grandTotalPrice}` }</dd>
                </dl>
                <Link
                  className="CartPage-CheckoutButton Button"
                  to="/checkout"
                >
                    Secure checkout
                </Link>
                <Link
                  className="CartPage-ContinueShopping"
                  to="/"
                >
                    Continue Shopping
                </Link>
            </article>
        );
    }

    renderPromo() {
        return (
            <p
              block="CartPage"
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
                        { this.renderPromo() }
                        { this.renderTotals() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

CartPage.propTypes = {
    products: PropTypes.objectOf(ProductType),
    totals: TotalsType,
    updateBreadcrumbs: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

CartPage.defaultProps = {
    products: {},
    totals: {}
};

export default CartPage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Overlay from 'Component/Overlay';
import { CART, CART_EDITING } from 'Component/Header';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import CartItem from 'Component/CartItem';
import './CartOverlay.style';
import ExpandableContent from 'Component/ExpandableContent';

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
                    <CartItem key={ id } product={ product } isEditing={ isEditing } />
                )) }
            </ul>
        );
    }

    renderDiscountCode() {
        return (
            <ExpandableContent
              heading="Have a discount code?"
              mix={ { block: 'CartOverlay', elem: 'Discount' } }
            >
                <p>Discount functionality coming soon!</p>
            </ExpandableContent>
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

    renderCheckoutButton() {
        return (
            <Link
              className="CartOverlay-CheckoutButton Button"
              to="/checkout"
            >
                Secure checkout
            </Link>
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
                <div block="CartOverlay" elem="Static">
                    { this.renderCartItems() }
                    { this.renderDiscountCode() }
                </div>
                <div block="CartOverlay" elem="Floating">
                    { this.renderPromo() }
                    { this.renderTotals() }
                    { this.renderCheckoutButton() }
                </div>
            </Overlay>
        );
    }
}

CartOverlay.propTypes = {
    products: PropTypes.objectOf(ProductType),
    totals: TotalsType.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

CartOverlay.defaultProps = {
    products: {}
};

export default CartOverlay;

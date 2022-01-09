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
import CmsBlock from 'Component/CmsBlock';
import { CART_OVERLAY } from 'Component/Header/Header.config';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import LockIcon from 'Component/LockIcon';
import Overlay from 'Component/Overlay';
import { OVERLAY_PLACEHOLDER } from 'Component/PopupSuspense/PopupSuspense.config';
import { CartDisplayType, TotalsType } from 'Type/MiniCart.type';
import { scrollToTop } from 'Util/Browser';
import { formatPrice } from 'Util/Price';

import './CartOverlay.style';

/** @namespace Component/CartOverlay/Component */
export class CartOverlay extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        handleCheckoutClick: PropTypes.func.isRequired,
        currencyCode: PropTypes.string,
        showOverlay: PropTypes.func.isRequired,
        activeOverlay: PropTypes.string.isRequired,
        hasOutOfStockProductsInCart: PropTypes.bool,
        cartTotalSubPrice: PropTypes.number,
        cartDisplaySettings: CartDisplayType.isRequired,
        isMobile: PropTypes.bool.isRequired,
        onCartItemLoading: PropTypes.func,
        isCartItemLoading: PropTypes.bool
    };

    static defaultProps = {
        hasOutOfStockProductsInCart: false,
        onCartItemLoading: null,
        isCartItemLoading: false,
        currencyCode: null,
        cartTotalSubPrice: null
    };

    componentDidMount() {
        const { showOverlay, isMobile, activeOverlay } = this.props;

        if (!isMobile && activeOverlay === OVERLAY_PLACEHOLDER) {
            showOverlay(CART_OVERLAY);
        }
    }

    renderPriceLine(price) {
        const { currencyCode } = this.props;

        return formatPrice(price, currencyCode);
    }

    renderCartItems() {
        const {
            totals: {
                items = [],
                quote_currency_code
            },
            isCartItemLoading,
            onCartItemLoading
        } = this.props;

        if (items.length < 1) {
            return this.renderNoCartItems();
        }

        return (
            <div block="CartOverlay" elem="Items" aria-label="List of items in cart">
                <Loader isLoading={ isCartItemLoading } />
                { items.map((item) => (
                    <CartItem
                      key={ item.item_id }
                      item={ item }
                      currency_code={ quote_currency_code }
                      onCartItemLoading={ onCartItemLoading }
                      showLoader={ false }
                      isCartOverlay
                    />
                )) }
            </div>
        );
    }

    renderNoCartItems() {
        return (
            <p block="CartOverlay" elem="Empty">
                { __('You have no items in your shopping cart.') }
            </p>
        );
    }

    renderOrderTotalExlTax() {
        const { cartTotalSubPrice } = this.props;

        if (!cartTotalSubPrice) {
            return null;
        }

        return (
            <span>
                { __('Excl. tax: %s', this.renderPriceLine(cartTotalSubPrice)) }
            </span>
        );
    }

    renderTotals() {
        const { totals: { grand_total = 0 } } = this.props;

        return (
            <dl
              block="CartOverlay"
              elem="Total"
            >
                <dt>{ __('Order total:') }</dt>
                <dd>
                    { this.renderPriceLine(grand_total) }
                    { this.renderOrderTotalExlTax() }
                </dd>
            </dl>
        );
    }

    renderTax() {
        const {
            totals: {
                tax_amount = 0
            } = {},
            cartDisplaySettings: {
                display_zero_tax_subtotal
            } = {}
        } = this.props;

        if (!tax_amount && !display_zero_tax_subtotal) {
            return null;
        }

        return (
            <dl
              block="CartOverlay"
              elem="Tax"
            >
                <dt>{ __('Tax total:') }</dt>
                <dd>{ this.renderPriceLine(tax_amount) }</dd>
            </dl>
        );
    }

    renderCouponCode(code) {
        if (!code) {
            return null;
        }

        return <strong block="CartOverlay" elem="DiscountCoupon">{ `${code.toUpperCase()}:` }</strong>;
    }

    renderDiscount() {
        const {
            totals: {
                applied_rule_ids,
                discount_amount,
                coupon_code
            }
        } = this.props;

        if (!applied_rule_ids || !discount_amount) {
            return null;
        }

        const label = coupon_code ? __('Coupon code discount ') : __('Discount: ');

        return (
            <dl
              block="CartOverlay"
              elem="Discount"
            >
                <dt>
                    { label }
                    { this.renderCouponCode(coupon_code) }
                </dt>
                <dd>{ `-${this.renderPriceLine(Math.abs(discount_amount))}` }</dd>
            </dl>
        );
    }

    renderSecureCheckoutButton() {
        const { handleCheckoutClick, hasOutOfStockProductsInCart } = this.props;

        return (
            <button
              block="CartOverlay"
              elem="CheckoutButton"
              mix={ { block: 'Button' } }
              onClick={ handleCheckoutClick }
              disabled={ hasOutOfStockProductsInCart }
            >
                <LockIcon />
                { __('Secure checkout') }
            </button>
        );
    }

    renderActions() {
        return (
            <div block="CartOverlay" elem="Actions">
                <Link
                  block="CartOverlay"
                  elem="CartButton"
                  mix={ { block: 'Button', mods: { isHollow: true } } }
                  to="/cart"
                  onClick={ scrollToTop }
                >
                    { __('View cart') }
                </Link>
                { this.renderSecureCheckoutButton() }
            </div>
        );
    }

    renderCartAdditional() {
        const { totals: { items = [] } } = this.props;

        if (items.length < 1) {
            return null;
        }

        return (
            <div block="CartOverlay" elem="Additional">
                { this.renderDiscount() }
                { this.renderTax() }
                { this.renderTotals() }
                { this.renderOutOfStockProductsWarning() }
                { this.renderActions() }
            </div>
        );
    }

    renderPromo() {
        const { minicart_content: { minicart_cms } = {} } = window.contentConfiguration;

        if (minicart_cms) {
            return <CmsBlock identifier={ minicart_cms } />;
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

    renderOutOfStockProductsWarning() {
        const { hasOutOfStockProductsInCart } = this.props;

        if (!hasOutOfStockProductsInCart) {
            return null;
        }

        return (
            <div block="CartOverlay" elem="OutOfStockProductsWarning">
                { __('Please, remove out of stock products from cart') }
            </div>
        );
    }

    render() {
        const { changeHeaderState } = this.props;

        return (
            <Overlay
              id={ CART_OVERLAY }
              onVisible={ changeHeaderState }
              mix={ { block: 'CartOverlay' } }
            >
                { this.renderPromo() }
                <div block="CartOverlay" elem="ContentWrapper">
                    { this.renderCartItems() }
                    { this.renderCartAdditional() }
                </div>
            </Overlay>
        );
    }
}

export default CartOverlay;

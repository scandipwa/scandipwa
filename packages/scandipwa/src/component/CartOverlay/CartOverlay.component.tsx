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

import CartItem from 'Component/CartItem';
import CmsBlock from 'Component/CmsBlock';
import { Page } from 'Component/Header/Header.config';
import Link from 'Component/Link';
import LockIcon from 'Component/LockIcon';
import Overlay from 'Component/Overlay';
import { OVERLAY_PLACEHOLDER } from 'Component/PopupSuspense/PopupSuspense.config';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { formatPrice } from 'Util/Price';

import { CartOverlayComponentProps } from './CartOverlay.type';

import './CartOverlay.style';

/** @namespace Component/CartOverlay/Component */
export class CartOverlay extends PureComponent<CartOverlayComponentProps> {
    static defaultProps = {
        hasOutOfStockProductsInCart: false,
        onCartItemLoading: null,
        currencyCode: null,
        cartTotalSubPrice: null
    };

    componentDidMount(): void {
        const { showOverlay, isMobile, activeOverlay } = this.props;

        if (!isMobile && activeOverlay === OVERLAY_PLACEHOLDER) {
            showOverlay(Page.CART_OVERLAY);
        }
    }

    renderPriceLine(price: number): ReactElement {
        const { currencyCode } = this.props;

        return formatPrice(price, currencyCode);
    }

    renderCartItems(): ReactElement {
        const {
            totals: {
                items = [],
                quote_currency_code
            },
            onCartItemLoading
        } = this.props;

        if (items.length < 1) {
            return this.renderNoCartItems();
        }

        return (
            <div block="CartOverlay" elem="Items" aria-label="List of items in cart">
                { items.map((item) => (
                    <CartItem
                      key={ item.item_id }
                      item={ item }
                      currency_code={ quote_currency_code }
                      onCartItemLoading={ onCartItemLoading }
                      showLoader
                      isCartOverlay
                    />
                )) }
            </div>
        );
    }

    renderNoCartItems(): ReactElement {
        return (
            <p block="CartOverlay" elem="Empty">
                { __('You have no items in your shopping cart.') }
            </p>
        );
    }

    renderOrderTotalExlTax(): ReactElement {
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

    renderTotals(): ReactElement {
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

    renderTax(): ReactElement {
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

    renderCouponCode(code: string): ReactElement {
        if (!code) {
            return null;
        }

        return <strong block="CartOverlay" elem="DiscountCoupon">{ `${code.toUpperCase()}:` }</strong>;
    }

    renderDiscount(): ReactElement {
        const {
            totals: {
                applied_rule_ids,
                discount_amount,
                coupon_code = ''
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

    renderSecureCheckoutButton(): ReactElement {
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

    renderActions(): ReactElement {
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

    renderCartAdditional(): ReactElement {
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

    renderPromo(): ReactElement {
        const {
            minicart_content: {
                minicart_cms = ''
            } = {}
        } = window.contentConfiguration || {};

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

    renderOutOfStockProductsWarning(): ReactElement {
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

    render(): ReactElement {
        const { changeHeaderState } = this.props;

        return (
            <Overlay
              id={ Page.CART_OVERLAY }
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

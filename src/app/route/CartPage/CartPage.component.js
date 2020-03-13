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

import media, { WYSIWYG_MEDIA } from 'Util/Media';
import Link from 'Component/Link';
import isMobile from 'Util/Mobile';
import CmsBlock from 'Component/CmsBlock';
import CartItem from 'Component/CartItem';
import { TotalsType } from 'Type/MiniCart';
import Loader from 'Component/Loader';
import CartCoupon from 'Component/CartCoupon';
import CartGiftCard from 'Component/CartGiftCard';
import CartStoreCredit from 'Component/CartStoreCredit';
import CartCrossSell from 'Component/CartCrossSell';
import ContentWrapper from 'Component/ContentWrapper';
import { formatCurrency, roundPrice } from 'Util/Price';
import ExpandableContent from 'Component/ExpandableContent';

import './CartPage.style';

export default class CartPage extends PureComponent {
    static propTypes = {
        isEditing: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        totals: TotalsType.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        handleIsLoading: PropTypes.func.isRequired
    };

    renderCartItems() {
        const { isEditing, totals: { items, quote_currency_code } } = this.props;

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
                          currency_code={ quote_currency_code }
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
            totals: {
                coupon_code,
                applied_store_credit,
                applied_gift_cards
            },
            handleIsLoading,
            isSignedIn
        } = this.props;

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
            >
                <CartCoupon couponCode={ coupon_code } />
                { applied_gift_cards && (
                    <CartGiftCard
                      handleIsLoading={ handleIsLoading }
                      appliedGiftCards={ applied_gift_cards }
                    />
                ) }
                { isSignedIn && applied_store_credit && applied_store_credit.enabled && (
                    <CartStoreCredit
                      handleIsLoading={ handleIsLoading }
                      appliedStoreCredit={ applied_store_credit }
                    />
                ) }
            </ExpandableContent>
        );
    }

    renderPriceLine(price) {
        const { totals: { quote_currency_code } } = this.props;
        return `${formatCurrency(quote_currency_code)}${roundPrice(price)}`;
    }

    renderTotalDetails(isMobile = false) {
        const {
            totals: {
                subtotal = 0,
                tax_amount = 0,
                applied_gift_cards
            }
        } = this.props;

        return (
            <dl
              block="CartPage"
              elem="TotalDetails"
              aria-label={ __('Order total details') }
              mods={ { isMobile } }
            >
                <div>
                    <dt>{ __('Subtotal:') }</dt>
                    <dd>{ this.renderPriceLine(subtotal) }</dd>
                </div>
                <div>
                    { this.renderDiscount() }
                </div>
                { applied_gift_cards && (
                    this.renderAppliedGiftCards()
                ) }
                { this.renderAppliedStoreCredit() }
                <div>
                    <dt>{ __('Tax:') }</dt>
                    <dd>{ this.renderPriceLine(tax_amount) }</dd>
                </div>
            </dl>
        );
    }

    renderTotals() {
        const {
            totals: {
                subtotal_incl_tax = 0,
                items
            },
            isLoading
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
                <Loader isLoading={ isLoading } />
                { this.renderTotalDetails() }
                <dl block="CartPage" elem="Total" aria-label="Complete order total">
                    <dt>{ __('Order total:') }</dt>
                    <dd>{ this.renderPriceLine(subtotal_incl_tax) }</dd>
                </dl>
                <div block="CartPage" elem="CheckoutButtons">
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
                        { __('Continue shopping') }
                    </Link>
                </div>
            </article>
        );
    }

    renderAppliedGiftCards() {
        const { totals: { applied_gift_cards } } = this.props;

        return (
            applied_gift_cards.map(({ code, applied_balance: { value } }) => (
                <div key={ code }>
                    <dt>
                        { __('Gift Card ') }
                        <strong block="CartPage" elem="DiscountCoupon">{ code }</strong>
                    </dt>
                    <dd>{ `-${ this.renderPriceLine(Math.abs(value)) }` }</dd>
                </div>
            ))
        );
    }

    renderAppliedStoreCredit() {
        const { totals: { applied_store_credit } } = this.props;

        if (!applied_store_credit) return null;

        const { applied_balance: { value } } = applied_store_credit;

        if (value === 0) return null;

        return (
            <div>
                <dt>
                    { __('Store Credit: ') }
                </dt>
                <dd>{ `-${this.renderPriceLine(Math.abs(value))}` }</dd>
            </div>
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

    renderCrossSellProducts() {
        const { totals: { items } } = this.props;
        return (
            <CartCrossSell products={ items } />
        );
    }

    renderPaymentMethods() {
        return (
            <img
              block="CartPage"
              elem="PaymentMethods"
              src={ media('etc/payment-methods.jpg', WYSIWYG_MEDIA) }
              alt="Shipping car icon"
            />
        );
    }

    renderPromoContent() {
        const { cart_content: { cart_cms } = {} } = window.contentConfiguration;

        if (cart_cms) {
            return <CmsBlock identifiers={ [cart_cms] } />;
        }

        return (
            <>
                <figure
                  block="CartPage"
                  elem="PromoBlock"
                >
                    <img
                      block="CartPage"
                      elem="PromoImage"
                      src={ media('etc/shipping-car.svg', WYSIWYG_MEDIA) }
                      alt="Shipping car icon"
                    />
                    <figcaption block="CartPage" elem="PromoText">
                    { __('Free shipping on order 49$ and more.') }
                    </figcaption>
                </figure>
                { this.renderPaymentMethods() }
            </>
        );
    }

    renderPromo() {
        return (
            <div
              block="CartPage"
              elem="Promo"
            >
                { this.renderPromoContent() }
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="CartPage" aria-label="Cart Page">
                <ContentWrapper
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                  label="Cart page details"
                >
                    <div block="CartPage" elem="Static">
                        <h1 block="CartPage" elem="Heading">{ __('Shopping cart') }</h1>
                        { this.renderCartItems() }
                        { this.renderTotalDetails(true) }
                        <Loader isLoading={ isLoading } />
                        { this.renderDiscountCode() }
                        { this.renderCrossSellProducts() }
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

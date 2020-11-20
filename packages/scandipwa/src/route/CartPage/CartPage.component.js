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

import CartCoupon from 'Component/CartCoupon';
import CartItem from 'Component/CartItem';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Link from 'Component/Link';
import ProductLinks from 'Component/ProductLinks';
import { CROSS_SELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

import './CartPage.style';

/** @namespace Route/CartPage/Component */
export class CartPage extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        onCheckoutButtonClick: PropTypes.func.isRequired,
        hasOutOfStockProductsInCart: PropTypes.bool
    };

    static defaultProps = {
        hasOutOfStockProductsInCart: false
    };

    renderCartItems() {
        const { totals: { items, quote_currency_code } } = this.props;

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
                    { items.map((item) => (
                        <CartItem
                          key={ item.item_id }
                          item={ item }
                          currency_code={ quote_currency_code }
                          isEditing
                          isLikeTable
                        />
                    )) }
                </ul>
            </>
        );
    }

    renderDiscountCode() {
        const {
            totals: { coupon_code }
        } = this.props;

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    renderPriceLine(price) {
        const { totals: { quote_currency_code } } = this.props;
        return formatPrice(price, quote_currency_code);
    }

    renderTotalDetails(isMobile = false) {
        const {
            totals: {
                subtotal = 0,
                tax_amount = 0
            }
        } = this.props;

        return (
            <dl
              block="CartPage"
              elem="TotalDetails"
              aria-label={ __('Order total details') }
              mods={ { isMobile } }
            >
                <dt>{ __('Subtotal:') }</dt>
                <dd>{ this.renderPriceLine(subtotal) }</dd>
                { this.renderDiscount() }
                <dt>{ __('Tax:') }</dt>
                <dd>{ this.renderPriceLine(tax_amount) }</dd>
            </dl>
        );
    }

    renderTotal() {
        const {
            totals: {
                subtotal_with_discount = 0,
                tax_amount = 0
            }
        } = this.props;

        return (
            <dl block="CartPage" elem="Total" aria-label="Complete order total">
                <dt>{ __('Order total:') }</dt>
                <dd>{ this.renderPriceLine(subtotal_with_discount + tax_amount) }</dd>
            </dl>
        );
    }

    renderSecureCheckoutButton() {
        const { onCheckoutButtonClick, hasOutOfStockProductsInCart } = this.props;

        if (hasOutOfStockProductsInCart) {
            return (
                <div block="CartPage" elem="OutOfStockProductsWarning">
                    { __('Remove out of stock products from cart') }
                </div>
            );
        }

        return (
            <button
              block="CartPage"
              elem="CheckoutButton"
              mix={ { block: 'Button' } }
              onClick={ onCheckoutButtonClick }
            >
                <span />
                { __('Secure checkout') }
            </button>
        );
    }

    renderButtons() {
        return (
            <div block="CartPage" elem="CheckoutButtons">
                { this.renderSecureCheckoutButton() }
                <Link
                  block="CartPage"
                  elem="ContinueShopping"
                  to="/"
                >
                    { __('Continue shopping') }
                </Link>
            </div>
        );
    }

    renderTotals() {
        return (
            <article
              block="CartPage"
              elem="Summary"
              mix={ { block: 'FixedElement', elem: 'Bottom' } }
            >
                <h4 block="CartPage" elem="SummaryHeading">{ __('Summary') }</h4>
                { this.renderTotalDetails() }
                { this.renderTotal() }
                { this.renderButtons() }
            </article>
        );
    }

    renderDiscount() {
        const {
            totals: {
                applied_rule_ids,
                coupon_code,
                discount_amount = 0
            }
        } = this.props;

        if (!applied_rule_ids) {
            return null;
        }

        if (!coupon_code) {
            return (
                <>
                    <dt>
                        { __('Discount: ') }
                    </dt>
                    <dd>{ `-${this.renderPriceLine(Math.abs(discount_amount))}` }</dd>
                </>
            );
        }

        return (
            <>
                <dt>
                    { __('Discount/Coupon ') }
                    <strong block="CartPage" elem="DiscountCoupon">{ coupon_code.toUpperCase() }</strong>
                </dt>
                <dd>{ `-${this.renderPriceLine(Math.abs(discount_amount))}` }</dd>
            </>
        );
    }

    renderCrossSellProducts() {
        return (
            <ProductLinks
              linkType={ CROSS_SELL }
              title={ __('Frequently bought together') }
            />
        );
    }

    renderPromoContent() {
        const { cart_content: { cart_cms } = {} } = window.contentConfiguration;

        if (cart_cms) {
            return <CmsBlock identifier={ cart_cms } />;
        }

        return (
            <figure
              block="CartPage"
              elem="PromoBlock"
            >
                <figcaption block="CartPage" elem="PromoText">
                    { __('Free shipping on order 49$ and more.') }
                </figcaption>
            </figure>
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

    renderHeading() {
        return (
            <h1 block="CartPage" elem="Heading">
                { __('Shopping cart') }
            </h1>
        );
    }

    render() {
        return (
            <main block="CartPage" aria-label="Cart Page">
                <ContentWrapper
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                  label="Cart page details"
                >
                    <div block="CartPage" elem="Static">
                        { this.renderHeading() }
                        { this.renderCartItems() }
                        { this.renderTotalDetails(true) }
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

export default CartPage;

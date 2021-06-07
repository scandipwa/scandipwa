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
        hasOutOfStockProductsInCart: PropTypes.bool,
        cartSubtotal: PropTypes.number,
        cartSubtotalSubPrice: PropTypes.number,
        cartTotalSubPrice: PropTypes.number,
        cartShippingPrice: PropTypes.number,
        cartShippingSubPrice: PropTypes.number,
        cartDisplayConfig: PropTypes.object.isRequired
    };

    static defaultProps = {
        hasOutOfStockProductsInCart: false,
        cartSubtotal: 0,
        cartSubtotalSubPrice: null,
        cartTotalSubPrice: null,
        cartShippingPrice: 0,
        cartShippingSubPrice: null
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
                <div block="CartPage" elem="Items" aria-label="List of items in cart">
                    { items.map((item) => (
                        <CartItem
                          key={ item.item_id }
                          item={ item }
                          currency_code={ quote_currency_code }
                          isEditing
                          isLikeTable
                          updateCrossSellsOnRemove
                        />
                    )) }
                </div>
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

    renderSubTotal() {
        const { cartSubtotal } = this.props;

        return (
            <>
                <dt>{ __('Subtotal:') }</dt>
                <dd>
                    { this.renderPriceLine(cartSubtotal) }
                    { this.renderSubTotalExlTax() }
                </dd>
            </>
        );
    }

    renderSubTotalExlTax() {
        const { cartSubtotalSubPrice } = this.props;

        if (!cartSubtotalSubPrice) {
            return null;
        }

        return (
            <span>
                { `${ __('Excl. tax:') } ${ this.renderPriceLine(cartSubtotalSubPrice) }` }
            </span>
        );
    }

    renderTaxFullSummary() {
        const {
            totals: {
                applied_taxes = []
            },
            cartDisplayConfig: {
                display_full_tax_summary
            } = {}
        } = this.props;

        if (!display_full_tax_summary || !applied_taxes.length) {
            return null;
        }

        return applied_taxes
            .map(({ rates }) => rates)
            .reduce((rates, rate) => rates.concat(rate), [])
            .map(({ percent, title }, i) => (
                <div
                  block="CartPage"
                  elem="TaxRate"
                  // eslint-disable-next-line react/no-array-index-key
                  key={ i }
                >
                    { `${title} (${percent}%)` }
                </div>
            ));
    }

    renderTax() {
        const {
            totals: {
                tax_amount = 0
            },
            cartDisplayConfig: {
                display_zero_tax_subtotal
            } = {}
        } = this.props;

        if (!tax_amount && !display_zero_tax_subtotal) {
            return null;
        }

        return (
            <>
                <dt>
                    { __('Tax:') }
                    { this.renderTaxFullSummary() }
                </dt>
                <dd>{ this.renderPriceLine(tax_amount) }</dd>
            </>
        );
    }

    renderEstimatedShippingSubPrice() {
        const {
            cartShippingSubPrice
        } = this.props;

        if (!cartShippingSubPrice) {
            return null;
        }

        return (
            <span>
                { `${ __('Excl. tax:') } ${ this.renderPriceLine(cartShippingSubPrice) }` }
            </span>
        );
    }

    renderEstimatedShipping() {
        const {
            cartShippingPrice
        } = this.props;

        if (!cartShippingPrice) {
            return null;
        }

        return (
            <>
                <dt>{ __('Estimated Shipping:') }</dt>
                <dd>
                    { this.renderPriceLine(cartShippingPrice) }
                    { this.renderEstimatedShippingSubPrice() }
                </dd>
            </>
        );
    }

    renderTotalDetails(isMobile = false) {
        return (
            <dl
              block="CartPage"
              elem="TotalDetails"
              aria-label={ __('Order total details') }
              mods={ { isMobile } }
            >
                { this.renderSubTotal() }
                { this.renderEstimatedShipping() }
                { this.renderDiscount() }
                { this.renderTax() }
            </dl>
        );
    }

    renderOrderTotalExlTax() {
        const { cartTotalSubPrice } = this.props;

        if (!cartTotalSubPrice) {
            return null;
        }

        return (
            <span>
                { `${ __('Excl. tax:') } ${ this.renderPriceLine(cartTotalSubPrice) }` }
            </span>
        );
    }

    renderTotal() {
        const {
            totals: {
                grand_total = 0
            }
        } = this.props;

        return (
            <dl block="CartPage" elem="Total" aria-label="Complete order total">
                <dt>{ __('Order total:') }</dt>
                <dd>
                    { this.renderPriceLine(grand_total) }
                    { this.renderOrderTotalExlTax() }
                </dd>
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
                <h3 block="CartPage" elem="SummaryHeading">{ __('Summary') }</h3>
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

        if (!applied_rule_ids || !discount_amount) {
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

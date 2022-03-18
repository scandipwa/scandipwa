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
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary/CheckoutOrderSummary.container';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Loader from 'Component/Loader';
import LockIcon from 'Component/LockIcon';
import ProductLinks from 'Component/ProductLinks';
import { CROSS_SELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { DeviceType } from 'Type/Device.type';
import { TotalsType } from 'Type/MiniCart.type';
import { noopFn } from 'Util/Common';

import './CartPage.style';

/** @namespace Route/CartPage/Component */
export class CartPage extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        onCheckoutButtonClick: PropTypes.func.isRequired,
        hasOutOfStockProductsInCart: PropTypes.bool,
        onCouponCodeUpdate: PropTypes.func,
        onCartItemLoading: PropTypes.func,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        hasOutOfStockProductsInCart: false,
        onCouponCodeUpdate: noopFn,
        onCartItemLoading: null
    };

    initial = true;

    renderCartItems() {
        const {
            totals: {
                items,
                quote_currency_code
            },
            onCartItemLoading
        } = this.props;

        if (items.length < 1 && this.initial) {
            this.initial = false;
            return <Loader isLoading />;
        }

        if (items.length < 1) {
            return (
                <p block="CartPage" elem="Empty">{ __('There are no products in cart.') }</p>
            );
        }

        return (
            <>
                <p block="CartPage" elem="TableHead" aria-hidden>
                    <span>{ __('item') }</span>
                    <span>{ __('quantity') }</span>
                    <span>{ __('subtotal') }</span>
                </p>
                <div block="CartPage" elem="Items" aria-label="List of items in cart">
                    { items.map((item) => (
                        <CartItem
                          key={ item.item_id }
                          item={ item }
                          currency_code={ quote_currency_code }
                          onCartItemLoading={ onCartItemLoading }
                          showLoader
                          isEditing
                          updateCrossSellsOnRemove
                        />
                    )) }
                </div>
            </>
        );
    }

    renderDiscountCode() {
        const {
            totals: { coupon_code, items }
        } = this.props;

        if (!items || items.length < 1) {
            return null;
        }

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
              isArrow
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    renderSecureCheckoutButton() {
        const { onCheckoutButtonClick, hasOutOfStockProductsInCart } = this.props;

        if (hasOutOfStockProductsInCart) {
            return (
                <div block="CartPage" elem="OutOfStockProductsWarning">
                    { __('Please, remove out of stock products from cart') }
                </div>
            );
        }

        return (
            <div block="CartPage" elem="CheckoutButtonWrapper">
                <button
                  block="CartPage"
                  elem="CheckoutButton"
                  mix={ { block: 'Button' } }
                  onClick={ onCheckoutButtonClick }
                >
                    <LockIcon />
                    { __('Proceed to checkout') }
                </button>
            </div>
        );
    }

    renderSummary() {
        const {
            totals,
            onCouponCodeUpdate
        } = this.props;

        return (
            <CheckoutOrderSummary
              totals={ totals }
                // eslint-disable-next-line react/jsx-no-bind
              renderCmsBlock={ () => this.renderPromo(true) }
              onCouponCodeUpdate={ onCouponCodeUpdate }
              showItems={ false }
            >
                { this.renderSecureCheckoutButton() }
            </CheckoutOrderSummary>
        );
    }

    renderTotals() {
        return (
            <article
              block="CartPage"
              elem="Summary"
              mix={ { block: 'FixedElement', elem: 'Bottom' } }
            >
                { this.renderSummary() }
            </article>
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
                { __('Cart') }
            </h1>
        );
    }

    renderTotalsSection() {
        const { totals: { items = [] } } = this.props;

        if (items.length < 1) {
            return this.renderPromo();
        }

        return (
            <div block="CartPage" elem="Floating">
                { this.renderPromo() }
                { this.renderTotals() }
            </div>
        );
    }

    renderDesktop() {
        return (
            <>
                <div block="CartPage" elem="Static">
                    { this.renderHeading() }
                    { this.renderCartItems() }
                    { this.renderDiscountCode() }
                </div>
                { this.renderTotalsSection() }
            </>
        );
    }

    renderMobile() {
        return (
            <div block="CartPage" elem="Static">
                { this.renderHeading() }
                { this.renderCartItems() }
                <div block="CartPage" elem="Floating">
                    { this.renderTotals() }
                </div>
                { this.renderDiscountCode() }
                { this.renderPromo() }
            </div>
        );
    }

    renderMainContent() {
        const { device: { isMobile } } = this.props;

        if (isMobile) {
            return this.renderMobile();
        }

        return this.renderDesktop();
    }

    render() {
        return (
            <main block="CartPage" aria-label="Cart Page">
                <ContentWrapper
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                  label="Cart page details"
                >
                    { this.renderMainContent() }
                </ContentWrapper>
                { this.renderCrossSellProducts() }
            </main>
        );
    }
}

export default CartPage;

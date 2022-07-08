/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { lazy, PureComponent } from 'react';

import CartItem from 'Component/CartItem';
import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import ExpandableContent from 'Component/ExpandableContent';
import Loader from 'Component/Loader';
import { BILLING_STEP, DETAILS_STEP } from 'Route/Checkout/Checkout.config';
import { CheckoutStepType } from 'Type/Checkout.type';
import { ChildrenType } from 'Type/Common.type';
import { CartConfigType } from 'Type/Config.type';
import { TotalsType } from 'Type/MiniCart.type';
import { getItemsCountLabel } from 'Util/Cart';

import { CmsBlock } from '../../route/Checkout/Checkout.component';

import './CheckoutOrderSummary.style';

export const CartCoupon = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "checkout-info" */
    'Component/CartCoupon'
));

/**
 * Checkout Order Summary component
 * @namespace Component/CheckoutOrderSummary/Component
 */
export class CheckoutOrderSummary extends PureComponent {
    static propTypes = {
        totals: TotalsType,
        checkoutStep: CheckoutStepType,
        isExpandable: PropTypes.bool,
        cartDisplayConfig: CartConfigType.isRequired,
        cartShippingPrice: PropTypes.number,
        cartShippingSubPrice: PropTypes.number,
        cartSubtotal: PropTypes.number,
        cartSubtotalSubPrice: PropTypes.number,
        cartTotalSubPrice: PropTypes.number,
        showItems: PropTypes.bool,
        children: ChildrenType,
        isLoading: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        totals: {},
        isLoading: false,
        isExpandable: false,
        cartShippingPrice: 0,
        cartShippingSubPrice: null,
        cartTotalSubPrice: null,
        cartSubtotal: null,
        cartSubtotalSubPrice: null,
        showItems: true,
        children: [],
        checkoutStep: null
    };

    renderPriceLine(price, title, mods) {
        const {
            totals: {
                prices: {
                    quote_currency_code = null
                } = {}
            }
        } = this.props;

        return (
            <CheckoutOrderSummaryPriceLine
              price={ price }
              currency={ quote_currency_code }
              title={ title }
              mods={ mods }
            />
        );
    }

    renderItem(item) {
        const {
            totals: {
                prices: {
                    quote_currency_code = null
                } = {}
            }
        } = this.props;

        const { item_id } = item;

        return (
            <CartItem
              key={ item_id }
              item={ item }
              currency_code={ quote_currency_code }
            />
        );
    }

    renderDiscount() {
        const {
            totals: {
                prices: {
                    applied_rule_ids,
                    coupon_code,
                    discount: {
                        amount: {
                            value: discount_amount = 0
                        } = {}
                    } = {}
                } = {}
            }
        } = this.props;

        if (!applied_rule_ids) {
            return null;
        }

        const label = coupon_code ? __('Coupon code discount') : __('Discount');
        const discount = -Math.abs(discount_amount);
        return (
            <CheckoutOrderSummaryPriceLine
              price={ discount }
              title={ label }
              coupon_code={ coupon_code }
            />
        );
    }

    renderMobileDiscount(coupon_code) {
        return (
            <>
                <div
                  block="ExpandableContent"
                  elem="Heading"
                  mix={ { block: 'CheckoutOrderSummary', elem: 'ExpandableContentHeading' } }
                >
                    { __('Have a discount code?') }
                </div>
                <CartCoupon couponCode={ coupon_code } />
            </>
        );
    }

    renderDiscountCode() {
        const {
            totals: {
                prices: {
                    coupon_code = ''
                } = {},
                items = []
            },
            checkoutStep,
            isMobile
        } = this.props;

        if (!items || items.length < 1 || checkoutStep !== BILLING_STEP) {
            return null;
        }

        if (isMobile) {
            return this.renderMobileDiscount(coupon_code);
        }

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CheckoutOrderSummary', elem: 'Discount' } }
              isArrow
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    renderItems() {
        const {
            showItems,
            totals: {
                total_quantity,
                items = []
            }
        } = this.props;

        if (!showItems) {
            return null;
        }

        return (
            <>
                <div block="CheckoutOrderSummary" elem="ItemsInCart">
                    { getItemsCountLabel(total_quantity) }
                </div>
                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <div block="CheckoutOrderSummary" elem="CartItemList">
                        { items.map(this.renderItem.bind(this)) }
                    </div>
                </div>
            </>
        );
    }

    renderHeading() {
        return (
            <div
              block="CheckoutOrderSummary"
              elem="Header"
              mix={ { block: 'CheckoutPage', elem: 'Heading', mods: { hasDivider: true } } }
            >
                <h2>{ __('Summary') }</h2>
            </div>
        );
    }

    renderSubTotal() {
        const {
            totals: {
                prices: {
                    quote_currency_code = null
                } = {}
            },
            cartSubtotal,
            cartSubtotalSubPrice
        } = this.props;

        const title = __('Subtotal');

        return (
                <CheckoutOrderSummaryPriceLine
                  price={ cartSubtotal.toFixed(2) }
                  currency={ quote_currency_code }
                  title={ title }
                  subPrice={ cartSubtotalSubPrice?.toFixed(2) ?? null }
                />
        );
    }

    getShippingLabel() {
        const { checkoutStep } = this.props;

        if (checkoutStep === BILLING_STEP) {
            return __('Shipping');
        }

        return __('Estimated Shipping');
    }

    renderShipping() {
        const {
            totals: {
                prices: {
                    quote_currency_code = null
                } = {}
            },
            cartShippingPrice,
            cartShippingSubPrice
        } = this.props;
        const title = this.getShippingLabel();
        const mods = { divider: true };

        if (!cartShippingSubPrice) {
            return this.renderPriceLine(cartShippingPrice, title, mods);
        }

        return (
            <CheckoutOrderSummaryPriceLine
              price={ cartShippingPrice }
              currency={ quote_currency_code }
              title={ title }
              mods={ mods }
              subPrice={ cartShippingSubPrice }
            />
        );
    }

    renderOrderTotal() {
        const {
            totals: {
                prices: {
                    grand_total: {
                        value: grand_total = 0
                    } = {},
                    quote_currency_code = null
                } = {}
            },
            cartTotalSubPrice
        } = this.props;
        const title = __('Order total');
        return (
            <CheckoutOrderSummaryPriceLine
              price={ Number(grand_total || 0).toFixed(2) }
              currency={ quote_currency_code }
              title={ title }
              subPrice={ Number(cartTotalSubPrice || 0).toFixed(2) }
              mods={ { isTotal: true } }
            />
        );
    }

    renderTaxFullSummary() {
        const {
            totals: {
                prices: {
                    applied_taxes = []
                } = {}
            },
            cartDisplayConfig: {
                display_full_tax_summary
            } = {}
        } = this.props;

        if (!display_full_tax_summary || !applied_taxes.length) {
            return null;
        }

        return applied_taxes
            .map(({ label, percent }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div block="CheckoutOrderSummary" elem="AppendedContent" key={ i }>
                    { `${label} (${percent}%)` }
                </div>
            ));
    }

    renderTax() {
        const {
            totals: {
                prices: {
                    applied_taxes = [],
                    quote_currency_code = null
                } = {},
                total_quantity
            },
            cartDisplayConfig: {
                display_full_tax_summary,
                display_zero_tax_subtotal
            } = {}
        } = this.props;

        return applied_taxes.map(({ amount: { value: tax_amount = 0 } = {} }) => {
            if (!quote_currency_code || (!tax_amount && !display_zero_tax_subtotal)) {
                return null;
            }

            return (
                <CheckoutOrderSummaryPriceLine
                  price={ tax_amount.toFixed(2) } // since we display tax even if value is 0
                  currency={ quote_currency_code }
                  itemsQty={ total_quantity }
                  title={ __('Tax') }
                  mods={ { withAppendedContent: display_full_tax_summary } }
                >
                    { this.renderTaxFullSummary() }
                </CheckoutOrderSummaryPriceLine>
            );
        });
    }

    renderTotals() {
        const { children, totals: { items = [] } } = this.props;

        return (
            <div block="CheckoutOrderSummary" elem="OrderTotals">
                <ul>
                    { this.renderSubTotal() }
                    { this.renderDiscount() }
                    { this.renderShipping() }
                    { this.renderTax() }
                    <div block="CheckoutOrderSummary" elem="ButtonWrapper" mods={ { isEmpty: items.length < 1 } }>
                        { this.renderOrderTotal() }
                        { children }
                    </div>
                </ul>
            </div>
        );
    }

    renderCmsBlock() {
        const { checkoutStep } = this.props;
        const isBilling = checkoutStep === BILLING_STEP;

        if (checkoutStep === DETAILS_STEP) {
            return null;
        }

        const {
            checkout_content: {
                [isBilling ? 'checkout_billing_cms' : 'checkout_shipping_cms']: promo
            } = {}
        } = window.contentConfiguration;

        if (!promo) {
            return null;
        }

        return (
            <div
              block="CheckoutOrderSummary"
              elem="CmsBlock"
            >
                <CmsBlock identifier={ promo } />
            </div>
        );
    }

    renderExpandableContent() {
        return (
            <ExpandableContent
              heading={ __('Summary') }
              mix={ { block: 'CheckoutOrderSummary', elem: 'ExpandableContent' } }
            >
                { this.renderItems() }
                { this.renderTotals() }
                { this.renderDiscountCode() }
                { this.renderCmsBlock() }
            </ExpandableContent>
        );
    }

    renderContent() {
        const { isExpandable } = this.props;

        if (isExpandable) {
            return this.renderExpandableContent();
        }

        return (
            <>
                { this.renderHeading() }
                { this.renderItems() }
                { this.renderTotals() }
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <article block="CheckoutOrderSummary" aria-label="Order Summary">
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </article>
        );
    }
}

export default CheckoutOrderSummary;

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

import { lazy, PureComponent } from 'react';

import CartItem from 'Component/CartItem';
import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import ExpandableContent from 'Component/ExpandableContent';
import Loader from 'Component/Loader';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { IndexedCartItem } from 'Store/Cart/Cart.type';
import { Mods, ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { getItemsCountLabel } from 'Util/Cart';

import { CmsBlock } from '../../route/Checkout/Checkout.component';
import { CheckoutOrderSummaryComponentProps } from './CheckoutOrderSummary.type';

import './CheckoutOrderSummary.style';

export const CartCoupon = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "checkout-info" */
    'Component/CartCoupon'
));

/**
 * Checkout Order Summary component
 * @namespace Component/CheckoutOrderSummary/Component
 */
export class CheckoutOrderSummary extends PureComponent<CheckoutOrderSummaryComponentProps> {
    static defaultProps: Partial<CheckoutOrderSummaryComponentProps> = {
        totals: undefined,
        isLoading: false,
        isExpandable: false,
        cartShippingPrice: 0,
        cartShippingSubPrice: null,
        cartTotalSubPrice: null,
        cartSubtotal: undefined,
        cartSubtotalSubPrice: null,
        showItems: true,
        children: [],
        checkoutStep: undefined,
    };

    renderPriceLine(price: number, title: string, mods?: Mods): ReactElement {
        const {
            totals: {
                prices: {
                    quote_currency_code,
                } = {},
            },
        } = this.props;

        if (!quote_currency_code) {
            return null;
        }

        return (
            <CheckoutOrderSummaryPriceLine
              price={ price }
              currency={ quote_currency_code }
              title={ title }
              mods={ mods }
            />
        );
    }

    renderItem(item: IndexedCartItem): ReactElement {
        const {
            totals: {
                prices: {
                    quote_currency_code,
                } = {},
            },
        } = this.props;

        const { id } = item;

        if (!quote_currency_code) {
            return null;
        }

        return (
            <CartItem
              key={ id }
              item={ item as unknown as IndexedCartItem }
              currency_code={ quote_currency_code }
            />
        );
    }

    renderDiscount(): ReactElement {
        const {
            totals: {
                prices: {
                    applied_rule_ids,
                    coupon_code,
                    discount,
                } = {},
            },
        } = this.props;

        if (!applied_rule_ids) {
            return null;
        }

        const { amount: { value: discount_amount = 0 } = {} } = discount || {};
        const label = coupon_code ? __('Coupon code discount') : __('Discount');
        const discountAmount = -Math.abs(discount_amount);

        return (
            <CheckoutOrderSummaryPriceLine
              price={ discountAmount }
              title={ label }
              coupon_code={ coupon_code }
            />
        );
    }

    renderMobileDiscount(coupon_code?: string): ReactElement {
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

    renderDiscountCode(): ReactElement {
        const {
            totals: {
                prices: {
                    coupon_code = '',
                } = {},
                items = [],
            },
            checkoutStep,
            isMobile,
        } = this.props;

        if (!items || items.length < 1 || checkoutStep !== CheckoutSteps.BILLING_STEP) {
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

    renderItems(): ReactElement {
        const {
            showItems,
            totals: {
                total_quantity,
                items = [],
            },
        } = this.props;

        if (!showItems || !total_quantity) {
            return null;
        }

        return (
            <>
                <div block="CheckoutOrderSummary" elem="ItemsInCart">
                    { getItemsCountLabel(total_quantity || 0) }
                </div>
                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <div block="CheckoutOrderSummary" elem="CartItemList">
                        { items.map(this.renderItem.bind(this)) }
                    </div>
                </div>
            </>
        );
    }

    renderHeading(): ReactElement {
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

    renderSubTotal(): ReactElement {
        const {
            totals: {
                prices: {
                    quote_currency_code = GQLCurrencyEnum.USD,
                } = {},
            },
            cartSubtotal,
            cartSubtotalSubPrice,
        } = this.props;

        const title = __('Subtotal');

        return (
                <CheckoutOrderSummaryPriceLine
                  price={ cartSubtotal?.toFixed(2) ?? 0 }
                  currency={ quote_currency_code }
                  title={ title }
                  subPrice={ cartSubtotalSubPrice?.toFixed(2) ?? 0 }
                />
        );
    }

    getShippingLabel(): string {
        const { checkoutStep } = this.props;

        if (checkoutStep === CheckoutSteps.BILLING_STEP) {
            return __('Shipping');
        }

        return __('Estimated Shipping');
    }

    renderShipping(): ReactElement {
        const {
            totals: {
                prices: {
                    quote_currency_code = GQLCurrencyEnum.USD,
                } = {},
            },
            cartShippingPrice,
            cartShippingSubPrice,
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

    renderOrderTotal(): ReactElement {
        const {
            totals: {
                prices: {
                    grand_total: {
                        value: grand_total = 0,
                    } = {},
                    quote_currency_code = GQLCurrencyEnum.USD,
                } = {},
            },
            cartTotalSubPrice,
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

    renderTaxFullSummary(): ReactElement {
        const {
            totals: {
                prices: {
                    applied_taxes = [],
                } = {},
            },
            cartDisplayConfig: {
                display_full_tax_summary,
            } = {},
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

    renderTax(): ReactElement {
        const {
            totals: {
                prices: {
                    applied_taxes = [],
                    quote_currency_code = null,
                } = {},
                total_quantity,
            },
            cartDisplayConfig: {
                display_full_tax_summary,
                display_zero_tax_subtotal,
            } = {},
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
                  mods={ { withAppendedContent: !!display_full_tax_summary } }
                >
                    { this.renderTaxFullSummary() }
                </CheckoutOrderSummaryPriceLine>
            );
        });
    }

    renderTotals(): ReactElement {
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

    renderCmsBlock(): ReactElement {
        const { checkoutStep } = this.props;
        const isBilling = checkoutStep === CheckoutSteps.BILLING_STEP;

        if (checkoutStep === CheckoutSteps.DETAILS_STEP) {
            return null;
        }

        const {
            checkout_content: {
                [isBilling ? 'checkout_billing_cms' : 'checkout_shipping_cms']: promo,
            } = {},
        } = window.contentConfiguration || {};

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

    renderExpandableContent(): ReactElement {
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

    renderContent(): ReactElement {
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

    render(): ReactElement {
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

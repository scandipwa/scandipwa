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

import { PureComponent } from 'react';

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { Discount, TaxItem } from 'Query/Order.type';
import { Mix, ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import { MyAccountOrderTotalsComponentProps } from './MyAccountOrderTotals.type';

import './MyAccountOrderTotals.style';

/** @namespace Component/MyAccountOrderTotals/Component */
export class MyAccountOrderTotals extends PureComponent<MyAccountOrderTotalsComponentProps> {
    renderTax(tax: TaxItem): ReactElement {
        const { colSpanPriceCount, colSpanLabelCount } = this.props;
        const { amount: { value, currency }, title, rate } = tax;

        return (
            <tr key={ `${title}-${rate}` }>
                <th colSpan={ colSpanLabelCount }>{ `${title} (${rate})` }</th>
                <td colSpan={ colSpanPriceCount }>{ formatPrice(Number(value), currency) }</td>
            </tr>
        );
    }

    renderTaxes(): ReactElement {
        const { total: { taxes } } = this.props;

        return taxes.map(this.renderTax.bind(this));
    }

    renderDiscounts(): ReactElement {
        const { total: { discounts = [] } } = this.props;

        if (!discounts.length) {
            return null;
        }

        return discounts.map(this.renderDiscount.bind(this));
    }

    renderDiscount({ label, amount: { value } }: Discount, index: number): ReactElement {
        const discountLabel = label ? __('Discount (%s)', label) : __('Discount');

        return this.renderPriceLine(discountLabel, -Number(value), undefined, {}, `discount-${index}`);
    }

    renderContent(): ReactElement {
        const {
            total: {
                subtotal: {
                    value: subtotalPrice,
                },
                shipping_handling: {
                    total_amount: {
                        value: shippingHandlingPrice,
                    },
                },
                grand_total: {
                    value: grandTotalPrice,
                },
                total_tax: {
                    value: totalTaxPrice,
                },
            },
        } = this.props;

        const grandTotalMix = { block: 'MyAccountOrderTotals', elem: 'GrandTotal' };

        return (
            <>
                { this.renderPriceLine(__('Subtotal'), subtotalPrice) }
                { this.renderDiscounts() }
                { this.renderPriceLine(__('Shipping & Handling'), shippingHandlingPrice) }
                { this.renderPriceLine(
                    __('Grand Total (Excl.Tax)'),
                    Number(grandTotalPrice) - Number(totalTaxPrice),
                    undefined,
                    grandTotalMix,
                ) }
                { this.renderTaxes() }
                { this.renderPriceLine(__('Tax'), totalTaxPrice) }
                { this.renderPriceLine(__('Grand Total (Incl.Tax)'), grandTotalPrice, undefined, grandTotalMix) }
                { this.renderBaseGrandTotal() }
            </>
        );
    }

    renderBaseGrandTotal(): ReactElement {
        const {
            activeTab,
            total: {
                base_grand_total: {
                    value: baseGrandTotalPrice,
                    currency: baseGrandTotalCurrency,
                },
            },
        } = this.props;

        if (activeTab !== OrderTabs.ORDER_ITEMS) {
            return null;
        }

        return this.renderPriceLine(__('Grand Total to be Charged'), baseGrandTotalPrice, baseGrandTotalCurrency);
    }

    renderPriceLine(
        title: string,
        price?: string | number,
        currency?: string,
        mix: Mix = {},
        key?: string | number,
    ): ReactElement {
        const {
            total: { grand_total: { currency: defaultCurrency } },
            colSpanLabelCount,
            colSpanPriceCount,
        } = this.props;

        return (
            <tr mix={ mix } key={ key }>
                <th colSpan={ colSpanLabelCount }>{ title }</th>
                <td colSpan={ colSpanPriceCount }>
                    { formatPrice(Number(price), (currency || defaultCurrency) as GQLCurrencyEnum) }
                </td>
            </tr>
        );
    }

    render(): ReactElement {
        const { total } = this.props;

        if (!total) {
            return null;
        }

        return (
            <tfoot
              block="MyAccountOrderTotals"
              elem="Wrapper"
            >
                { this.renderContent() }
            </tfoot>
        );
    }
}

export default MyAccountOrderTotals;

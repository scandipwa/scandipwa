/* eslint-disable no-magic-numbers */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ORDER_REFUNDS } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { formatPrice } from 'Util/Price';

import './MyAccountOrderTotals.style';

/** @namespace Component/MyAccountOrderTotals/Component */
export class MyAccountOrderTotals extends PureComponent {
    static propTypes = {
        total: PropTypes.object.isRequired,
        activeTab: PropTypes.string.isRequired
    };

    renderTax = (tax) => {
        const { activeTab } = this.props;
        const { amount: { value, currency }, title, rate } = tax;

        return (
            <tr>
                <th colSpan={ activeTab === ORDER_REFUNDS ? 6 : 4 }>{ `${title} (${rate})` }</th>
                <td>{ formatPrice(value, currency) }</td>
            </tr>
        );
    };

    renderTaxes() {
        const { total: { taxes } } = this.props;

        return taxes.map(this.renderTax);
    }

    renderContent() {
        const {
            total: {
                subtotal: {
                    value: subtotalPrice,
                    currency
                },
                shipping_handling: {
                    total_amount: {
                        value: shippingHandlingPrice
                    }
                },
                grand_total: {
                    value: grandTotalPrice
                },
                total_tax: {
                    value: totalTaxPrice
                },
                base_grand_total: {
                    value: baseGrandTotalPrice
                }
            },
            activeTab
        } = this.props;

        const colSpanCount = activeTab === ORDER_REFUNDS ? 6 : 4;

        return (
            <>
                <tr>
                    <th colSpan={ colSpanCount }>{ __('Subtotal') }</th>
                    <td>{ formatPrice(subtotalPrice, currency) }</td>
                </tr>
                <tr>
                    <th colSpan={ colSpanCount }>{ __('Shipping & Handling') }</th>
                    <td>{ formatPrice(shippingHandlingPrice, currency) }</td>
                </tr>
                <tr>
                    <th colSpan={ colSpanCount }><strong>{ __('Grand Total (Excl.Tax)') }</strong></th>
                    <td><strong>{ formatPrice(grandTotalPrice - totalTaxPrice, currency) }</strong></td>
                </tr>
                { this.renderTaxes() }
                <tr>
                    <th colSpan={ colSpanCount }>{ __('Tax') }</th>
                    <td>{ formatPrice(totalTaxPrice, currency) }</td>
                </tr>
                <tr>
                    <th colSpan={ colSpanCount }><strong>{ __('Grand Total (Incl.Tax)') }</strong></th>
                    <td><strong>{ formatPrice(grandTotalPrice, currency) }</strong></td>
                </tr>
                <tr>
                    <th colSpan={ colSpanCount }>{ __('Grand Total to be Charged') }</th>
                    <td>{ formatPrice(baseGrandTotalPrice, currency) }</td>
                </tr>
            </>
        );
    }

    render() {
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

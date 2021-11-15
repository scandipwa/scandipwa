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

import { PropTypes } from 'prop-types';
import { PureComponent } from 'react';

import Html from 'Component/Html';
import { ORDER_ITEMS, ORDER_REFUNDS, ORDER_SHIPMENTS } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { getOrderItemQtyToArray, getOrderItemRowDiscount } from 'Util/Orders';
import { formatPrice } from 'Util/Price';

import { orderQtyTranslationMap } from './MyAccountOrderItemsTableRow.config';

import './MyAccountOrderItemsTableRow.style';

/** @namespace Component/MyAccountOrderItemsTableRow/Component */
export class MyAccountOrderItemsTableRow extends PureComponent {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        selectedOptions: PropTypes.array.isRequired,
        enteredOptions: PropTypes.array.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    renderPrice() {
        const { product: { product_sale_price: { value, currency } }, activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return (
            <td>
                <strong>{ formatPrice(value, currency) }</strong>
            </td>
        );
    }

    renderQty = ([type, qty]) => {
        const { activeTab } = this.props;

        if (qty === 0) {
            return null;
        }

        if (activeTab === ORDER_ITEMS) {
            return (
                <span>{ `${orderQtyTranslationMap[type]}: ${qty}` }</span>
            );
        }

        return (
            <span>{ qty }</span>
        );
    };

    renderRowQty() {
        const { product } = this.props;

        const qtyArray = getOrderItemQtyToArray(product);

        return Object.entries(qtyArray).map(this.renderQty);
    }

    renderRowSubtotal() {
        const { activeTab, product: { row_subtotal: { value, currency } = {} } } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return (
            <td>
                <strong>{ formatPrice(value, currency) }</strong>
            </td>
        );
    }

    renderSelectedAndEnteredOptions() {
        const {
            selectedOptions,
            enteredOptions
        } = this.props;

        return (
            <>
                { selectedOptions.map(this.renderOption) }
                { enteredOptions.map(this.renderOption) }
            </>
        );
    }

    renderNameAndOptions() {
        const { product: { product_name } } = this.props;

        return (
            <td>
                    <span
                      block="MyAccountOrderItemsTableRow"
                      elem="Name"
                    >
                        { product_name }
                    </span>
                    { this.renderSelectedAndEnteredOptions() }
            </td>
        );
    }

    renderOptionItem = (item) => {
        const { product: { product_sale_price: { currency } } } = this.props;
        const { qty, title, price } = item;

        return (
            <tr
              block="MyAccountOrderItemsTableRow"
              elem="EnteredRow"
            >
                <td>
                    { `${qty} x ${title}` }
                </td>
                <td>{ title }</td>
                <td
                  block="MyAccountOrderItemsTableRow"
                  elem="EnteredPrice"
                >
                    <strong>{ formatPrice(price, currency) }</strong>
                </td>
                <td
                  block="MyAccountOrderItemsTableRow"
                  elem="EnteredQty"
                >
                    { qty }
                </td>
            </tr>
        );
    };

    renderEnteredOptionAsRow = (option) => {
        const { activeTab } = this.props;
        const { label, items } = option;

        if (!items) {
            return null;
        }

        // eslint-disable-next-line no-magic-numbers
        const colSpanCount = activeTab === ORDER_REFUNDS ? 6 : 5;

        return (
            <>
                <tr
                  block="MyAccountOrderItemsTableRow"
                  elem="EnteredLabel"
                >
                    <td
                      colSpan={ colSpanCount }
                    >
                        <strong>{ label }</strong>
                    </td>
                </tr>
                { items.map(this.renderOptionItem) }
            </>
        );
    };

    renderEnteredOptionsAsRow() {
        const { enteredOptions } = this.props;

        if (!enteredOptions.length) {
            return null;
        }

        return enteredOptions.map(this.renderEnteredOptionAsRow);
    }

    renderOption = (option) => {
        const {
            label,
            items
        } = option || [];

        if (items) {
            return null;
        }

        return (
            <>
                <dt
                  block="MyAccountOrderItemsTableRow"
                  elem="OptionLabel"
                >
                    <strong>{ label }</strong>
                </dt>
                { this.renderOptionContent(option) }
            </>
        );
    };

    renderOptionContent(option) {
        const {
            value = '',
            linkItems = []
        } = option;

        if (linkItems && linkItems.length) {
            return linkItems.map((title) => <dd>{ title }</dd>);
        }

        return <dd><Html content={ value } /></dd>;
    }

    renderDiscountAndRowTotal() {
        const {
            activeTab,
            product: {
                row_subtotal: {
                    value: row_subtotal,
                    currency
                } = {},
                discounts = []
            }
        } = this.props;

        if (activeTab !== ORDER_REFUNDS) {
            return null;
        }

        const totalDiscount = discounts.length ? getOrderItemRowDiscount(discounts) : 0;

        return (
            <>
                <td><strong>{ formatPrice(totalDiscount, currency) }</strong></td>
                <td><strong>{ formatPrice(row_subtotal - totalDiscount, currency) }</strong></td>
            </>
        );
    }

    renderMobileBodyContentRow(label, value) {
        return (
            <tr>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    }

    renderMobileTableRow() {
        const {
            product: {
                product_sku,
                product_name
            }
        } = this.props;

        return (
            <tbody
              block="MyAccountOrderItemsTableRow"
              elem="Row"
            >
                { this.renderMobileBodyContentRow(__('Product name'), product_name) }
                <tr
                  block="MyAccountOrderItemsTableRow"
                  elem="Name"
                >
                    { this.renderSelectedAndEnteredOptions() }
                </tr>
                { this.renderMobileBodyContentRow(__('Sku'), product_sku) }
                { this.renderMobileBodyContentRow(__('Price'), this.renderPrice()) }
                { this.renderMobileBodyContentRow(__('Qty'), this.renderRowQty()) }
                { this.renderMobileBodyContentRow(__('Subtotal'), this.renderRowSubtotal()) }
                { this.renderEnteredOptionsAsRow() }
            </tbody>
        );
    }

    renderDesktopTableRow() {
        const {
            product: {
                product_sku,
                entered_options = []
            }
        } = this.props;

        const isWithEnteredItems = !!entered_options[0]?.items;

        return (
            <>
                <tr
                  block="MyAccountOrderItemsTableRow"
                  elem="Row"
                  mods={ { isWithEnteredItems } }
                >
                    { this.renderNameAndOptions() }
                    <td>{ product_sku }</td>
                    { this.renderPrice() }
                    <td
                      block="MyAccountOrderItemsTableRow"
                      elem="Qty"
                    >
                        { this.renderRowQty() }
                    </td>
                    { this.renderRowSubtotal() }
                    { this.renderDiscountAndRowTotal() }
                </tr>
                { this.renderEnteredOptionsAsRow() }
            </>
        );
    }

    render() {
        const { isMobile } = this.props;

        if (!isMobile) {
            return this.renderDesktopTableRow();
        }

        return this.renderMobileTableRow();
    }
}

export default MyAccountOrderItemsTableRow;

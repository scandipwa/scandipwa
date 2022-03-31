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
import { OptionsType, OrderComments, OrderProductType } from 'Type/Order.type';
import { getOrderItemQtyToArray, getOrderItemRowDiscount } from 'Util/Orders';
import { formatPrice } from 'Util/Price';

import { orderQtyTranslationMap } from './MyAccountOrderItemsTableRow.config';

import './MyAccountOrderItemsTableRow.style';

/** @namespace Component/MyAccountOrderItemsTableRow/Component */
export class MyAccountOrderItemsTableRow extends PureComponent {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        product: OrderProductType.isRequired,
        selectedOptions: OptionsType.isRequired,
        enteredOptions: OptionsType.isRequired,
        colSpanCount: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired,
        comments: OrderComments
    };

    static defaultProps = {
        comments: []
    };

    renderMap = {
        renderOption: this.renderOption.bind(this),
        renderQty: this.renderQty.bind(this),
        renderOptionItem: this.renderOptionItem.bind(this),
        renderEnteredOptionAsRow: this.renderEnteredOptionAsRow.bind(this)
    };

    renderItemPrice() {
        const {
            product: {
                product_sale_price: {
                    value,
                    currency
                }
            },
            activeTab
        } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return this.renderPrice(value, currency, (__('Price')));
    }

    renderQty([type, qty], index) {
        const { activeTab } = this.props;

        if (qty === 0) {
            return null;
        }

        if (activeTab === ORDER_ITEMS) {
            return (
                <li key={ index }>{ `${orderQtyTranslationMap[type]}: ${qty}` }</li>
            );
        }

        return (
            <li key={ index }>{ qty }</li>
        );
    }

    renderRowQty() {
        const { product } = this.props;
        const { renderQty } = this.renderMap;

        const qtyArray = getOrderItemQtyToArray(product);

        return (
            <ul
              block="MyAccountOrderItemsTableRow"
              elem="QtyList"
            >
                { Object.entries(qtyArray).map(renderQty) }
            </ul>
        );
    }

    renderRowSubtotal() {
        const {
            activeTab,
            product: {
                row_subtotal: {
                    value,
                    currency
                } = {}
            }
        } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return this.renderPrice(value, currency, __('Subtotal'));
    }

    renderPrice(value, currency, title) {
        return (
            <td data-th={ title }>
                <strong>{ formatPrice(value, currency) }</strong>
            </td>
        );
    }

    renderSelectedAndEnteredOptions() {
        const {
            selectedOptions,
            enteredOptions
        } = this.props;
        const { renderOption } = this.renderMap;

        if (!selectedOptions.length && !enteredOptions.length) {
            return null;
        }

        return (
            <>
                { selectedOptions.map(renderOption) }
                { enteredOptions.map(renderOption) }
            </>
        );
    }

    renderNameAndOptions() {
        const { product: { product_name } } = this.props;

        return (
            <td
              data-th={ __('Product Name') }
            >
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

    renderOptionItem(item, isLastOptionItem) {
        const { product: { quantity_ordered = 1, product_sale_price: { currency } } } = this.props;
        const { qty, title, price } = item;

        return (
            <tr
              block="MyAccountOrderItemsTableRow"
              elem="EnteredRow"
              mods={ { isLastOptionItem } }
              key={ `${qty}-${title}` }
            >
                <td>
                    { `${qty} x ${title}` }
                </td>
                <td>{ title }</td>
                { this.renderEnteredOptionPrice(formatPrice(price, currency)) }
                <td
                  block="MyAccountOrderItemsTableRow"
                  elem="EnteredQty"
                >
                    { quantity_ordered * qty }
                </td>
                <td />
            </tr>
        );
    }

    renderEnteredOptionPrice(price) {
        const { activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return (
            <td
              block="MyAccountOrderItemsTableRow"
              elem="EnteredPrice"
            >
                <strong>{ price }</strong>
            </td>
        );
    }

    renderEnteredOptionAsRow(option, index) {
        const { colSpanCount, enteredOptions } = this.props;
        const { label, items } = option;
        const { renderOptionItem } = this.renderMap;

        if (!items) {
            return null;
        }

        const isLastOptionItem = enteredOptions.length - 1 === index;

        return (
            <>
                <tr
                  block="MyAccountOrderItemsTableRow"
                  elem="EnteredLabel"
                  key={ `${label}-${index}` }
                >
                    <td
                      colSpan={ colSpanCount }
                    >
                        <strong>{ label }</strong>
                    </td>
                </tr>
                { items.map((item) => renderOptionItem(item, isLastOptionItem)) }
            </>
        );
    }

    renderEnteredOptionsAsRow() {
        const { enteredOptions } = this.props;
        const { renderEnteredOptionAsRow } = this.renderMap;

        if (!enteredOptions.length) {
            return null;
        }

        return enteredOptions.map(renderEnteredOptionAsRow);
    }

    renderOption(option) {
        const {
            label,
            items,
            value
        } = option || [];

        if (items) {
            return null;
        }

        return (
            <dl key={ `${ label }-${ value }` }>
                <dt
                  block="MyAccountOrderItemsTableRow"
                  elem="OptionLabel"
                >
                    <strong>{ label }</strong>
                </dt>
                { this.renderOptionContent(option) }
            </dl>
        );
    }

    renderOptionContent(option) {
        const {
            value = '',
            linkItems = []
        } = option;

        if (linkItems && linkItems.length) {
            return linkItems.map(this.renderLink.bind(this));
        }

        return <dd block="MyAccountOrderItemsTableRow" elem="OptionValue"><Html content={ value } /></dd>;
    }

    renderLink(title, index) {
        return (
            <dd
              block="MyAccountOrderItemsTableRow"
              elem="DownloadableLink"
              key={ `${title}-${index}` }
            >
                { title }
            </dd>
        );
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
            },
            isMobile
        } = this.props;

        if (activeTab !== ORDER_REFUNDS) {
            return null;
        }

        const totalDiscount = discounts.length ? getOrderItemRowDiscount(discounts) : 0;

        if (isMobile) {
            return (
                <>
                    { this.renderPrice(
                        -totalDiscount,
                        currency,
                        __('Discount Amount')
                    ) }
                    { this.renderPrice(
                        row_subtotal - totalDiscount,
                        currency,
                        __('Row Total')
                    ) }
                </>
            );
        }

        return (
            <>
                <td><strong>{ formatPrice(-totalDiscount, currency) }</strong></td>
                <td><strong>{ formatPrice(row_subtotal - totalDiscount, currency) }</strong></td>
            </>
        );
    }

    renderTableRow() {
        const {
            activeTab,
            product: {
                product_sku
            },
            enteredOptions = [],
            comments
        } = this.props;

        const isWithEnteredItems = !!enteredOptions[0]?.items;
        const lineBefore = !!((activeTab === ORDER_SHIPMENTS) && (comments.length));

        return (
            <tbody>
                <tr
                  block="MyAccountOrderItemsTableRow"
                  elem="RowWrapper"
                  mods={ { isWithEnteredItems, lineBefore } }
                >
                    { this.renderNameAndOptions() }
                    <td data-th={ __('SKU') }>{ product_sku }</td>
                    { this.renderItemPrice() }
                    <td
                      block="MyAccountOrderItemsTableRow"
                      elem="Qty"
                      data-th={ __('Qty') }
                    >
                        { this.renderRowQty() }
                    </td>
                    { this.renderRowSubtotal() }
                    { this.renderDiscountAndRowTotal() }
                </tr>
                { this.renderEnteredOptionsAsRow() }
            </tbody>
        );
    }

    render() {
        return this.renderTableRow();
    }
}

export default MyAccountOrderItemsTableRow;

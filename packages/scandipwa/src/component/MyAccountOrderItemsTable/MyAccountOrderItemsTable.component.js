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

import { ORDER_ITEMS, ORDER_REFUNDS, ORDER_SHIPMENTS } from 'Component/MyAccountOrder/MyAccountOrder.config';
import MyAccountOrderItemsTableRow from 'Component/MyAccountOrderItemsTableRow';
import MyAccountOrderTotals from 'Component/MyAccountOrderTotals';
import { OrderProductsType, OrderTabType, OrderTotalType } from 'Type/Order.type';
import { getProductFromOrder } from 'Util/Orders';

import './MyAccountOrderItemsTable.style';

/** @namespace Component/MyAccountOrderItemsTable/Component */
export class MyAccountOrderItemsTable extends PureComponent {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired,
        items: OrderTabType.isRequired,
        total: OrderTotalType.isRequired,
        allOrderItems: OrderProductsType.isRequired
    };

    renderItems() {
        const { items: { items: products = [] } } = this.props;

        return products.map(this.renderItemRow.bind(this));
    }

    renderItemRow(product, i) {
        const { activeTab, allOrderItems } = this.props;
        const { product_sku } = product;

        const {
            entered_options = [],
            selected_options = []
        } = getProductFromOrder(allOrderItems, product_sku) || {};

        return (
            <MyAccountOrderItemsTableRow
              product={ product }
              selectedOptions={ selected_options }
              enteredOptions={ entered_options }
              key={ i }
              activeTab={ activeTab }
            />
        );
    }

    renderOrderTitle() {
        const { activeTab, items: { number }, isMobile } = this.props;

        if (isMobile && activeTab === ORDER_ITEMS) {
            return (
                <div block="MyAccountOrderItemsTable" elem="OrderTitle">
                    { __('Items Ordered') }
                </div>
            );
        }

        return (
            <div block="MyAccountOrderItemsTable" elem="OrderTitle">
                { `${activeTab} # ${number}` }
            </div>
        );
    }

    renderRefundsTableHeading() {
        const { activeTab } = this.props;

        if (activeTab !== ORDER_REFUNDS) {
            return null;
        }

        return (
            <>
                <th
                  block="MyAccountOrderItemsTable"
                  elem="Discount"
                >
                    { __('Discount Amount') }
                </th>
                <th
                  block="MyAccountOrderItemsTable"
                  elem="Total"
                >
                    { __('Row Total') }
                </th>
            </>
        );
    }

    renderPriceHeading() {
        const { activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return (
            <th
              block="MyAccountOrderItemsTable"
              elem="Price"
            >
                { __('Price') }
            </th>
        );
    }

    renderSubtotalHeading() {
        const { activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return (
            <th
              block="MyAccountOrderItemsTable"
              elem="Subtotal"
            >
                { __('Subtotal') }
            </th>
        );
    }

    renderItemsHeading() {
        return (
            <tr
              block="MyAccountOrderItemsTable"
              elem="Headings"
            >
                <th
                  block="MyAccountOrderItemsTable"
                  elem="Name"
                >
                    <strong>{ __('Product Name') }</strong>
                </th>
                <th
                  block="MyAccountOrderItemsTable"
                  elem="ProductSku"
                >
                    { __('SKU') }
                </th>
                { this.renderPriceHeading() }
                <th
                  block="MyAccountOrderItemsTable"
                  elem="Quantity"
                >
                    { __('Qty') }
                </th>
                { this.renderSubtotalHeading() }
                { this.renderRefundsTableHeading() }
            </tr>
        );
    }

    renderTotals() {
        const { total, activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return <MyAccountOrderTotals activeTab={ activeTab } total={ total } />;
    }

    renderDesktopTable() {
        return (
            <div block="MyAccountOrderItemsTable" elem="ProductsWrapper">
                { this.renderOrderTitle() }
                <table
                  block="MyAccountOrderItemsTable"
                  elem="Products"
                >
                    <thead>
                        { this.renderItemsHeading() }
                    </thead>
                    <tbody
                      block="MyAccountOrderItemsTable"
                      elem="TableRows"
                    >
                        { this.renderItems() }
                    </tbody>
                    { this.renderTotals() }
                </table>
            </div>
        );
    }

    renderMobileTable() {
        return (
            <div block="MyAccountOrderItemsTable" elem="ProductsWrapper">
                { this.renderOrderTitle() }
                <table
                  block="MyAccountOrderItemsTable"
                  elem="Products"
                >
                    <thead>
                        { this.renderItemsHeading() }
                    </thead>
                    { this.renderItems() }
                    { this.renderTotals() }
                </table>
            </div>
        );
    }

    render() {
        const { isMobile } = this.props;

        if (!isMobile) {
            return this.renderDesktopTable();
        }

        return this.renderMobileTable();
    }
}

export default MyAccountOrderItemsTable;

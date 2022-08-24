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

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
=======
import Link from 'Component/Link';
import {
    ORDER_ACTION_LABELS, ORDER_ITEMS, ORDER_REFUNDS, ORDER_SHIPMENTS
} from 'Component/MyAccountOrder/MyAccountOrder.config';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
import MyAccountOrderItemsTableRow from 'Component/MyAccountOrderItemsTableRow';
import MyAccountOrderTotals from 'Component/MyAccountOrderTotals';
import {
    InvoiceItem, OrderItemProduct, RefundItem, ShipmentItemInterface
} from 'Query/Order.type';
import { ReactElement } from 'Type/Common.type';
import { getTimeInCurrentTimezone } from 'Util/Manipulations/Date';
import { getProductFromOrder } from 'Util/Orders';
import { appendWithStoreCode } from 'Util/Url';

import { MyAccountOrderItemsTableComponentProps } from './MyAccountOrderItemsTable.type';

import './MyAccountOrderItemsTable.style';

/** @namespace Component/MyAccountOrderItemsTable/Component */
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
export class MyAccountOrderItemsTable extends PureComponent<MyAccountOrderItemsTableComponentProps> {
    renderItems(): ReactElement {
        const { items: { items: products } } = this.props;

        if (!products.length) {
            return null;
        }
=======
export class MyAccountOrderItemsTable extends PureComponent {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired,
        items: OrderTabType.isRequired,
        total: OrderTotalType.isRequired,
        allOrderItems: OrderProductsType.isRequired,
        id: PropTypes.string.isRequired,
        isPrintPage: PropTypes.bool.isRequired
    };

    renderItems() {
        const { items: { items: products = [] } } = this.props;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js

        return products.map(this.renderItemRow.bind(this));
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
    renderItemRow(
        product: OrderItemProduct | ShipmentItemInterface | InvoiceItem | RefundItem,
        i: number
    ): ReactElement {
        const { activeTab, allOrderItems, items } = this.props;
        const { product_sku } = product;
=======
    renderItemRow(product) {
        const { activeTab, allOrderItems, items: { comments = [] } } = this.props;
        const { product_sku, product_url_key } = product;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
        const {
            entered_options = [],
            selected_options = []
        } = getProductFromOrder(allOrderItems, product_sku) || {};

        return (
            <MyAccountOrderItemsTableRow
              product={ product }
              selectedOptions={ selected_options }
              enteredOptions={ entered_options }
              key={ product_url_key }
              activeTab={ activeTab }
              comments={ 'comments' in items ? items.comments : [] }
            />
        );
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
    renderOrderTitle(): ReactElement {
=======
    renderPrintAction() {
        const { activeTab, id, isPrintPage } = this.props;

        const { print: printLabel, printUrl } = ORDER_ACTION_LABELS[activeTab] || {};

        if (!printLabel || isPrintPage) {
            return null;
        }

        return (
            <Link
              block="MyAccountOrderItemsTable"
              elem="PrintOrder"
              to={ appendWithStoreCode(`${printUrl}/${id}`) }
              isOpenInNewTab
            >
                { printLabel }
            </Link>
        );
    }

    renderOrderTitleAndActions() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
        const { activeTab, items: { number }, isMobile } = this.props;

        if (isMobile && activeTab === OrderTabs.ORDER_ITEMS) {
            return (
                <div block="MyAccountOrderItemsTable" elem="OrderTitle">
                    { __('Items Ordered') }
                </div>
            );
        }

        return (
            <div block="MyAccountOrderItemsTable" elem="OrderActions">
                <div block="MyAccountOrderItemsTable" elem="OrderTitle">
                    { `${activeTab} # ${number}` }
                </div>
                { this.renderPrintAction() }
            </div>
        );
    }

    renderRefundsTableHeading(): ReactElement {
        const { activeTab } = this.props;

        if (activeTab !== OrderTabs.ORDER_REFUNDS) {
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

    renderPriceHeading(): ReactElement {
        const { activeTab } = this.props;

        if (activeTab === OrderTabs.ORDER_SHIPMENTS) {
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

    renderSubtotalHeading(): ReactElement {
        const { activeTab } = this.props;

        if (activeTab === OrderTabs.ORDER_SHIPMENTS) {
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

    renderItemsHeading(): ReactElement {
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

    renderTotals(): ReactElement {
        const { total, activeTab } = this.props;

        if (activeTab === OrderTabs.ORDER_SHIPMENTS) {
            return null;
        }

        return <MyAccountOrderTotals activeTab={ activeTab } total={ total } />;
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
    renderComments(): ReactElement {
        const { items, activeTab } = this.props;

        if (
            activeTab === OrderTabs.ORDER_ITEMS
            || !('comments' in items)
        ) {
            return null;
        }

        const { comments = [] } = items;

        if (!comments.length) {
=======
    renderComments() {
        const { items: { comments = [] }, activeTab, isPrintPage } = this.props;

        if (activeTab === ORDER_ITEMS || !comments.length || isPrintPage) {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
            return null;
        }

        const commentOrder = comments.sort(
            ({ timestamp: first }, { timestamp: second }) => (
                new Date(second.replace(/-/g, '/')).getTime() - new Date(first.replace(/-/g, '/')).getTime()
            )
        );

        return (
            <div block="MyAccountOrderItemsTable" elem="Comments">
                <div
                  block="MyAccountOrderItemsTable"
                  elem="CommentsTitle"
                >
                    { __('About Your %s', activeTab) }
                </div>
                <div block="MyAccountOrderItemsTable" elem="CommentsList">
                    { commentOrder.map(({ timestamp, message }) => (
                        <dl
                          block="MyAccountOrderItemsTable"
                          elem="Comment"
                        >
                            <dt>{ getTimeInCurrentTimezone(timestamp).toString() }</dt>
                            <dd>{ message }</dd>
                        </dl>
                    )) }
                </div>
            </div>
        );
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx
    renderDesktopTable(): ReactElement {
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
                { this.renderComments() }
            </div>
        );
    }

    renderMobileTable(): ReactElement {
=======
    render() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
        return (
            <div block="MyAccountOrderItemsTable" elem="ProductsWrapper">
                { this.renderOrderTitleAndActions() }
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
                { this.renderComments() }
            </div>
        );
    }
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.tsx

    render(): ReactElement {
        const { isMobile } = this.props;

        if (!isMobile) {
            return this.renderDesktopTable();
        }

        return this.renderMobileTable();
    }
=======
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component.js
}

export default MyAccountOrderItemsTable;

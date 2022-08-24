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

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import MyAccountOrderInformation from 'Component/MyAccountOrderInformation';
import MyAccountOrderItemsTable from 'Component/MyAccountOrderItemsTable';
import MyAccountOrderTabs from 'Component/MyAccountOrderTabs';
import { CreditMemo } from 'Query/Order.type';
import { ReactElement } from 'Type/Common.type';
import { ACCOUNT_ORDER_PRINT_URL } from 'Route/MyAccount/MyAccount.config';
import { noopFn } from 'Util/Common';
import { convertStringToDate, getTimeInCurrentTimezone } from 'Util/Manipulations/Date';
import { appendWithStoreCode } from 'Util/Url';

import {
    OrderTabs,
    ORDER_ACTION_LABELS,
} from './MyAccountOrder.config';
import { MyAccountOrderComponentProps, OrderRenderItems, OrderTab } from './MyAccountOrder.type';

import './MyAccountOrder.style';

/** @namespace Component/MyAccountOrder/Component */
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.tsx
export class MyAccountOrder extends PureComponent<MyAccountOrderComponentProps> {
=======
export class MyAccountOrder extends PureComponent<MyAccountOrderComponentProps> {
    static defaultProps: Partial<MyAccountOrderComponentProps> = {
        isLoading: true,
        handleReorder: noopFn,
        handleChangeActiveTab: noopFn
    };

>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.js
    renderMap = {
        renderOrderItemsTable: this.renderOrderItemsTable.bind(this),
        renderOrderCreditMemoTable: this.renderOrderCreditMemoTable.bind(this)
    };

    tabMap: Record<OrderTabs, OrderTab> = {
        [OrderTabs.ORDER_ITEMS]: {
            tabName: OrderTabs.ORDER_ITEMS,
            title: __('Items Ordered'),
            shouldTabRender: (): boolean => {
                const { order } = this.props;

                return !!order;
            },
            render: (): ReactElement => {
                const { order: { items = [], increment_id } } = this.props;
                const renderArray = [{ items, number: increment_id }];
                const { renderOrderItemsTable } = this.renderMap;

                return renderArray.map(renderOrderItemsTable);
            }
        },
        [OrderTabs.ORDER_INVOICES]: {
            tabName: OrderTabs.ORDER_INVOICES,
            title: __('Invoices'),
            shouldTabRender: (): boolean => {
                const { order: { invoices = [] } } = this.props;

                return !!invoices.length;
            },
            render: (): ReactElement => {
                const { order: { invoices = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return invoices.map(renderOrderItemsTable);
            }
        },
        [OrderTabs.ORDER_SHIPMENTS]: {
            tabName: OrderTabs.ORDER_SHIPMENTS,
            title: __('Order Shipments'),
            shouldTabRender: (): boolean => {
                const { order: { shipments = [] } } = this.props;

                return !!shipments.length;
            },
            render: (): ReactElement => {
                const { order: { shipments = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return shipments.map(renderOrderItemsTable);
            }
        },
        [OrderTabs.ORDER_REFUNDS]: {
            tabName: OrderTabs.ORDER_REFUNDS,
            title: __('Refunds'),
            shouldTabRender: (): boolean => {
                const { order: { credit_memos = [] } } = this.props;

                return !!credit_memos.length;
            },
            render: (): ReactElement => {
                const { order: { credit_memos = [] } } = this.props;
                const { renderOrderCreditMemoTable } = this.renderMap;

                return credit_memos.map(renderOrderCreditMemoTable);
            }
        }
    };

    shouldTabsRender(): OrderTab[] {
        return Object.values(this.tabMap).filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderOrderCreditMemoTable(items: CreditMemo, index: number): ReactElement {
        const { activeTab, order: { items: creditMemoItems, id } } = this.props;
        const { total } = items;

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ creditMemoItems }
              total={ total }
            />
        );
    }

    renderOrderItemsTable(items: OrderRenderItems, index: number): ReactElement {
        const { activeTab, order: { total: orderTotal, items: allOrderItems, id } } = this.props;
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.tsx
=======
        const { total: itemsTotal, id: itemId } = items;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.js

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ allOrderItems }
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.tsx
              total={ orderTotal }
=======
              total={ itemsTotal || orderTotal }
              id={ activeTab === OrderTabs.ORDER_ITEMS ? id : atob(itemId) }
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.js
            />
        );
    }

    renderBaseInfo(): ReactElement {
        const { order: { order_date } } = this.props;

        return (
            <div block="MyAccountOrder" elem="CreationDate">
                { this.renderOrderIncrementIdAndStatus() }
                <span>{ convertStringToDate(order_date) }</span>
            </div>
        );
    }

    renderOrderIncrementIdAndStatus(): ReactElement {
        const { order: { increment_id, status }, isMobile } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <h2 block="MyAccountOrder" elem="OrderId">
                { __('Order # %s', increment_id) }
                <span block="MyAccountOrder" elem="OrderStatus">
                    { status }
                </span>
            </h2>
        );
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.tsx
    renderActions(): ReactElement {
=======
    renderPrintAllAction() {
        const { activeTab, order: { id } } = this.props;

        const { printAllUrl, printAll } = ORDER_ACTION_LABELS[activeTab] || {};

        if (!printAllUrl) {
            return null;
        }

        return (
            <Link
              block="MyAccountOrder"
              elem="PrintOrder"
              to={ appendWithStoreCode(`${printAllUrl}/${id}`) }
              isOpenInNewTab
            >
                { printAll }
            </Link>
        );
    }

    renderActions() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.js
        const {
            handleChangeActiveTab,
            activeTab
        } = this.props;

        return (
            <div block="MyAccountOrder" elem="Actions">
                <div block="MyAccountOrder" elem="Buttons">
                    <div>
                        { this.renderReorderButton() }
                        { this.renderSubscriptionButton() }
                    </div>
                    { this.renderPrintOrder() }
                </div>
                { this.renderOrderComments() }
                <MyAccountOrderTabs
                  tabs={ this.shouldTabsRender() }
                  handleChangeActiveTab={ handleChangeActiveTab }
                  activeTab={ activeTab }
                />
                { this.renderPrintAllAction() }
            </div>
        );
    }

<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.tsx
    renderOrderComments(): ReactElement {
=======
    renderPrintOrder() {
        const { order: { id } } = this.props;

        return (
            <Link
              block="MyAccountOrder"
              elem="SubscribeToStatus"
              to={ appendWithStoreCode(`${ACCOUNT_ORDER_PRINT_URL}/${id}`) }
              isOpenInNewTab
            >
                { __('Print Order') }
            </Link>
        );
    }

    renderOrderComments() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrder/MyAccountOrder.component.js
        const { activeTab, order: { comments = [] } } = this.props;

        if (activeTab !== OrderTabs.ORDER_ITEMS || !comments || !comments.length) {
            return null;
        }

        return (
            <div block="MyAccountOrder" elem="Comments">
                <div
                  block="MyAccountOrder"
                  elem="CommentsTitle"
                >
                    { __('About Your Order') }
                </div>
                <div block="MyAccountOrder" elem="CommentsList">
                    { comments.map(({ timestamp, message }) => (
                        <dl
                          block="MyAccountOrder"
                          elem="Comment"
                          key={ `${activeTab}-comment-${timestamp}` }
                        >
                            <dt>{ getTimeInCurrentTimezone(timestamp).toString() }</dt>
                            <dd>{ message }</dd>
                        </dl>
                    )) }
                </div>
            </div>
        );
    }

    renderSubscriptionButton(): ReactElement {
        const { order: { rss_link }, rss_order_subscribe_allow } = this.props;

        if (!rss_order_subscribe_allow) {
            return null;
        }

        return (
            <Link
              block="MyAccountOrder"
              elem="SubscribeToStatus"
              to={ rss_link }
              isOpenInNewTab
            >
                { __('Subscribe to Order Status') }
            </Link>
        );
    }

    renderReorderButton(): ReactElement {
        const { is_allowed_reorder, handleReorder, order: { can_reorder } } = this.props;

        if (!is_allowed_reorder || !can_reorder) {
            return null;
        }

        return (
            <button
              block="Button"
              mods={ { likeLink: true } }
              mix={ { block: 'MyAccountOrder', elem: 'Reorder' } }
              onClick={ handleReorder }
            >
                { __('Reorder') }
            </button>
        );
    }

    renderOrderInformation(): ReactElement {
        const { order, activeTab } = this.props;

        if (activeTab === OrderTabs.ORDER_REFUNDS) {
            return null;
        }

        return <MyAccountOrderInformation order={ order } />;
    }

    renderActiveTab(): ReactElement {
        const { activeTab } = this.props;

        return this.tabMap[activeTab].render();
    }

    renderContent(): ReactElement {
        const { order: { items } } = this.props;

        if (!items) {
            return null;
        }

        return (
            <>
                { this.renderBaseInfo() }
                { this.renderActions() }
                { this.renderActiveTab() }
                { this.renderOrderInformation() }
            </>
        );
    }

    render(): ReactElement {
        const { isLoading } = this.props;

        return (
            <>
                <Loader mix={ { block: 'MyAccountOrder', elem: 'Loader ' } } isLoading={ isLoading } />
                { this.renderContent() }
            </>
        );
    }
}

export default MyAccountOrder;

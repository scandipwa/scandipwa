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
import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import MyAccountOrderInformation from 'Component/MyAccountOrderInformation';
import MyAccountOrderItemsTable from 'Component/MyAccountOrderItemsTable';
import MyAccountOrderTabs from 'Component/MyAccountOrderTabs';
import { ACCOUNT_ORDER_PRINT_URL } from 'Route/MyAccount/MyAccount.config';
import { OrderType } from 'Type/Order.type';
import { noopFn } from 'Util/Common';
import { convertStringToDate, getTimeInCurrentTimezone } from 'Util/Manipulations/Date';
import { appendWithStoreCode } from 'Util/Url';

import {
    ORDER_ACTION_LABELS,
    ORDER_INVOICES,
    ORDER_ITEMS,
    ORDER_REFUNDS,
    ORDER_SHIPMENTS
} from './MyAccountOrder.config';

import './MyAccountOrder.style';

/** @namespace Component/MyAccountOrder/Component */
export class MyAccountOrder extends PureComponent {
    static propTypes = {
        order: OrderType.isRequired,
        isLoading: PropTypes.bool,
        handleReorder: PropTypes.func,
        is_allowed_reorder: PropTypes.bool.isRequired,
        rss_order_subscribe_allow: PropTypes.bool.isRequired,
        handleChangeActiveTab: PropTypes.func,
        activeTab: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isLoading: true,
        handleReorder: noopFn,
        handleChangeActiveTab: noopFn
    };

    renderMap = {
        renderOrderItemsTable: this.renderOrderItemsTable.bind(this)
    };

    tabMap = {
        [ORDER_ITEMS]: {
            tabName: ORDER_ITEMS,
            title: __('Items Ordered'),
            shouldTabRender: () => {
                const { order } = this.props;

                return order;
            },
            render: () => {
                const { order: { items = [], increment_id } } = this.props;
                const renderArray = [{ items, number: increment_id }];
                const { renderOrderItemsTable } = this.renderMap;

                return renderArray.map(renderOrderItemsTable);
            }
        },
        [ORDER_INVOICES]: {
            tabName: ORDER_INVOICES,
            title: __('Invoices'),
            shouldTabRender: () => {
                const { order: { invoices = [] } } = this.props;

                return invoices.length;
            },
            render: () => {
                const { order: { invoices = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return invoices.map(renderOrderItemsTable);
            }
        },
        [ORDER_SHIPMENTS]: {
            tabName: ORDER_SHIPMENTS,
            title: __('Order Shipments'),
            shouldTabRender: () => {
                const { order: { shipments = [] } } = this.props;

                return shipments.length;
            },
            render: () => {
                const { order: { shipments = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return shipments.map(renderOrderItemsTable);
            }
        },
        [ORDER_REFUNDS]: {
            tabName: ORDER_REFUNDS,
            title: __('Refunds'),
            shouldTabRender: () => {
                const { order: { credit_memos = [] } } = this.props;

                return credit_memos.length;
            },
            render: () => {
                const { order: { credit_memos = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return credit_memos.map(renderOrderItemsTable);
            }
        }
    };

    shouldTabsRender() {
        return Object.values(this.tabMap).filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderOrderItemsTable(items, index) {
        const { activeTab, order: { total: orderTotal, items: allOrderItems, id } } = this.props;
        const { total: itemsTotal, id: itemId } = items;

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ allOrderItems }
              total={ itemsTotal || orderTotal }
              id={ activeTab === ORDER_ITEMS ? id : atob(itemId) }
            />
        );
    }

    renderBaseInfo() {
        const { order: { order_date } } = this.props;

        return (
            <div block="MyAccountOrder" elem="CreationDate">
                { this.renderOrderIncrementIdAndStatus() }
                <span>{ convertStringToDate(order_date) }</span>
            </div>
        );
    }

    renderOrderIncrementIdAndStatus() {
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
        const { activeTab, order: { comments = [] } } = this.props;

        if (activeTab !== ORDER_ITEMS || !comments || !comments.length) {
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
                            <dt>{ getTimeInCurrentTimezone(timestamp) }</dt>
                            <dd>{ message }</dd>
                        </dl>
                    )) }
                </div>
            </div>
        );
    }

    renderSubscriptionButton() {
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

    renderReorderButton() {
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

    renderOrderInformation() {
        const { order, activeTab } = this.props;

        if (activeTab === ORDER_REFUNDS) {
            return null;
        }

        return <MyAccountOrderInformation order={ order } />;
    }

    renderActiveTab() {
        const { activeTab } = this.props;

        return this.tabMap[activeTab].render();
    }

    renderContent() {
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

    render() {
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

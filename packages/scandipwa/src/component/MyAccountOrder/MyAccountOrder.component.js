/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import MyAccountOrderInformation from 'Component/MyAccountOrderInformation';
import MyAccountOrderItemsTable from 'Component/MyAccountOrderItemsTable';
import MyAccountOrderTabs from 'Component/MyAccountOrderTabs';
import { OrderType } from 'Type/Order.type';
import { convertStringToDate } from 'Util/Manipulations/Date';

import {
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
        isLoading: PropTypes.bool.isRequired,
        handleReorder: PropTypes.func.isRequired,
        is_allowed_reorder: PropTypes.bool.isRequired,
        rss_order_subscribe_allow: PropTypes.bool.isRequired,
        handleChangeActiveTab: PropTypes.func.isRequired,
        activeTab: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired
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
        const { total: itemsTotal } = items;

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ allOrderItems }
              total={ itemsTotal || orderTotal }
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

    renderActions() {
        const {
            handleChangeActiveTab,
            activeTab
        } = this.props;

        return (
            <div block="MyAccountOrder" elem="Actions">
                <div block="MyAccountOrder" elem="Buttons">
                    { this.renderReorderButton() }
                    { this.renderSubscriptionButton() }
                </div>
                <MyAccountOrderTabs
                  tabs={ this.shouldTabsRender() }
                  handleChangeActiveTab={ handleChangeActiveTab }
                  activeTab={ activeTab }
                />
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
        const { order } = this.props;

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
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </>
        );
    }
}

export default MyAccountOrder;

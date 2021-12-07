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
import { Component } from 'react';

import Loader from 'Component/Loader';
import MyAccountOrderTableRow from 'Component/MyAccountOrderTableRow';
import Pagination from 'Component/Pagination';
import { DeviceType } from 'Type/Device.type';
import { OrdersListType } from 'Type/Order.type';

import './MyAccountMyOrders.style';

/** @namespace Component/MyAccountMyOrders/Component */
export class MyAccountMyOrders extends Component {
    static propTypes = {
        orderList: OrdersListType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        device: DeviceType.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const { device, orderList, isLoading } = this.props;
        const {
            device: nextDevice,
            orderList: nextOrderList,
            isLoading: nextIsLoading
        } = nextProps;

        return device !== nextDevice || orderList !== nextOrderList || isLoading !== nextIsLoading;
    }

    renderNoOrders() {
        const { device } = this.props;

        return (
            <tr block="MyAccountMyOrders" elem="NoOrders">
                { /* eslint-disable-next-line no-magic-numbers */ }
                <td colSpan={ device.isMobile ? 3 : 4 }>{ __('You have no orders.') }</td>
            </tr>
        );
    }

    renderOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Order') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Status') }</th>
                <th block="hidden-mobile">{ __('Total') }</th>
            </tr>
        );
    }

    renderTable() {
        return (
            <table block="MyAccountMyOrders" elem="Table">
                <thead>
                    { this.renderOrderHeadingRow() }
                </thead>
                <tbody>
                    { this.renderOrderRows() }
                </tbody>
            </table>
        );
    }

    renderOrderRow(order) {
        const { id } = order;

        return (
            <MyAccountOrderTableRow
              key={ id }
              order={ order }
            />
        );
    }

    renderOrderRows() {
        const { orderList: { items = [] }, isLoading } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        const orders = items.length
            ? items
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            []
        );
    }

    renderPagination() {
        const {
            isLoading,
            orderList: { pageInfo: { total_pages = 0 } = {} }
        } = this.props;

        return (
            <Pagination
              isLoading={ isLoading }
              totalPages={ total_pages }
            />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default MyAccountMyOrders;

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

import { Component } from 'react';

import Loader from 'Component/Loader';
import MyAccountOrderTableRow from 'Component/MyAccountOrderTableRow';
import Pagination from 'Component/Pagination';
import { ReactElement } from 'Type/Common.type';

import { MyAccountMyOrdersComponentProps, OrderRow } from './MyAccountMyOrders.type';

import './MyAccountMyOrders.style';

/** @namespace Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent<
P extends Readonly<MyAccountMyOrdersComponentProps> = Readonly<MyAccountMyOrdersComponentProps>,
S extends MyAccountMyOrdersComponentState = MyAccountMyOrdersComponentState,
> extends Component<P, S> {
    shouldComponentUpdate(nextProps: MyAccountMyOrdersComponentProps): boolean {
        const { device, orderList, isLoading } = this.props;
        const {
            device: nextDevice,
            orderList: nextOrderList,
            isLoading: nextIsLoading,
        } = nextProps;

        return device !== nextDevice || orderList !== nextOrderList || isLoading !== nextIsLoading;
    }

    renderNoOrders(): ReactElement {
        const { device } = this.props;

        return (
            <tr block="MyAccountMyOrders" elem="NoOrders">
                { /* eslint-disable-next-line no-magic-numbers */ }
                <td colSpan={ device.isMobile ? 3 : 4 }>{ __('You have no orders.') }</td>
            </tr>
        );
    }

    renderOrderHeadingRow(): ReactElement {
        return (
            <tr>
                <th>{ __('Order') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Status') }</th>
                <th block="hidden-mobile">{ __('Total') }</th>
            </tr>
        );
    }

    renderTable(): ReactElement {
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

    renderOrderRow(order: OrderRow): ReactElement {
        return (
            <MyAccountOrderTableRow
              key={ 'base_order_info' in order ? order.base_order_info.id : order.id }
              order={ order }
            />
        );
    }

    renderOrderRows(): ReactElement {
        const { orderList: { items = [] }, isLoading } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        const orders: OrderRow[] = items.length
            ? items
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return orders.reduceRight(
            (acc: ReactElement[], e: OrderRow) => [...acc, this.renderOrderRow(e)],
            [],
        );
    }

    renderPagination(): ReactElement {
        const {
            isLoading,
            orderList: {
                pageInfo: {
                    total_pages = 0,
                } = {},
            },
        } = this.props;

        return (
            <Pagination
              isLoading={ isLoading }
              totalPages={ total_pages }
              mix={ { block: 'MyAccountMyOrders', elem: 'Pagination' } }
            />
        );
    }

    render(): ReactElement {
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

export default MyAccountMyOrdersComponent;

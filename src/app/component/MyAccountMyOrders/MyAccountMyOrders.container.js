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
import { connect } from 'react-redux';
import { OrderDispatcher } from 'Store/Order';
import { formatCurrency } from 'Util/Price';
import { ordersType } from 'Type/Account';
import MyAccountMyOrders from './MyAccountMyOrders.component';

export const mapStateToProps = state => ({
    orderList: state.OrderReducer.orderList
});

export const mapDispatchToProps = dispatch => ({
    getOrderList: () => OrderDispatcher.getOrderList(dispatch)
});

export class MyAccountMyOrdersContainer extends PureComponent {
    static propTypes = {
        orderList: ordersType.isRequired,
        getOrderList: PropTypes.func.isRequired
    };

    containerProps = () => ({
        orders: this._getFormattedOrders()
    });

    _getFormattedDate = (rawDate) => {
        const date = new Date(rawDate.replace(/\s/, 'T'));
        const RADIX = 10;

        const addLeadingZero = value => (value < RADIX ? `0${value}` : value);

        const day = addLeadingZero(date.getDate());
        const month = addLeadingZero(date.getMonth() + 1);

        return `${day}.${month}.${date.getFullYear()}`;
    };

    _getFormattedOrders() {
        // const { orderList: { items } } = this.props;
        const {
            orderList: {
                items = [
                    {
                        id: 1,
                        created_at: '10.02.1999',
                        grand_total: 142,
                        status_label: '11223'
                    },
                    {
                        id: 2,
                        created_at: '10.11.1123',
                        grand_total: 4125,
                        status_label: 'Another3'
                    }
                ]
            }
        } = this.props;

        const formattedItems = items.map((item) => {
            const { created_at, grand_total } = item;
            const priceString = `${grand_total}${formatCurrency()}`;
            const formattedDate = this._getFormattedDate(created_at);

            return {
                ...item,
                created_at: formattedDate,
                grand_total: priceString
            };
        });

        return formattedItems;
    }

    render() {
        return (
            <MyAccountMyOrders
              { ...this.props }
            //   { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer);

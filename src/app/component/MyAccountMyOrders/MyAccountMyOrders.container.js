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
import MyAccountMyOrders from './MyAccountMyOrders.component';

export const mapStateToProps = state => ({
    orderList: state.OrderReducer.orderList,
    order: state.OrderReducer.order,
    isOrderLoading: state.OrderReducer.isOrderLoading
});

export const mapDispatchToProps = dispatch => ({
    getOrderList: () => OrderDispatcher.getOrderList(dispatch),
    getOrderById: orderId => OrderDispatcher.getOrderById(dispatch, orderId)
});

export class MyAccountMyOrdersContainer extends PureComponent {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            }).isRequired
        })
    };

    static defaultProps = {
        match: {}
    };

    containerFunctions = {
        getFormattedDate: this.getFormattedDate.bind(this)
    };

    getFormattedDate(rawDate) {
        const date = new Date(rawDate.replace(/\s/, 'T'));
        const RADIX = 10;

        const addLeadingZero = value => (value < RADIX ? `0${value}` : value);

        const day = addLeadingZero(date.getDate());
        const month = addLeadingZero(date.getMonth() + 1);

        return `${day}.${month}.${date.getFullYear()}`;
    }

    containerProps = () => ({
        orderId: this._getOrderIdFromUrl()
    });

    _getOrderIdFromUrl() {
        const { match: { params: { id = 1 } } } = this.props;

        return id;
    }

    render() {
        return (
            <MyAccountMyOrders
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer);

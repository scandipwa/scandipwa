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
import { withRouter } from 'react-router';

import { DeviceType } from 'Type/Device.type';
import { OrdersListType } from 'Type/Order.type';
import { LocationType } from 'Type/Router.type';
import { getQueryParam } from 'Util/Url';

import MyAccountMyOrders from './MyAccountMyOrders.component';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    orderList: state.OrderReducer.orderList,
    isLoading: state.OrderReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getOrderList: (page) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page)
    )
});

/** @namespace Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends PureComponent {
    static propTypes = {
        getOrderList: PropTypes.func.isRequired,
        orderList: OrdersListType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        device: DeviceType.isRequired,
        location: LocationType.isRequired
    };

    componentDidMount() {
        const { getOrderList } = this.props;
        getOrderList(this._getPageFromUrl());
    }

    componentDidUpdate(prevProps) {
        const { getOrderList } = this.props;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== prevPage) {
            getOrderList(this._getPageFromUrl());
        }
    }

    containerProps() {
        const { orderList, isLoading, device } = this.props;

        return { orderList, isLoading, device };
    }

    _getPageFromUrl(url) {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location) || 1);
    }

    render() {
        return (
            <MyAccountMyOrders
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));

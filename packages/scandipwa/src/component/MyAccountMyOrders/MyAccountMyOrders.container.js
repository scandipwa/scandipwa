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
    getOrderList: () => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch)
    )
});

/** @namespace Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends PureComponent {
    static propTypes = {
        getOrderList: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { getOrderList } = this.props;
        getOrderList();
    }

    render() {
        return (
            <MyAccountMyOrders
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer);

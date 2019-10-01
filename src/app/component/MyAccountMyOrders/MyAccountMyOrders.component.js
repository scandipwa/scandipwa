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
import './MyAccountMyOrders.style';

import { PureComponent } from 'react';
import { ordersType } from 'Type/Account';
import MyAccountOrderTable from 'Component/MyAccountOrderTable';
import MyAccountOrderPopup from 'Component/MyAccountOrderPopup';

class MyAccountMyOrders extends PureComponent {
    static propTypes = {
        getOrderList: PropTypes.func.isRequired,
        orderList: ordersType.isRequired
    };

    componentDidMount() {
        const { getOrderList } = this.props;
        getOrderList();
    }

    renderPopup() {
        return <MyAccountOrderPopup />;
    }

    renderOrders = (order) => {
        const { id } = order;
        return (
            <MyAccountOrderTable
              title={ __('Order #%s', id) }
              showActions
              order={ order }
              key={ id }
            />
        );
    };

    renderNoOrders() {
        return (
            <div>
                <p>{ __('You have no orders.') }</p>
            </div>
        );
    }

    renderOrdersList() {
        const { orderList } = this.props;

        if (!orderList.length) return this.renderNoOrders();
        return orderList.map(this.renderOrders);
    }

    render() {
        return (
            <div block="MyAccountMyOrders">
                { this.renderOrdersList() }
                { this.renderPopup() }
            </div>
        );
    }
}

export default MyAccountMyOrders;

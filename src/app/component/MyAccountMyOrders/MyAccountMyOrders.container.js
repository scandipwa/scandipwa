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
import { connect } from 'react-redux';
import { OrderDispatcher } from 'Store/Order';
import MyAccountMyOrders from './MyAccountMyOrders.component';

/** @namespace Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = state => ({
    orderList: state.OrderReducer.orderList,
    isLoading: state.OrderReducer.isLoading
});

/** @namespace Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    getOrderList: () => OrderDispatcher.requestOrders(dispatch)
});

/** @namespace Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends ExtensiblePureComponent {
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

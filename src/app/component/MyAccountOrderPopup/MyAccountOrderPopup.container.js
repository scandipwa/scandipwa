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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeCancelable } from 'Util/Promise';
import { orderType } from 'Type/Account';
import { OrderDispatcher } from 'Store/Order';
import { showNotification } from 'Store/Notification';
import { getIndexedProducts } from 'Util/Product';
import { fetchQuery } from 'Util/Request';
import { OrderQuery } from 'Query';

import MyAccountOrderPopup, { ORDER_POPUP_ID } from './MyAccountOrderPopup.component';

export const mapStateToProps = state => ({
    order: state.OrderReducer.order,
    payload: state.PopupReducer.popupPayload[ORDER_POPUP_ID] || {}
});

export const mapDispatchToProps = dispatch => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    getOrder: orderId => OrderDispatcher.getOrderById(dispatch, orderId)
});

export class MyAccountOrderPopupContainer extends PureComponent {
    static propTypes = {
        payload: PropTypes.shape({
            order: orderType,
            increment_id: PropTypes.string
        }).isRequired,
        showNotification: PropTypes.func.isRequired,
        getOrder: PropTypes.func.isRequired
    };

    state = {
        order: {},
        prevOrderId: 0,
        isLoading: true
    };

    static getDerivedStateFromProps(props, state) {
        const { payload: { id } } = props;
        const { prevOrderId } = state;
        if (prevOrderId === id) return null;
        return { order: {}, isLoading: true, prevOrderId: id };
    }

    componentDidUpdate(prevProps) {
        const { payload: { increment_id: prevId } } = prevProps;
        const { payload: { increment_id: id } } = this.props;

        if (id !== prevId) {
            this.requestOrderDetails();
        }
    }

    componentWillUnmount() {
        this.orderPromise.cancel();
    }

    containerProps = () => {
        const { order: stateOrder, isLoading } = this.state;
        const { payload: { order: payloadOrder } } = this.props;

        return {
            isLoading,
            order: {
                ...payloadOrder,
                ...stateOrder
            }
        };
    };

    requestOrderDetails() {
        const { payload: { order: { base_order_info: { id } } } } = this.props;

        this.setState({ isLoading: true });

        const fetch = fetchQuery(OrderQuery.getOrderByIdQuery(id));
        this.orderPromise = makeCancelable(fetch);

        this.orderPromise.promise.then(
            ({ getOrderById: rawOrder }) => {
                const { order_products = [] } = rawOrder;
                const indexedProducts = getIndexedProducts(order_products);
                const order = { ...rawOrder, order_products: indexedProducts };
                this.setState({ order, isLoading: false });
            },
            () => {
                showNotification('error', __('Error getting Order by ID!'));
                this.setState({ isLoading: false });
            }
        );
    }

    render() {
        return (
            <MyAccountOrderPopup
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderPopupContainer);

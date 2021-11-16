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

import { showNotification } from 'Store/Notification/Notification.action';
import { MatchType } from 'Type/Router';
import { isSignedIn } from 'Util/Auth';

import MyAccountOrder from './MyAccountOrder.component';
import { ORDER_ITEMS } from './MyAccountOrder.config';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Component/MyAccountOrder/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    display_tax_in_shipping_amount: state.ConfigReducer.cartDisplayConfig.display_tax_in_shipping_amount,
    is_allowed_reorder: state.ConfigReducer.is_allowed_reorder,
    rss_order_subscribe_allow: state.ConfigReducer.rss_order_subscribe_allow
});

/** @namespace Component/MyAccountOrder/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    getOrderById: (orderId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getOrderById(dispatch, orderId)
    ),
    reorder: (incrementId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.reorder(dispatch, incrementId)
    )
});

/** @namespace Component/MyAccountOrder/Container */
export class MyAccountOrderContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        showNotification: PropTypes.func.isRequired,
        getOrderById: PropTypes.func.isRequired,
        display_tax_in_shipping_amount: PropTypes.string.isRequired,
        changeTabName: PropTypes.func.isRequired,
        reorder: PropTypes.func.isRequired,
        is_allowed_reorder: PropTypes.bool,
        rss_order_subscribe_allow: PropTypes.bool.isRequired,
        setTabSubheading: PropTypes.func.isRequired
    };

    static defaultProps = {
        is_allowed_reorder: false
    };

    state = {
        order: {},
        isLoading: true,
        activeTab: ORDER_ITEMS
    };

    containerFunctions = {
        handleReorder: this.handleReorder.bind(this),
        handleChangeActiveTab: this.handleChangeActiveTab.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { match: { params: { orderId } } } = this.props;

        if (orderId) {
            this.requestOrderDetails();
        }
    }

    componentWillUnmount() {
        const { changeTabName, setTabSubheading } = this.props;

        changeTabName();
        setTabSubheading();
    }

    containerProps() {
        const { order: stateOrder, isLoading, activeTab } = this.state;
        const {
            display_tax_in_shipping_amount,
            is_allowed_reorder,
            rss_order_subscribe_allow,
            setTabSubheading
        } = this.props;

        return {
            display_tax_in_shipping_amount,
            isLoading,
            is_allowed_reorder,
            activeTab,
            rss_order_subscribe_allow,
            setTabSubheading,
            order: {
                ...stateOrder
            }
        };
    }

    handleReorder() {
        const { reorder } = this.props;
        const { order: { increment_id } } = this.state;

        reorder(increment_id);
    }

    handleChangeActiveTab(tab) {
        this.setState({ activeTab: tab });
    }

    async requestOrderDetails() {
        const {
            match: {
                params: {
                    orderId
                }
            },
            getOrderById,
            changeTabName,
            setTabSubheading
        } = this.props;

        if (!isSignedIn()) {
            return;
        }

        const order = await getOrderById(orderId);

        if (!order) {
            return;
        }

        const { increment_id, status } = order;
        changeTabName((__('Order # %s', increment_id)));
        setTabSubheading(status);
        this.setState({ order, isLoading: false });
    }

    render() {
        return (
            <MyAccountOrder
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderContainer);

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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { OrderItem } from 'Query/Order.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountOrder from './MyAccountOrder.component';
import { OrderTabs } from './MyAccountOrder.config';
import {
    MyAccountOrderComponentProps,
    MyAccountOrderContainerFunctions,
    MyAccountOrderContainerMapDispatchProps,
    MyAccountOrderContainerMapStateProps,
    MyAccountOrderContainerProps,
    MyAccountOrderContainerPropsKeys,
    MyAccountOrderContainerState,
} from './MyAccountOrder.type';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Component/MyAccountOrder/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderContainerMapStateProps => ({
    display_tax_in_shipping_amount: state.ConfigReducer.cartDisplayConfig.display_tax_in_shipping_amount,
    is_allowed_reorder: state.ConfigReducer.is_allowed_reorder,
    rss_order_subscribe_allow: state.ConfigReducer.rss_order_subscribe_allow,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/MyAccountOrder/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountOrderContainerMapDispatchProps => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    getOrderById: (orderId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getOrderById(dispatch, orderId),
    ),
    reorder: (incrementId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.reorder(dispatch, incrementId),
    ),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE)),
});

/** @namespace Component/MyAccountOrder/Container */
export class MyAccountOrderContainer<
Props extends MyAccountOrderContainerProps = MyAccountOrderContainerProps,
State extends MyAccountOrderContainerState = MyAccountOrderContainerState,
> extends PureComponent<Props, State> {
    static defaultProps: Partial<MyAccountOrderContainerProps> = {
        is_allowed_reorder: false,
        changeTabName: noopFn,
        setTabSubheading: noopFn,
    };

    public state: State = {
        order: {},
        isLoading: true,
        activeTab: OrderTabs.ORDER_ITEMS,
    } as State;

    containerFunctions: MyAccountOrderContainerFunctions = {
        handleReorder: this.handleReorder.bind(this),
        handleChangeActiveTab: this.handleChangeActiveTab.bind(this),
    };

    __construct(props: MyAccountOrderContainerProps): void {
        super.__construct?.(props);

        const { match: { params: { orderId } } } = this.props;

        if (orderId) {
            this.requestOrderDetails(orderId);
        } else {
            history.replace(appendWithStoreCode(`${AccountPageUrl.ORDER_HISTORY}`));
        }
    }

    componentWillUnmount(): void {
        const { changeTabName, setTabSubheading } = this.props;

        changeTabName('');
        setTabSubheading('');
    }

    containerProps(): Pick<
    MyAccountOrderComponentProps,
    MyAccountOrderContainerPropsKeys
    > {
        const { order: stateOrder, isLoading, activeTab } = this.state;
        const {
            display_tax_in_shipping_amount,
            is_allowed_reorder,
            rss_order_subscribe_allow,
            setTabSubheading,
            isMobile,
        } = this.props;

        return {
            display_tax_in_shipping_amount,
            isLoading,
            is_allowed_reorder,
            activeTab,
            rss_order_subscribe_allow,
            setTabSubheading,
            isMobile,
            order: {
                ...stateOrder,
            } as OrderItem,
        };
    }

    handleReorder(): void {
        const { reorder } = this.props;
        const { order } = this.state;

        if (!('increment_id' in order)) {
            return;
        }

        const { increment_id } = order as OrderItem;

        reorder(increment_id);
    }

    handleChangeActiveTab(tab: OrderTabs): void {
        this.setState({ activeTab: tab });
    }

    handleChangeHeaderState(): void {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: Page.CUSTOMER_ORDER,
            title: __('Order'),
            onBackClick: () => history.goBack(),
        });
    }

    async requestOrderDetails(orderId: string): Promise<void> {
        const {
            getOrderById,
            changeTabName,
            setTabSubheading,
        } = this.props;

        if (!isSignedIn()) {
            return;
        }

        const order = await getOrderById(Number(orderId));

        if (!order) {
            history.replace(appendWithStoreCode(`${AccountPageUrl.ORDER_HISTORY}`));

            return;
        }

        const { increment_id, status, id: uid } = order;

        // decode uid of order before setting into state
        order.id = atob(uid);

        changeTabName((__('Order # %s', increment_id)));
        setTabSubheading(status);
        this.handleChangeHeaderState();
        this.setState({ order, isLoading: false });
    }

    render(): ReactElement {
        return (
            <MyAccountOrder
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderContainer);

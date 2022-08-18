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

import { Location } from 'history';
import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { MyAccountContainerProps } from 'Route/MyAccount/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { RootState } from 'Util/Store/Store.type';
import { getQueryParam } from 'Util/Url';

import MyAccountMyOrders from './MyAccountMyOrders.component';
import {
    MyAccountMyOrdersComponentProps,
    MyAccountMyOrdersContainerMapDispatchProps,
    MyAccountMyOrdersContainerMapStateProps,
    MyAccountMyOrdersContainerProps,
    MyAccountMyOrdersContainerPropsKeys
} from './MyAccountMyOrders.type';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountMyOrdersContainerMapStateProps => ({
    orderList: state.OrderReducer.orderList,
    isLoading: state.OrderReducer.isLoading || false,
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountMyOrdersContainerMapDispatchProps => ({
    getOrderList: (page) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page)
    )
});

/** @namespace Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends PureComponent<MyAccountMyOrdersContainerProps> {
    componentDidMount(): void {
        const { getOrderList } = this.props;
        getOrderList(this._getPageFromUrl());
    }

    componentDidUpdate(prevProps: MyAccountMyOrdersContainerProps): void {
        const { getOrderList } = this.props;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== prevPage) {
            getOrderList(this._getPageFromUrl());
            scrollToTop();
        }
    }

    containerProps(): Pick<MyAccountMyOrdersComponentProps, MyAccountMyOrdersContainerPropsKeys> {
        const { orderList, isLoading, device } = this.props;

        return { orderList, isLoading, device };
    }

    _getPageFromUrl(url?: Location): number {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location) || 1);
    }

    render(): ReactElement {
        return (
            <MyAccountMyOrders
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(
        MyAccountMyOrdersContainer as unknown as ComponentType<RouteComponentProps & MyAccountContainerProps>
    )
);

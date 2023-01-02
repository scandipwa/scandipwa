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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountOrderContainer,
} from 'Component/MyAccountOrder/MyAccountOrder.container';
import { OrderItem } from 'Query/Order.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountOrderPrint from './MyAccountOrderPrint.component';
import {
    MyAccountOrderPrintComponentProps,
    MyAccountOrderPrintContainerFunctions,
    MyAccountOrderPrintContainerMapDispatchProps,
    MyAccountOrderPrintContainerMapStateProps,
    MyAccountOrderPrintContainerProps,
    MyAccountOrderPrintContainerPropsKeys,
    MyAccountOrderPrintContainerState,
} from './MyAccountOrderPrint.type';

/** @namespace Component/MyAccountOrderPrint/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderPrintContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
    logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width,
    copyright: state.ConfigReducer.copyright,
});

/** @namespace Component/MyAccountOrderPrint/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountOrderPrintContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
});

/** @namespace Component/MyAccountOrderPrint/Container */
export class MyAccountOrderPrintContainer<
P extends Readonly<MyAccountOrderPrintContainerProps> = Readonly<MyAccountOrderPrintContainerProps>,
S extends MyAccountOrderPrintContainerState = MyAccountOrderPrintContainerState,
> extends MyAccountOrderContainer<P, S> {
    static defaultProps: Partial<MyAccountOrderPrintContainerProps> = {
        is_allowed_reorder: false,
        changeTabName: noopFn,
        setTabSubheading: noopFn,
    };

    containerFunctions: MyAccountOrderPrintContainerFunctions = {
        ...this.containerFunctions,
        onLogoLoad: this.onLogoLoad.bind(this),
    };

    state: S = {
        ...this.state,
        isLogoLoaded: false,
    } as S;

    componentDidMount(): void {
        this.requestOrderPrintDetails();
    }

    async requestOrderPrintDetails(): Promise<void> {
        const {
            match: {
                params: {
                    invoiceId,
                    shipmentId,
                    refundId,
                },
            },
            orderPrintRequest,
            orderPrintMap,
        } = this.props;
        const { request } = orderPrintMap[orderPrintRequest];

        if (!request) {
            return this.requestOrderDetails();
        }

        const order = await request(Number(invoiceId || shipmentId || refundId) || 0);

        if (!order) {
            return history.push({ pathname: appendWithStoreCode(AccountPageUrl.ORDER_HISTORY) });
        }

        return this.handleSetOrder(order);
    }

    async requestOrderDetails(): Promise<void> {
        const {
            match: {
                params: {
                    orderId,
                },
            },
            getOrderById,
        } = this.props;

        const order = await getOrderById(Number(orderId));

        if (!order) {
            return history.push({ pathname: appendWithStoreCode(AccountPageUrl.ORDER_HISTORY) });
        }

        return this.handleSetOrder(order);
    }

    handleSetOrder(order: OrderItem): void {
        const { updateMeta } = this.props;
        const { id: uid, increment_id, ...newOrder } = order;

        updateMeta({ title: __('Order # %s', increment_id) });
        this.setState({ order: { increment_id, id: atob(uid), ...newOrder }, isLoading: false });
    }

    onLogoLoad(): void {
        this.setState({ isLogoLoaded: true });
    }

    containerProps(): Pick<MyAccountOrderPrintComponentProps, MyAccountOrderPrintContainerPropsKeys> {
        const {
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match,
            copyright,
            orderPrintRequest,
            orderPrintMap,
        } = this.props;
        const { isLogoLoaded } = this.state;

        const { activeTab } = orderPrintMap[orderPrintRequest];

        return {
            ...super.containerProps(),
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match,
            copyright,
            activeTab,
            isLogoLoaded,
        };
    }

    render(): ReactElement {
        return (
            <MyAccountOrderPrint
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    MyAccountOrderPrintContainer,
);

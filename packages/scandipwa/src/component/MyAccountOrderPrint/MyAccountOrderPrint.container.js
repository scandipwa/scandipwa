/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Loader from 'Component/Loader';
import {
    ORDER_INVOICES,
    ORDER_ITEMS,
    ORDER_REFUNDS,
    ORDER_SHIPMENTS
} from 'Component/MyAccountOrder/MyAccountOrder.config';
import {
    mapDispatchToProps,
    MyAccountOrderContainer
} from 'Component/MyAccountOrder/MyAccountOrder.container';
import { isSignedIn } from 'Util/Auth';

import MyAccountOrderPrint from './MyAccountOrderPrint.component';
import {
    PRINT_ALL_INVOICES, PRINT_ALL_REFUNDS, PRINT_ALL_SHIPMENT, PRINT_ORDER
} from './MyAccountOrderPrint.config';

/** @namespace Component/MyAccountOrderPrint/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...MyAccountOrderContainer.mapStateToProps,
    logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width,
    copyright: state.ConfigReducer.copyright
});

/** @namespace Component/MyAccountOrderPrint/Container */
export class MyAccountOrderPrintContainer extends MyAccountOrderContainer {
    static propTypes = {
        ...MyAccountOrderContainer.propTypes,
        orderPrintRequest: PropTypes.string.required
    };

    orderPrintMap = {
        [PRINT_ORDER]: {
            request: this.requestOrderDetails(),
            activeTab: ORDER_ITEMS
        },
        [PRINT_ALL_INVOICES]: {
            request: this.requestOrderDetails(),
            activeTab: ORDER_INVOICES
        },
        [PRINT_ALL_SHIPMENT]: {
            activeTab: ORDER_SHIPMENTS
        },
        [PRINT_ALL_REFUNDS]: {
            activeTab: ORDER_REFUNDS
        }
    };

    async requestOrderDetails() {
        const {
            match: {
                params: {
                    orderId
                }
            },
            getOrderById
        } = this.props;

        if (!isSignedIn()) {
            return;
        }

        const order = await getOrderById(orderId);

        if (!order) {
            return;
        }

        const { id: uid } = order;

        // decode uid of order before setting into state
        order.id = atob(uid);

        this.setState({ order, isLoading: false });
    }

    containerProps() {
        const {
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match,
            copyright,
            orderPrintRequest
        } = this.props;

        const { activeTab } = this.orderPrintMap[orderPrintRequest];

        return {
            ...super.containerProps(),
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match,
            copyright,
            activeTab
        };
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <Loader />;
        }

        return (
            <MyAccountOrderPrint
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderPrintContainer);

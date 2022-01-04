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

import { connect } from 'react-redux';

import Loader from 'Component/Loader';
import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountOrderContainer
} from 'Component/MyAccountOrder/MyAccountOrder.container';
import { isSignedIn } from 'Util/Auth';

import MyAccountOrderPrint from './MyAccountOrderPrint.component';

/** @namespace Component/MyAccountOrderPrint/Container */
export class MyAccountOrderPrintContainer extends MyAccountOrderContainer {
    componentWillUnmount() {}

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

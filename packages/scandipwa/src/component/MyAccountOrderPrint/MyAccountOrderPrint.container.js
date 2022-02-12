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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountOrderContainer
} from 'Component/MyAccountOrder/MyAccountOrder.container';
import { updateMeta } from 'Store/Meta/Meta.action';
import { isSignedIn } from 'Util/Auth';

import MyAccountOrderPrint from './MyAccountOrderPrint.component';

/** @namespace Component/MyAccountOrderPrint/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width,
    copyright: state.ConfigReducer.copyright
});

/** @namespace Component/MyAccountOrderPrint/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Component/MyAccountOrderPrint/Container */
export class MyAccountOrderPrintContainer extends MyAccountOrderContainer {
    static propTypes = {
        ...MyAccountOrderContainer.propTypes,
        orderPrintRequest: PropTypes.string.isRequired,
        updateMeta: PropTypes.func.isRequired
    };

    containerFunctions = {
        ...MyAccountOrderContainer.containerFunctions,
        onLogoLoad: this.onLogoLoad.bind(this)
    };

    state = {
        ...MyAccountOrderContainer.state,
        isLogoLoaded: false
    };

    __construct(props) {
        super.__construct(props);

        this.requestOrderPrintDetails();
    }

    componentWillUnmount() {}

    async requestOrderPrintDetails() {
        const {
            match: {
                params: {
                    invoiceId,
                    shipmentId,
                    refundId
                }
            },
            orderPrintRequest,
            orderPrintMap
        } = this.props;
        const { request } = orderPrintMap[orderPrintRequest];

        if (!request) {
            return this.requestOrderDetails();
        }

        const order = await request(invoiceId || shipmentId || refundId);

        if (!order) {
            return null;
        }

        this.handleSetOrder(order);

        return null;
    }

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

        this.handleSetOrder(order);
    }

    handleSetOrder(order) {
        const { updateMeta } = this.props;
        const { id: uid, increment_id } = order;

        // decode uid of order before setting into state
        order.id = atob(uid);
        updateMeta({ title: __('Order # %s', increment_id) });
        this.setState({ order, isLoading: false });
    }

    onLogoLoad() {
        this.setState({ isLogoLoaded: true });
    }

    containerProps() {
        const {
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match,
            copyright,
            orderPrintRequest,
            orderPrintMap
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
            isLogoLoaded
        };
    }

    render() {
        return (
            <MyAccountOrderPrint
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderPrintContainer);

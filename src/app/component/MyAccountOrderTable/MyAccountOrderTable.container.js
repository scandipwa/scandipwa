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
import { showPopup } from 'Store/Popup';
import {
    ORDER_POPUP_ID, VIEW_ORDER
} from 'Component/MyAccountOrderPopup/MyAccountOrderPopup.component';
import { orderType } from 'Type/Account';
import { OrderDispatcher } from 'Store/Order';
import MyAccountOrderTable from './MyAccountOrderTable.component';

export const mapDispatchToProps = dispatch => ({
    showViewPopup: payload => dispatch(showPopup(ORDER_POPUP_ID, payload)),
    getOrder: orderId => OrderDispatcher.getOrderById(dispatch, orderId)
});

export class MyAccountOrderTableContainer extends PureComponent {
    static propTypes = {
        showViewPopup: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        showActions: PropTypes.bool,
        order: orderType.isRequired,
        getOrder: PropTypes.func.isRequired
    };

    static defaultProps = {
        showActions: false
    };

    containerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    onViewClick() {
        const {
            showViewPopup, order, getOrder
        } = this.props;
        const { base_order_info } = order;
        const { id } = base_order_info;

        getOrder(id);

        showViewPopup({
            action: VIEW_ORDER,
            title: __('Order details')
        });
    }

    render() {
        return (
            <MyAccountOrderTable
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountOrderTableContainer);

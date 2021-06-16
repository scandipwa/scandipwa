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

import { ORDER_POPUP_ID } from 'Component/MyAccountOrderPopup/MyAccountOrderPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { downloadableType } from 'Type/Account';
import { DeviceType } from 'Type/Device';

import MyAccountDownloadableTableRow from './MyAccountDownloadableTableRow.component';

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    orderList: state.OrderReducer.orderList,
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window
});

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(ORDER_POPUP_ID, payload))
});

/** @namespace Component/MyAccountDownloadableTableRow/Container */
export class MyAccountDownloadableTableRowContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        orderList: PropTypes.array.isRequired,
        order: downloadableType.isRequired,
        device: DeviceType.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    containerFunctions = {
        onOrderIdClick: this.onOrderIdClick.bind(this)
    };

    onOrderIdClick() {
        const { showPopup, orderList, order: { order_id } } = this.props;

        const order = orderList.find((order) => {
            const {
                base_order_info: {
                    increment_id
                }
            } = order;

            return increment_id === order_id;
        });

        showPopup({
            title: __('Order #%s', order_id),
            increment_id: order_id,
            order
        });
    }

    containerProps() {
        const { device, order, isOpenInNewTab } = this.props;

        return ({
            order,
            device,
            isOpenInNewTab
        });
    }

    render() {
        return (
            <MyAccountDownloadableTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDownloadableTableRowContainer);

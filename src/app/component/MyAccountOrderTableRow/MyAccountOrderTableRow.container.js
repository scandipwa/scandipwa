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
import { ORDER_POPUP_ID } from 'Component/MyAccountOrderPopup/MyAccountOrderPopup.component';
import { orderType } from 'Type/Account';
import MyAccountOrderTableRow from './MyAccountOrderTableRow.component';

export const mapDispatchToProps = dispatch => ({
    showPopup: payload => dispatch(showPopup(ORDER_POPUP_ID, payload))
});

export class MyAccountOrderTableRowContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        order: orderType.isRequired
    };

    containerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    onViewClick() {
        const { showPopup, order } = this.props;
        const { base_order_info: { increment_id } } = order;

        showPopup({
            title: __('Order #%s', increment_id),
            increment_id,
            order
        });
    }

    containerProps = () => {
        const { order: { base_order_info } } = this.props;
        return { base_order_info };
    };

    render() {
        return (
            <MyAccountOrderTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountOrderTableRowContainer);

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
import { orderType } from 'Type/Account';

import MyAccountOrderTableRow from './MyAccountOrderTableRow.component';

/** @namespace Component/MyAccountOrderTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(ORDER_POPUP_ID, payload))
});

/** @namespace Component/MyAccountOrderTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        order: orderType.isRequired,
        display_tax_in_shipping_amount: PropTypes.string
    };

    static defaultProps = {
        display_tax_in_shipping_amount: ''
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
        const {
            display_tax_in_shipping_amount,
            order,
            order: { base_order_info, base_order_info: { currency_code = '' } }
        } = this.props;

        return {
            order,
            base_order_info,
            currency_code,
            display_tax_in_shipping_amount
        };
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);

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
import { connect } from 'react-redux';
import { showPopup } from 'Store/Popup';
import { ORDER_POPUP_ID } from 'Component/MyAccountOrderPopup/MyAccountOrderPopup.component';
import { orderType } from 'Type/Account';
import MyAccountOrderTableRow from './MyAccountOrderTableRow.component';

export const mapStateToProps = middleware(
    state => ({
        currency_code: state.ConfigReducer.default_display_currency_code
    }),
    'Component/MyAccountOrderTableRow/Container/mapStateToProps'
);

export const mapDispatchToProps = middleware(
    dispatch => ({
        showPopup: payload => dispatch(showPopup(ORDER_POPUP_ID, payload))
    }),
    'Component/MyAccountOrderTableRow/Container/mapDispatchToProps'
);

export class MyAccountOrderTableRowContainer extends ExtensiblePureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        currency_code: PropTypes.string,
        order: orderType.isRequired
    };

    static defaultProps = {
        currency_code: ''
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
        const { order: { base_order_info }, currency_code } = this.props;
        return { base_order_info, currency_code };
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

export default connect(mapStateToProps, mapDispatchToProps)(
    middleware(MyAccountOrderTableRowContainer, 'Component/MyAccountOrderTableRow/Container')
);

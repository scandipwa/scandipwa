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
import MyAccountOrderTable from './MyAccountOrderTable.component';

export const mapDispatchToProps = dispatch => ({
    showViewPopup: payload => dispatch(showPopup(ORDER_POPUP_ID, payload))
});

export class MyAccountOrderTableContainer extends PureComponent {
    static propTypes = {
        showViewPopup: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        showActions: PropTypes.bool,
        order: orderType.isRequired
    };

    static defaultProps = {
        showActions: false
    };

    containerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    onViewClick() {
        const { showViewPopup, order } = this.props;

        showViewPopup({
            action: VIEW_ORDER,
            title: __('View order'),
            order
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

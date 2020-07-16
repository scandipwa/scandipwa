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

import {
    CHANGE_PASSWORD,
    CUSTOMER_POPUP_ID,
    EDIT_CUSTOMER
} from 'Component/MyAccountCustomerPopup/MyAccountCustomerPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { customerType } from 'Type/Account';

import MyAccountCustomerTable from './MyAccountCustomerTable.component';

export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(CUSTOMER_POPUP_ID, payload))
});

export class MyAccountCustomerTableContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        customer: customerType.isRequired
    };

    containerFunctions = {
        showEditPopup: this.showEditPopup.bind(this),
        showChangePasswordPopup: this.showChangePasswordPopup.bind(this)
    };

    showEditPopup() {
        const { showPopup, customer } = this.props;

        showPopup({
            action: EDIT_CUSTOMER,
            customer,
            title: __('Edit customer details')
        });
    }

    showChangePasswordPopup() {
        const { showPopup, customer } = this.props;

        showPopup({
            action: CHANGE_PASSWORD,
            customer,
            title: __('Change password')
        });
    }

    render() {
        return (
            <MyAccountCustomerTable
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountCustomerTableContainer);

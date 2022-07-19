/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import MyAccountCustomerForm from 'Component/MyAccountCustomerForm';
import MyAccountPasswordForm from 'Component/MyAccountPasswordForm';
import Popup from 'Component/Popup';
import { CustomerType } from 'Type/Account.type';

import { CHANGE_PASSWORD, CUSTOMER_POPUP_ID, EDIT_CUSTOMER } from './MyAccountCustomerPopup.config';

/** @namespace Component/MyAccountCustomerPopup/Component */
export class MyAccountCustomerPopup extends PureComponent {
    static propTypes = {
        onCustomerSave: PropTypes.func.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        payload: PropTypes.shape({
            action: PropTypes.oneOf([
                CHANGE_PASSWORD,
                EDIT_CUSTOMER
            ]),
            customer: CustomerType
        }).isRequired,
        range: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired
    };

    renderChangePasswordForm() {
        const { onPasswordChange, range } = this.props;

        return (
            <MyAccountPasswordForm
              onPasswordChange={ onPasswordChange }
              range={ range }
            />
        );
    }

    renderCustomerForm() {
        const { payload: { customer }, onCustomerSave } = this.props;

        return (
            <MyAccountCustomerForm
              customer={ customer }
              onSave={ onCustomerSave }
            />
        );
    }

    renderContent() {
        const { payload: { action } } = this.props;

        switch (action) {
        case CHANGE_PASSWORD:
            return this.renderChangePasswordForm();
        case EDIT_CUSTOMER:
            return this.renderCustomerForm();
        default:
            return null;
        }
    }

    render() {
        const { isLoading } = this.props;

        return (
            <Popup
              id={ CUSTOMER_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'MyAccountCustomerPopup' } }
            >
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </Popup>
        );
    }
}

export default MyAccountCustomerPopup;

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

import Loader from 'Component/Loader';
import MyAccountCustomerForm from 'Component/MyAccountCustomerForm';
import { CustomerType } from 'Type/Account.type';

import './MyAccountInformation.style';

/** @namespace Component/MyAccountInformation/Component */
export class MyAccountInformation extends PureComponent {
    static propTypes = {
        onCustomerSave: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        customer: CustomerType.isRequired,
        showEmailChangeField: PropTypes.bool.isRequired,
        showPasswordChangeField: PropTypes.bool.isRequired,
        handleChangeEmailCheckbox: PropTypes.func.isRequired,
        handleChangePasswordCheckbox: PropTypes.func.isRequired,
        onSubmitSuccess: PropTypes.func.isRequired
    };

    renderCustomerForm() {
        const {
            customer,
            onCustomerSave,
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            onSubmitSuccess
        } = this.props;

        return (
            <MyAccountCustomerForm
              customer={ customer }
              onSave={ onCustomerSave }
              showEmailChangeField={ showEmailChangeField }
              showPasswordChangeField={ showPasswordChangeField }
              handleChangeEmailCheckbox={ handleChangeEmailCheckbox }
              handleChangePasswordCheckbox={ handleChangePasswordCheckbox }
              onSubmitSuccess={ onSubmitSuccess }
            />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div
              block="MyAccountInformation"
              elem="Wrapper"
            >
                <Loader isLoading={ isLoading } />
                { this.renderCustomerForm() }
            </div>
        );
    }
}

export default MyAccountInformation;

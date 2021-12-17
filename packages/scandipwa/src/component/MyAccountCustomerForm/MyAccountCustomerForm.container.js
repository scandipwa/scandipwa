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
    SHOW_VAT_NUMBER_OPTIONAL,
    SHOW_VAT_NUMBER_REQUIRED
} from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { CustomerType } from 'Type/Account.type';

import MyAccountCustomerForm from './MyAccountCustomerForm.component';

/** @namespace Component/MyAccountCustomerForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number
});

/** @namespace Component/MyAccountCustomerForm/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountCustomerForm/Container */
export class MyAccountCustomerFormContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        onSave: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.string.isRequired,
        showEmailChangeField: PropTypes.bool.isRequired,
        showPasswordChangeField: PropTypes.bool.isRequired,
        handleChangeEmailCheckbox: PropTypes.func.isRequired,
        handleChangePasswordCheckbox: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this),
        handlePasswordInput: this.handlePasswordInput.bind(this)
    };

    state = {
        email: null,
        currentPassword: ''
    };

    containerProps() {
        const {
            customer: { email: currentCustomerEmail },
            customer,
            onSave,
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox
        } = this.props;
        const { email, currentPassword } = this.state;

        return {
            customer,
            onSave,
            showTaxVatNumber: this.getIsShowVatNumber(),
            vatNumberRequired: this.getVatNumberRequired(),
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            currentPassword,
            email: email || currentCustomerEmail
        };
    }

    getIsShowVatNumber() {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED
            || showTaxVatNumber === SHOW_VAT_NUMBER_OPTIONAL;
    }

    getVatNumberRequired() {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED;
    }

    handleEmailInput(emailInput) {
        this.setState({ email: emailInput.target.value });
    }

    handlePasswordInput(currentPasswordInput) {
        this.setState({ currentPassword: currentPasswordInput.target.value });
    }

    render() {
        return (
            <MyAccountCustomerForm
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerFormContainer);

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

import FieldForm from 'Component/PureForm/FieldForm';
import { customerType } from 'Type/Account';
import transformToNameValuePair from 'Util/Form/Transform';

import { customerEmailAndPasswordFields, customerInformationFields } from './MyAccountCustomerForm.form';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        showEmailChangeField: PropTypes.bool.isRequired,
        showPasswordChangeField: PropTypes.bool.isRequired,
        handleChangeEmailCheckbox: PropTypes.func.isRequired,
        handleChangePasswordCheckbox: PropTypes.func.isRequired,
        handleEmailInput: PropTypes.func.isRequired,
        handlePasswordInput: PropTypes.func.isRequired,
        email: PropTypes.string,
        currentPassword: PropTypes.string
    };

    static defaultProps = {
        email: '',
        currentPassword: ''
    };

    onFormSuccess = (form, fields) => {
        const { onSave } = this.props;
        onSave(transformToNameValuePair(fields));
    };

    get customerInformationFieldMap() {
        const {
            showTaxVatNumber,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            showEmailChangeField,
            showPasswordChangeField,
            customer: {
                firstname = '',
                lastname = '',
                taxvat = '',
                email = ''
            }
        } = this.props;

        return customerInformationFields({
            showTaxVatNumber,
            firstname,
            lastname,
            taxvat,
            email,
            handleChangePasswordCheckbox,
            handleChangeEmailCheckbox,
            showEmailChangeField,
            showPasswordChangeField
        });
    }

    get emailAndPasswordFieldMap() {
        const {
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email
        } = this.props;

        return customerEmailAndPasswordFields({
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email
        });
    }

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccountInformation', elem: 'Submit' } }
            >
                { __('Save') }
            </button>
        );
    }

    getFormProps() {
        return {
            onSubmit: this.onFormSuccess
        };
    }

    renderFormBody() {
        return (
            <div block="FieldForm" elem="Body">
                <div block="FieldForm" elem="Fields">
                    <div block="FieldForm" elem="Section">
                        { this.customerInformationFieldMap.map(this.renderSection) }
                    </div>
                    <div block="FieldForm" elem="Section">
                        { this.emailAndPasswordFieldMap.map(this.renderSection) }
                    </div>
                </div>
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerForm;

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

import FieldForm from 'Component/FieldForm';
import { ReactElement } from 'Type/Common.type';
import transformToNameValuePair from 'Util/Form/Transform';

import { customerEmailAndPasswordFields, customerInformationFields } from './MyAccountCustomerForm.form';
import { MyAccountCustomerFormComponentProps } from './MyAccountCustomerForm.type';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm<MyAccountCustomerFormComponentProps> {
    static defaultProps = {
        email: '',
        currentPassword: ''
    };

    onFormSuccess(form, fields): void {
        const { onSave } = this.props;
        onSave(transformToNameValuePair(fields));
    }

    get customerInformationFieldMap() {
        const {
            showTaxVatNumber,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            showEmailChangeField,
            showPasswordChangeField,
            vatNumberRequired,
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
            showPasswordChangeField,
            vatNumberRequired
        });
    }

    get emailAndPasswordFieldMap() {
        const {
            minimunPasswordCharacter,
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email,
            range
        } = this.props;

        return customerEmailAndPasswordFields({
            minimunPasswordCharacter,
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email,
            range
        });
    }

    renderActions(): ReactElement {
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
            onSubmit: this.onFormSuccess.bind(this)
        };
    }

    renderEmailAndPasswordFields(): ReactElement {
        const { showEmailChangeField, showPasswordChangeField } = this.props;

        if (!showEmailChangeField && !showPasswordChangeField) {
            return null;
        }

        return (
            <>
                <legend
                  block="FieldForm"
                  elem="Legend"
                >
                    { __('Change %s', this.getLegendString()) }
                </legend>
                { this.emailAndPasswordFieldMap.map(this.renderSection) }
            </>
        );
    }

    getLegendString(): string {
        const { showEmailChangeField, showPasswordChangeField } = this.props;

        if (showEmailChangeField && !showPasswordChangeField) {
            return 'Email';
        }

        if (!showEmailChangeField && showPasswordChangeField) {
            return 'Password';
        }

        return 'Email and Password';
    }

    renderFormBody(): ReactElement {
        return (
            <div block="FieldForm" elem="Body">
                <div block="FieldForm" elem="Fields">
                    <div block="FieldForm" elem="Section">
                    <legend
                      block="FieldForm"
                      elem="Legend"
                    >
                        { __('Account Information') }
                    </legend>
                        { this.customerInformationFieldMap.map(this.renderSection) }
                    </div>
                    <div
                      block="FieldForm"
                      elem="Section"
                      mix={ { block: 'FieldForm', elem: 'SectionWithSpace' } }
                    >
                        { this.renderEmailAndPasswordFields() }
                    </div>
                </div>
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerForm;

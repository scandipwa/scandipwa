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

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ChangeCustomerPasswordOptions, SignInOptions } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCustomerUpdateInput } from 'Type/Graphql.type';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';

import { customerEmailAndPasswordFields, customerInformationFields } from './MyAccountCustomerForm.form';
import { MyAccountCustomerFormComponentProps } from './MyAccountCustomerForm.type';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm<MyAccountCustomerFormComponentProps> {
    static defaultProps: Partial<MyAccountCustomerFormComponentProps> = {
        email: '',
        currentPassword: '',
    };

    onFormSuccess(form: HTMLFormElement, fields: FieldData[]): void {
        const { onSave } = this.props;

        onSave(transformToNameValuePair<
        ChangeCustomerPasswordOptions
        & SignInOptions
        & GQLCustomerUpdateInput>(fields));
    }

    get customerInformationFieldMap(): Partial<FieldContainerProps>[] {
        const {
            showTaxVatNumber,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            showEmailChangeField,
            showPasswordChangeField,
            vatNumberRequired,
            customer,
        } = this.props;

        return customerInformationFields({
            showTaxVatNumber,
            customer,
            handleChangePasswordCheckbox,
            handleChangeEmailCheckbox,
            showEmailChangeField,
            showPasswordChangeField,
            vatNumberRequired,
        });
    }

    get emailAndPasswordFieldMap(): Partial<FieldContainerProps>[] {
        const {
            minimunPasswordCharacter,
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email,
            range,
        } = this.props;

        return customerEmailAndPasswordFields({
            minimunPasswordCharacter,
            showEmailChangeField,
            showPasswordChangeField,
            handlePasswordInput,
            handleEmailInput,
            currentPassword,
            email,
            range,
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

    getFormProps(): Partial<FormContainerProps> {
        return {
            onSubmit: this.onFormSuccess.bind(this),
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

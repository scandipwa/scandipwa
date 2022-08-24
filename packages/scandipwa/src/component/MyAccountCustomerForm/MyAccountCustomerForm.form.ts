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

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';

import {
    MyAccountCustomerFormComponentProps,
    MyAccountCustomerFormEmailAndPasswordProps,
    MyAccountCustomerFormInformationProps
} from './MyAccountCustomerForm.type';

/**
 * Returns customer forms fields
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}]|*[]]}
 * @namespace Component/MyAccountCustomerForm/Form/customerInformationFields */
export const customerInformationFields = (
    props: Pick<MyAccountCustomerFormComponentProps, MyAccountCustomerFormInformationProps>
): Partial<FieldContainerProps>[] => {
    const {
        customer: {
            firstname = '',
            lastname = '',
            taxvat = ''
        },
        showTaxVatNumber,
        handleChangeEmailCheckbox,
        handleChangePasswordCheckbox,
        showEmailChangeField,
        showPasswordChangeField,
        vatNumberRequired
    } = props;

    return [
        {
            type: FieldType.TEXT,
            label: __('First Name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FieldType.TEXT,
            label: __('Last Name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        ...(showTaxVatNumber ? [
            {
                type: FieldType.TEXT,
                label: __('Tax/VAT Number'),
                attr: {
                    name: 'taxvat',
                    defaultValue: taxvat,
                    placeholder: __('Your tax/VAT number')
                },
                addRequiredTag: vatNumberRequired,
                validateOn: ['onChange'],
                validationRule: {
                    isRequired: vatNumberRequired
                }
            }
        ] : []),
        {
            type: FieldType.CHECKBOX,
            attr: {
                name: 'showEmailChangeField',
                defaultChecked: showEmailChangeField
            },
            events: {
                onChange: handleChangeEmailCheckbox
            },
            label: __('Change Email')
        },
        {
            type: FieldType.CHECKBOX,
            attr: {
                name: 'showPasswordChangeField',
                defaultChecked: showPasswordChangeField
            },
            events: {
                onChange: handleChangePasswordCheckbox
            },
            label: __('Change Password')
        }
    ];
};

/**
 * Returns customer email and password forms fields
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}]|*[]]}
 * @namespace Component/MyAccountCustomerForm/Form/customerEmailAndPasswordFields */
export const customerEmailAndPasswordFields = (
    props: Pick<MyAccountCustomerFormComponentProps, MyAccountCustomerFormEmailAndPasswordProps>
): Partial<FieldContainerProps>[] => {
    const {
        minimunPasswordCharacter,
        showEmailChangeField,
        showPasswordChangeField,
        handleEmailInput,
        handlePasswordInput,
        currentPassword,
        email,
        range
    } = props;

    return [
        ...(showEmailChangeField ? [
            {
                type: FieldType.EMAIL,
                label: __('Email'),
                attr: {
                    name: 'email',
                    value: email,
                    placeholder: __('Your new email'),
                    'aria-label': __('Current password')
                },
                events: {
                    onChange: handleEmailInput
                },
                addRequiredTag: true,
                validateOn: ['onChange'],
                validationRule: {
                    inputType: ValidationInputType.EMAIL,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField || showEmailChangeField ? [
            {
                label: __('Current password'),
                type: FieldType.PASSWORD,
                attr: {
                    id: 'currentPassword',
                    name: 'password',
                    placeholder: __('Your current password'),
                    'aria-label': __('Current password'),
                    value: currentPassword
                },
                events: {
                    onChange: handlePasswordInput
                },
                addRequiredTag: true,
                validateOn: ['onChange'],
                validationRule: {
                    inputType: ValidationInputType.PASSWORD,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField ? [
            {
                label: __('New password'),
                type: FieldType.PASSWORD,
                attr: {
                    id: 'newPassword',
                    name: 'newPassword',
                    placeholder: __('Your new password'),
                    'aria-label': __('New password')
                },
                addRequiredTag: true,
                validateOn: ['onChange'],
                validationRule: {
                    inputType: ValidationInputType.PASSWORD,
                    isRequired: true,
                    match: (value: string) => {
                        const password = document.getElementById('currentPassword') as HTMLInputElement;

                        if (value && password.value === value) {
                            return __('New passwords can\'t be the same as old password!');
                        }

                        return validatePassword(value, range, minimunPasswordCharacter);
                    }
                }
            },
            {
                type: FieldType.PASSWORD,
                label: __('Confirm New Password '),
                attr: {
                    name: 'confirmNewPassword',
                    placeholder: __('Confirm New password'),
                    'aria-label': __('Confirm New password')
                },
                addRequiredTag: true,
                validateOn: ['onChange'],
                validationRule: {
                    isRequired: true,
                    inputType: ValidationInputType.PASSWORD,
                    match: (value: string) => {
                        const password = document.getElementById('newPassword') as HTMLInputElement;

                        return password.value === value;
                    },
                    customErrorMessages: {
                        onMatchFail: __('Passwords do not match!')
                    }
                }
            }
        ] : [])
    ];
};

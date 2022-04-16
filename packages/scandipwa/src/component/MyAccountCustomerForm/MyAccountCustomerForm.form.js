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

import FieldType from 'Component/Field/Field.config';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';

/**
 * Returns customer forms fields
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}]|*[]]}
 * @namespace Component/MyAccountCustomerForm/Form/customerInformationFields */
export const customerInformationFields = (props) => {
    const {
        firstname,
        lastname,
        taxvat,
        showTaxVatNumber,
        handleChangeEmailCheckbox,
        handleChangePasswordCheckbox,
        showEmailChangeField,
        showPasswordChangeField,
        vatNumberRequired
    } = props;

    return [
        {
            type: FieldType.text,
            label: __('First Name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name')
            },
            addRequiredTag: true,
            validateOn: [ 'onChange' ],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FieldType.text,
            label: __('Last Name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name')
            },
            addRequiredTag: true,
            validateOn: [ 'onChange' ],
            validationRule: {
                isRequired: true
            }
        },
        ...(showTaxVatNumber ? [
            {
                type: FieldType.text,
                label: __('Tax/VAT Number'),
                attr: {
                    name: 'taxvat',
                    defaultValue: taxvat,
                    placeholder: __('Your tax/VAT number')
                },
                addRequiredTag: vatNumberRequired,
                validateOn: [ 'onChange' ],
                validationRule: {
                    isRequired: vatNumberRequired
                }
            }
        ] : []),
        {
            type: FieldType.checkbox,
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
            type: FieldType.checkbox,
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
export const customerEmailAndPasswordFields = (props) => {
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
                type: FieldType.email,
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
                validateOn: [ 'onChange' ],
                validationRule: {
                    inputType: ValidationInputType.email,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField || showEmailChangeField ? [
            {
                label: __('Current password'),
                type: FieldType.password,
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
                validateOn: [ 'onChange' ],
                validationRule: {
                    inputType: ValidationInputType.password,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField ? [
            {
                label: __('New password'),
                type: FieldType.password,
                attr: {
                    id: 'newPassword',
                    name: 'newPassword',
                    placeholder: __('Your new password'),
                    'aria-label': __('New password')
                },
                addRequiredTag: true,
                validateOn: [ 'onChange' ],
                validationRule: {
                    inputType: ValidationInputType.password,
                    isRequired: true,
                    match: (value) => {
                        const password = document.getElementById('currentPassword');

                        if (value && password.value === value) {
                            return __('New passwords can\'t be the same as old password!');
                        }

                        return validatePassword(value, range, minimunPasswordCharacter);
                    }
                }
            },
            {
                type: FieldType.password,
                label: __('Confirm New Password '),
                attr: {
                    name: 'confirmNewPassword',
                    placeholder: __('Confirm New password'),
                    'aria-label': __('Confirm New password')
                },
                addRequiredTag: true,
                validateOn: [ 'onChange' ],
                validationRule: {
                    isRequired: true,
                    inputType: ValidationInputType.password,
                    match: (value) => {
                        const password = document.getElementById('newPassword');
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

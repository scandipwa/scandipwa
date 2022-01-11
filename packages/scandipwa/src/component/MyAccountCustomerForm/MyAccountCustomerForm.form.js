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

import FIELD_TYPE from 'Component/Field/Field.config';
import {
    MIN_CHARACTER_SETS_IN_PASSWORD
} from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { getNumberOfCharacterClasses } from 'Util/Validator';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

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
            type: FIELD_TYPE.text,
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
            type: FIELD_TYPE.text,
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
                type: FIELD_TYPE.text,
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
            type: FIELD_TYPE.checkbox,
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
            type: FIELD_TYPE.checkbox,
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
        showErrorNotification,
        showEmailChangeField,
        showPasswordChangeField,
        handleEmailInput,
        handlePasswordInput,
        currentPassword,
        email
    } = props;

    return [
        ...(showEmailChangeField ? [
            {
                type: FIELD_TYPE.email,
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
                    inputType: VALIDATION_INPUT_TYPE.email,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField || showEmailChangeField ? [
            {
                label: __('Current password'),
                type: FIELD_TYPE.password,
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
                    inputType: VALIDATION_INPUT_TYPE.password,
                    isRequired: true
                }
            }
        ] : []),
        ...(showPasswordChangeField ? [
            {
                label: __('New password'),
                type: FIELD_TYPE.password,
                attr: {
                    id: 'newPassword',
                    name: 'newPassword',
                    placeholder: __('Your new password'),
                    'aria-label': __('New password')
                },
                addRequiredTag: true,
                validateOn: ['onChange', 'onSubmit'],
                validationRule: {
                    inputType: VALIDATION_INPUT_TYPE.password,
                    isRequired: true,
                    match: (value) => {
                        const password = document.getElementById('currentPassword');

                        if (value && password.value === value) {
                            return __('New passwords can\'t be the same as old password!');
                        }

                        if (event.type === 'submit') {
                            // Number of different character classes in a password
                            const counter = getNumberOfCharacterClasses(value);

                            if (counter < MIN_CHARACTER_SETS_IN_PASSWORD) {
                                showErrorNotification(
                                    __('Minimum of different classes of characters in password is %s.',
                                        MIN_CHARACTER_SETS_IN_PASSWORD)
                                    + __('Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
                                );

                                return '';
                            }
                        }

                        return true;
                    },
                    range: {
                        min: 8
                    }
                }
            },
            {
                type: FIELD_TYPE.password,
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
                    inputType: VALIDATION_INPUT_TYPE.password,
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

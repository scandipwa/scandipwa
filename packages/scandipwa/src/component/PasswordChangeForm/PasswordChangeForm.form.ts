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

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';
import { ValidationRule } from 'Util/Validator/Validator.type';

/**
 * Returns password change forms fields
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}]|*[]]}
 * @namespace Component/PasswordChangeForm/Form/customerEmailAndPasswordFields */
export const customerEmailAndPasswordFields = (
    range: ValidationRule['range'],
    minimunPasswordCharacter: string
): Partial<FieldContainerProps>[] => [
    {
        type: FieldType.PASSWORD,
        label: __('New password'),
        attr: {
            id: 'password',
            name: 'password',
            placeholder: __('Enter your password'),
            autoComplete: 'new-password'
        },
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true,
            inputType: ValidationInputType.PASSWORD,
            match: (value: string) => validatePassword(value, range, minimunPasswordCharacter)
        },
        addRequiredTag: true
    },
    {
        type: FieldType.PASSWORD,
        label: __('Confirm password'),
        attr: {
            id: 'password_confirmation',
            name: 'password_confirmation',
            placeholder: __('Retype your password'),
            autoComplete: 'new-password'
        },
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true,
            inputType: ValidationInputType.PASSWORD,
            match: (value: string) => {
                const password = document.getElementById('password') as HTMLInputElement;
                return password.value === value;
            },
            customErrorMessages: {
                onMatchFail: __('Passwords do not match!')
            }
        },
        addRequiredTag: true
    }
];

export default customerEmailAndPasswordFields;

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
import { ValidationRule } from 'Util/Validator/Validator.type';

/**
 * Returns password change forms fields
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}, ...[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue, name: string, placeholder: *}}]|*[]]}
 * @namespace Component/PasswordChangeForm/Form/customerEmailAndPasswordFields */
<<<<<<< HEAD:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.form.ts
export const customerEmailAndPasswordFields = (
    range: ValidationRule['range'],
    minimunPasswordCharacter: string
): Partial<FieldContainerProps>[] => [
=======
export const customerEmailAndPasswordFields = (range, minimunPasswordCharacter, passwordRef) => [
>>>>>>> scandipwa/master:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.form.js
    {
        type: FieldType.PASSWORD,
        label: __('New password'),
        elemRef: passwordRef,
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
<<<<<<< HEAD:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.form.ts
            inputType: ValidationInputType.PASSWORD,
            match: (value: string) => {
                const password = document.getElementById('password') as HTMLInputElement;
                return password.value === value;
=======
            inputType: VALIDATION_INPUT_TYPE.password,
            match: (value) => {
                const password = passwordRef.current;

                return value && password.value === value;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.form.js
            },
            customErrorMessages: {
                onMatchFail: __('Passwords do not match!')
            }
        },
        addRequiredTag: true
    }
];

export default customerEmailAndPasswordFields;

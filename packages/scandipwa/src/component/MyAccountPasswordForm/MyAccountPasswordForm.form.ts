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
 * Returns password-change fields
 * @returns {[{addRequiredTag: boolean, validateOn: [string], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {name: string, id: string, placeholder: *, 'aria-label': *}}, {addRequiredTag: boolean, validateOn: [string], validationRule: {isRequired: boolean, match: (function(*=)), range: {min: number}, inputType: string, customErrorMessages: {onMatchFail: *}}, label: *, type: string, attr: {name: string, id: string, placeholder: *, 'aria-label': *}}]}
 * @namespace Component/MyAccountPasswordForm/Form/myAccountPasswordForm
 */
export const myAccountPasswordForm = (
    range: ValidationRule['range'],
    minimunPasswordCharacter: string
): Partial<FieldContainerProps>[] => [
    {
        label: __('Current password'),
        type: FieldType.PASSWORD,
        attr: {
            id: 'my-account-currentPassword',
            name: 'currentPassword',
            placeholder: __('Your current password'),
            'aria-label': __('Current password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: ValidationInputType.PASSWORD,
            isRequired: true
        }
    },
    {
        label: __('New password'),
        type: FieldType.PASSWORD,
        attr: {
            id: 'my-account-newPassword',
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
                const password = document.getElementById('my-account-currentPassword') as HTMLInputElement;

                if (value && password.value === value) {
                    return __('New passwords can\'t be the same as old password!');
                }

                return validatePassword(value, range, minimunPasswordCharacter);
            }
        }
    }
];

export default myAccountPasswordForm;

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
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

/**
 * Returns password-change fields
 * @returns {[{addRequiredTag: boolean, validateOn: [string], validationRule: {isRequired: boolean, inputType: string}, label: *, type: string, attr: {name: string, id: string, placeholder: *, 'aria-label': *}}, {addRequiredTag: boolean, validateOn: [string], validationRule: {isRequired: boolean, match: (function(*=)), range: {min: number}, inputType: string, customErrorMessages: {onMatchFail: *}}, label: *, type: string, attr: {name: string, id: string, placeholder: *, 'aria-label': *}}]}
 * @namespace Component/MyAccountPasswordForm/Form/myAccountPasswordForm
 */
export const myAccountPasswordForm = () => [
    {
        label: __('Current password'),
        type: FIELD_TYPE.password,
        attr: {
            id: 'my-account-currentPassword',
            name: 'currentPassword',
            placeholder: __('Your current password'),
            'aria-label': __('Current password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.password,
            isRequired: true
        }
    },
    {
        label: __('New password'),
        type: FIELD_TYPE.password,
        attr: {
            id: 'my-account-newPassword',
            name: 'newPassword',
            placeholder: __('Your new password'),
            'aria-label': __('New password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.password,
            isRequired: true,
            match: (value) => {
                const password = document.getElementById('my-account-currentPassword');

                if (value && password.value === value) {
                    return __('New passwords can\'t be the same as old password!');
                }

                const counter = !!(value.match(/\d+/))
                                + !!(value.match(/[a-z]+/))
                                + !!(value.match(/[A-Z]+/))
                                + !!(value.match(/[^a-zA-Z0-9]+/));

                if (counter < MIN_CHARACTER_SETS_IN_PASSWORD) {
                    return __('Minimum of different classes of characters in password is %s.',
                        MIN_CHARACTER_SETS_IN_PASSWORD)
                                    + __('Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
                }

                return true;
            },
            range: {
                min: 8
            }
        }
    }
];

export default myAccountPasswordForm;

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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

export const myAccountPasswordForm = () => [
    {
        label: __('Current password'),
        type: FIELD_TYPE.password,
        attr: {
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
            name: 'newPassword',
            placeholder: __('Your new password'),
            'aria-label': __('New password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.password,
            isRequired: true
        }
    }
];

export default myAccountPasswordForm;

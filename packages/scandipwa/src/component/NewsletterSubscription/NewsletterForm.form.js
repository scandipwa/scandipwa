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

export const newsletterSubscriptionForm = () => [
    {
        type: FIELD_TYPE.email,
        attr: {
            name: 'newsletterEmail',
            placeholder: __('Enter your email address'),
            'aria-label': __('Email address')
        },
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.email,
            isRequired: true
        }
    }
];

export default newsletterSubscriptionForm;

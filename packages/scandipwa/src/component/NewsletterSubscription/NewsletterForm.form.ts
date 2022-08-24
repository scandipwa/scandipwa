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
import { ValidationInputType } from 'Util/Validator/Config';

/**
 * Returns fields for newsletter
 * @returns {[{validateOn: [string], validationRule: {isRequired: boolean, inputType: string}, type: string, attr: {name: string, placeholder: *, 'aria-label': *}}]}
 * @namespace Component/NewsletterSubscription/NewsletterForm/Form/newsletterSubscriptionForm */
export const newsletterSubscriptionForm = (): Partial<FieldContainerProps>[] => [
    {
        type: FieldType.EMAIL,
        attr: {
            name: 'newsletterEmail',
            placeholder: __('Enter your email address'),
            'aria-label': __('Email address')
        },
        validateOn: ['onChange'],
        validationRule: {
            inputType: ValidationInputType.EMAIL,
            isRequired: true
        }
    }
];

export default newsletterSubscriptionForm;

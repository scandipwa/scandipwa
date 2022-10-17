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
 * Returns fields for share wishlist form
 * @returns {Object}
 * @namespace Component/ShareWishlistForm/Form/shareWishlistForm
 */
export const shareWishlistForm = (): Partial<FieldContainerProps>[] => [
    {
        type: FieldType.EMAIL,
        label: __('Email addresses, separated by commas'),
        attr: {
            name: 'emails',
            placeholder: __('Email addresses, separated by commas'),
            'aria-label': __('Email address'),
        },
        validateOn: ['onChange'],
        validationRule: {
            inputType: ValidationInputType.EMAILLIST,
            isRequired: true,
        },
        addRequiredTag: true,
    },
    {
        label: __('Message'),
        type: FieldType.TEXTAREA,
        validateOn: ['onChange'],
        attr: {
            name: 'message',
            placeholder: __('Message'),
            'aria-label': __('Message'),
        },
        validationRule: {
            isRequired: false,
        },
    },
];

export default shareWishlistForm;

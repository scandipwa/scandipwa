/* eslint-disable no-useless-escape */
/* eslint-disable max-len */

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

export const MIN_PASSWORD_LENGTH = 8;

export default {
    email: {
        validate: ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
        message: __('Email is invalid.')
    },
    password: {
        validate: ({ value }) => value.length >= MIN_PASSWORD_LENGTH,
        message: __('Password should be at least 8 characters long')
    },
    telephone: {
        validate: ({ value }) => value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/),
        message: __('Phone number is invalid!')
    },
    notEmpty: {
        validate: ({ value }) => value.length > 0,
        message: __('This field is required!')
    },
    password_match: {
        validate: ({ value }, { password }) => {
            const { current: { value: passwordValue } } = password || { current: {} };
            return value === passwordValue;
        },
        message: __('Password does not match.')
    }
};

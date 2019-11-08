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

const validateEmail = ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
const validateEmails = ({ value }) => value.split(',').every(email => validateEmail({ value: email.trim() }));
const validatePassword = ({ value }) => value.match(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*[a-z])(?=.*[\$\%\&])).{8,16}$/);
const validateTelephone = ({ value }) => value.length > 0 && value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/);
const isNotEmpty = ({ value }) => value.length > 0;

export default {
    email: {
        validate: validateEmail,
        message: __('Email is invalid.')
    },
    emails: {
        validate: validateEmails,
        message: __('Email addresses are not valid')
    },
    password: {
        validate: validatePassword,
        message: __('Password should be at least 8 characters long, include at least on upper case letter, number and symbol!')
    },
    telephone: {
        validate: validateTelephone,
        message: __('Phone number is invalid!')
    },
    notEmpty: {
        validate: isNotEmpty,
        message: __('This field is required!')
    }
};

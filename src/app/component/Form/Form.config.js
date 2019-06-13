/* eslint-disable max-len */

export default {
    email: {
        validate: ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
        message: __('Email is invalid.')
    },
    password: {
        validate: ({ value }) => value.match(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*[a-z])(?=.*[\$\%\&])).{8,16}$/),
        message: __('Password should be at least 8 characters long, include at least on upper case letter, number and symbol!')
    },
    telephone: {
        validate: ({ value }) => value.length > 0 && value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/),
        message: __('Phone number is invalid!')
    },
    notEmpty: {
        validate: ({ value }) => value.length > 0,
        message: __('This field is required!')
    }
};

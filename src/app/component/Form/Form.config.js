export default {
    email: {
        validate: ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
        message: 'Email is invalid.'
    },
    password: {
        validate: ({ value }) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        message: 'Password should be at least 8 characters long, include at least on upper case letter, number and symbol!'
    },
    telephone: {
        validate: ({ value }) => value.length > 0 && value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/),
        message: 'Phone number is invalid!'
    },
    notEmpty: {
        validate: ({ value }) => value.length > 0,
        message: 'This field is required!'
    }
};

const Joi = require('@hapi/joi');

// Registration validate
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).require(),
        email: Joi.string().min(6).require.email(),
        password: Joi.string().min(6).require()
    };
    return Joi.validate(data, schema);
}

// Login validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).require.email(),
        password: Joi.string().min(6).require()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
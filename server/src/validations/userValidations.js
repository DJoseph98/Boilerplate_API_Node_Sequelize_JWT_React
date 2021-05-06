const Joi = require('joi')

const signUpSchema = Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required().min(8)
})

const forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required()
})

const resetPasswordSchema = Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
})

module.exports = { signUpSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema }
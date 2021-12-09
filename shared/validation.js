const Joi = require('joi');

const validate = {
    registerUser: Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),
    }),
    loginUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),
    }),
    forgotPassword: Joi.object({
        email: Joi.string().email().required(),
    }),
    passwordReset: Joi.object({
        password: Joi.string().min(6).max(16).required(),

    }),
    addURL: Joi.object({
        original: Joi.string().required(),
    }),
    deleteURL: Joi.object({
        id: Joi.string().min(24).max(24).required(),
    }),
    updateEvent: Joi.object({
        name: Joi.string().optional(),
        dateTime: Joi.string().optional(),
        duration:Joi.string().required(),
        description: Joi.optional(),
        priority: Joi.string().optional(),
        status: Joi.string().optional(),
        contact: Joi.string().optional(),
        type: Joi.string().optional(),
        notes: Joi.optional(),
        location: Joi.optional(),
        link: Joi.optional()
    }),
    getEventsByType: Joi.object({
        type: Joi.string().min(5).required(),
    }),
}

module.exports = validate;
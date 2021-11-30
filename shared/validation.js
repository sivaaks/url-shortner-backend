const Joi = require('joi');

const validate = {
    registerUser: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),
        phone: Joi.optional(),
        type: Joi.string().required(),
    }),
    loginUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),
    }),
    forgotPassword: Joi.object({
        email: Joi.string().email().required(),
    }),
    passwordReset: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),

    }),
    addEvent: Joi.object({
        name: Joi.string().required(),
        dateTime: Joi.string().required(),
        priority: Joi.string().required(),
        status: Joi.string().required(),
        contact: Joi.string().optional(),
        type: Joi.string().required(),
        notes: Joi.optional(),
        location: Joi.optional(),
        link: Joi.optional(),
        description: Joi.optional(),
    }),
    deleteEvent: Joi.object({
        id: Joi.string().min(24).max(24).required(),
    }),
    updateEvent: Joi.object({
        name: Joi.string().optional(),
        dateTime: Joi.string().optional(),
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
    contacts: Joi.object({
        name: Joi.string().required(),
        phone: Joi.optional(),
        email: Joi.string().email().required(),
    }),
    contactName: Joi.object({
        name: Joi.string().min(1).required(),
    }),
    personalDiary: Joi.object({
        date: Joi.string().required(),
        content: Joi.string().min(10).max(255).required(),
    })
}

module.exports = validate;
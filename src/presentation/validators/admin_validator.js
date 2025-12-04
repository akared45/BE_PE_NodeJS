const Joi = require('joi');
const { ValidationException } = require('../../domain/exceptions');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map(d => d.message);
        return next(new ValidationException('Invalid data', messages));
    }
    next();
};

const feeSchema = Joi.object({
    base: Joi.number().min(0).required(),
    increment: Joi.number().min(0).default(0),
    level: Joi.string().optional(),
    final: Joi.number().min(0).required()
});

const qualificationSchema = Joi.object({
    degree: Joi.string().required(),
    institution: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear())
});

const workHistorySchema = Joi.object({
    position: Joi.string().required(),
    place: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date().allow(null)
});

const schemas = {
    createDoctor: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        fullName: Joi.string().required(),
        licenseNumber: Joi.string().required(),
        specCode: Joi.string().required(),
        fee: feeSchema.optional(),
        qualifications: Joi.array().items(qualificationSchema).optional(),
        workHistory: Joi.array().items(workHistorySchema).optional()
    }),

    updateDoctor: Joi.object({
        fullName: Joi.string().optional(),
        licenseNumber: Joi.string().optional(),
        specCode: Joi.string().optional(),
        fee: feeSchema.optional(),
        isActive: Joi.boolean().optional(),
        qualifications: Joi.array().items(qualificationSchema).optional(),
        workHistory: Joi.array().items(workHistorySchema).optional()
    })
};

module.exports = {
    validateCreateDoctor: validate(schemas.createDoctor),
    validateUpdateDoctor: validate(schemas.updateDoctor)
};
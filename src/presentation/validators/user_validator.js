const Joi = require('joi');
const { ValidationException } = require('../../domain/exceptions');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return next(new ValidationException('Invalid data', error.details.map(d => d.message)));
    next();
};

const schemas = {
    updatePatientProfile: Joi.object({
        email: Joi.string().email().optional(),
        contacts: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('phone', 'email').required(),
                value: Joi.string().required(),
                isPrimary: Joi.boolean()
            })
        ).optional(),
        medicalConditions: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                status: Joi.string(),
                diagnosedDate: Joi.date()
            })
        ).optional(),
        allergies: Joi.array().items(
            Joi.object({ name: Joi.string().required() })
        ).optional()
    })
};

module.exports = {
    validateUpdatePatient: validate(schemas.updatePatientProfile)
};
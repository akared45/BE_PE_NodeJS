const Joi = require('joi');
const { ValidationException } = require('../../domain/exceptions');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map(d => d.message);
        return next(new ValidationException('Invalid booking data', messages));
    }
    next();
};

const schemas = {
    bookAppointment: Joi.object({
        doctorId: Joi.string().required(),
        appointmentDate: Joi.date().iso().greater('now').required().messages({
            'date.greater': 'Appointment date must be in the future'
        }),
        symptoms: Joi.string().required(),
        notes: Joi.string().allow('', null)
    })
};

module.exports = {
    validateBooking: validate(schemas.bookAppointment)
};
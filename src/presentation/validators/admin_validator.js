const Joi = require('joi');
const { ValidationException } = require('../../domain/exceptions');

const validate = (schema) => (req, res, next) => {
  // --- THÊM DÒNG NÀY ĐỂ DEBUG ---
  console.log('🔍 Validating payload:', req.body);
  console.log('📋 Using Schema Keys:', schema.$_terms.keys.map(k => k.key));
  // ------------------------------

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

const schemas = {
    createDoctor: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        fullName: Joi.string().required(),
        licenseNumber: Joi.string().required(),
        specCode: Joi.string().required(),
        fee: feeSchema.optional()
    }),

    updateDoctor: Joi.object({
        fullName: Joi.string().optional(),
        licenseNumber: Joi.string().optional(),
        specCode: Joi.string().optional(),
        fee: feeSchema.optional(),
        isActive: Joi.boolean().optional()
    })
};

module.exports = {
    validateCreateDoctor: validate(schemas.createDoctor),
    validateUpdateDoctor: validate(schemas.updateDoctor)
};
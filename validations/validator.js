const Joi = require("joi");

// general validator function that validate any schema
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

// register validation
const registerSchema = Joi.object({
  mobile: Joi.string().min(9).required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  national_id: Joi.string().required(),
});

// Login validtion
const loginShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

exports.validateLogin = validator(loginShema);
exports.validateRegister = validator(registerSchema);

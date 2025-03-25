import Joi from "joi";

export const registerUserValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().valid('user', 'vendor').required()
}).with("password", "confirmPassword");


export const loginUserValidator = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required()
});


export const updateProfileValidator = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  profilePicture: Joi.string().required(),
  phoneNumber: Joi.string().trim().optional()
});
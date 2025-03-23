import Joi from "joi";

export const registerUserValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  role: Joi.string().valid('user', 'vendor').required()
});


export const loginUserValidator = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required()
});


export const updateProfileValidator = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  profilePicture: Joi.string().uri().optional()
});
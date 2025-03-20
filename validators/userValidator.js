import Joi from "joi";

export const adValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string().required()
  });
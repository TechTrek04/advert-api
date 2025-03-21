import Joi from "joi";

export const createAdValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().valid("Audios",
        "Cameras",
        "Computers",
        "Gaming",
        "Kitchen",
        "Office",
        "Mobiles",
        "Robots",
        "Sport",
        "Televisions").required()
  });

  export const updateAdValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().valid("Audios",
        "Cameras",
        "Computers",
        "Gaming",
        "Kitchen",
        "Office",
        "Mobiles",
        "Robots",
        "Sport",
        "Televisions").required()
  });

  export const replaceAdValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().valid("Audios",
        "Cameras",
        "Computers",
        "Gaming",
        "Kitchen",
        "Office",
        "Mobiles",
        "Robots",
        "Sport",
        "Televisions").required()
  });
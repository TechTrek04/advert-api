import Joi from "joi";

export const createAdValidator = Joi.object({
  title: Joi.string().required(),
  shortDescription: Joi.string().required(),
  detailedDescription: Joi.string().required(),
  pictures: Joi.array().items(Joi.string().required()),
  price: Joi.number().required(),
  priceTerm: Joi.string().valid("Negotiable",
      "Not Negotiable",
     ).required(),
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
    shortDescription: Joi.string().required(),
    detailedDescription: Joi.string().required(),
    pictures: Joi.array().items(Joi.string().required()),
    price: Joi.number().required(),
    priceTerm: Joi.string().valid("Negotiable",
        "Not Negotiable",
       ).required(),
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
    shortDescription: Joi.string().required(),
    detailedDescription: Joi.string().required(),
    pictures: Joi.array().items(Joi.string().required()),
    price: Joi.number().required(),
    priceTerm: Joi.string().valid("Negotiable",
        "Not Negotiable",
       ).required(),
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
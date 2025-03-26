import mongoose, { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const adSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    pictures: { type: [String], required: true },
    price: { type: Number, required: true },
    priceTerm: {
      type: String,
      enum: ["Negotiable", "Not Negotiable"],
    },
    category: {
      type: String,
      enum: [
        "Audios",
        "Cameras",
        "Computers",
        "Gaming",
        "Kitchen",
        "Office",
        "Mobiles",
        "Robots",
        "Sport",
        "Televisions",
      ],
    },
  },
  { timestamps: true }
);

adSchema.plugin(normalize);

export const adModel = model("ad", adSchema);

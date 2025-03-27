import mongoose, { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const adSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
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
    contact: { type: Number, required: true },
    pictures: { type: [String], required: true },
   
    
    userId: { type: Types.ObjectId, ref: "Vendor", required: true },
    
  
  },
  {
    timestamps: true,
  }
  
);

adSchema.plugin(normalize);

export const adModel = model("ad", adSchema);

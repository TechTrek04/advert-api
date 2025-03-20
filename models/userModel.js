import mongoose, { Schema, model} from "mongoose";
import normalize from "normalize-mongoose";

const adSchema = new Schema({
    title:{type: String},
    description:{type: String},
    image:{type: String},
    price:{type: Number},
    category:{type: String}

}, {timestamps: true});

adSchema.plugin(normalize);

export const adModel = model("ad", adSchema)

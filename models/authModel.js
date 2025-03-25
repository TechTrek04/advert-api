import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose'

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['vendor', 'user'], default: 'user' },
  profilePicture: { type: String, default: "" }
}, { timestamps: true });

userSchema.plugin(normalize);

export const UserModel = model('User', userSchema)
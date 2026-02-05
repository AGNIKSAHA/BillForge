import mongoose, { Schema, Document,Types } from "mongoose";
import { IUser } from "./user.types.js";


export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: { type: String, required: true },

    isVerified: {
      type: Boolean,
      default: false
    },

    role: {
      type: String,
      enum: ["admin", "freelancer", "client"],
      default: "freelancer" 
    },

    verificationToken: { type: String, default: null },
    verificationExpires: { type: Date, default: null },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", userSchema);

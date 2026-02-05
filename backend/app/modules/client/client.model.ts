import mongoose, { Schema, Document } from "mongoose";
import { IClient } from "./client.types.js";

export interface IClientDocument extends IClient, Document {}

const clientSchema = new Schema<IClientDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IClientDocument>("Client", clientSchema);

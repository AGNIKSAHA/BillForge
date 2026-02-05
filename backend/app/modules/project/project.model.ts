import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "./project.types.js";

export interface IProjectDocument extends IProject, Document {}

const projectSchema = new Schema<IProjectDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },

    hourlyRate: { type: Number, required: true },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProjectDocument>(
  "Project",
  projectSchema
);

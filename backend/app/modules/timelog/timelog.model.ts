import mongoose, { Schema, Document } from "mongoose";
import { ITimeLog } from "./timelog.types.js";

export interface ITimeLogDocument extends ITimeLog, Document {}

const timelogSchema = new Schema<ITimeLogDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    startTime: { type: Date, required: true },
    endTime: { type: Date },

    duration: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ITimeLogDocument>(
  "TimeLog",
  timelogSchema
);

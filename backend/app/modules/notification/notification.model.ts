import mongoose, { Schema, Document } from "mongoose";
import { INotification } from "./notification.types.js";

export interface INotificationDocument
  extends INotification,
    Document {}

const notificationSchema = new Schema<INotificationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    message: { type: String, required: true },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<INotificationDocument>(
  "Notification",
  notificationSchema
);

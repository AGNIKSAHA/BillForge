import { Types } from "mongoose";
import Notification from "./notification.model.js";


export const createNotificationService = async (
  userId: Types.ObjectId,
  message: string
) => {
  return Notification.create({
    userId,
    message
  });
};


export const getNotificationsService = async (
  userId: Types.ObjectId
) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};


export const markNotificationReadService = async (
  userId: Types.ObjectId,
  notificationId: string
) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) throw new Error("Notification not found");

  return notification;
};

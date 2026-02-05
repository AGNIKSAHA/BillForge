import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";

import {
  getNotificationsService,
  markNotificationReadService
} from "./notification.service.js";

import { sendResponse } from "../../common/utils/response.js";
import { getStringParam } from "../../common/utils/request.js";



export const getNotifications = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const notifications = await getNotificationsService(
      req.user._id
    );

    sendResponse(res, 200, {
      success: true,
      data: notifications
    });
  }
);



export const markNotificationRead = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const notificationId = getStringParam(
      req.body.notificationId,
      "Notification ID"
    );

    const notification = await markNotificationReadService(
      req.user._id,
      notificationId
    );

    sendResponse(res, 200, {
      success: true,
      data: notification
    });
  }
);

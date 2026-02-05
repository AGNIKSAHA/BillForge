import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";

import {
  getProfileService,
  updateProfileService,
  changePasswordService
} from "./user.service.js";

import { sendResponse } from "../../common/utils/response.js";



export const getProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const user = await getProfileService(
      req.user._id
    );

    sendResponse(res, 200, {
      success: true,
      data: user
    });
  }
);



export const updateProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const user = await updateProfileService(
      req.user._id,
      req.body
    );

    sendResponse(res, 200, {
      success: true,
      data: user
    });
  }
);



export const changePassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    await changePasswordService(
      req.user._id,
      req.body
    );

    sendResponse(res, 200, {
      success: true,
      message: "Password updated successfully"
    });
  }
);

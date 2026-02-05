import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";
import { ENV } from "../../common/config/env.js";

import {
  signupService,
  verifyEmailService,
  loginService,
  forgotPasswordService,
  resetPasswordService
} from "./auth.service.js";

import { deleteRefreshToken } from "../token/token.service.js";
import { sendResponse } from "../../common/utils/response.js";



export const signup = catchAsync(
  async (req: Request, res: Response) => {

    await signupService(req.body);

    sendResponse(res, 201, {
      success: true,
      message: "Verification email sent"
    });
  }
);



export const verifyEmail = catchAsync(
  async (req: Request, res: Response) => {

    const token = req.query.token as string;

    await verifyEmailService(token);

    sendResponse(res, 200, {
      success: true,
      message: "Email verified"
    });
  }
);



export const login = catchAsync(
  async (req: Request, res: Response) => {

    const { accessToken, refreshToken } =
      await loginService(req.body);



    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: ENV.JWT_ACCESS_EXPIRES * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: ENV.JWT_REFRESH_EXPIRES * 1000
    });

    sendResponse(res, 200, {
      success: true,
      message: "Login successful"
    });
  }
);



export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {

    await forgotPasswordService(req.body.email);

    sendResponse(res, 200, {
      success: true,
      message: "Reset email sent"
    });
  }
);



export const resetPassword = catchAsync(
  async (req: Request, res: Response) => {

    const { token, password } = req.body;

    await resetPasswordService(token, password);

    sendResponse(res, 200, {
      success: true,
      message: "Password updated"
    });
  }
);



export const logout = catchAsync(
  async (req: Request, res: Response) => {

    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    sendResponse(res, 200, {
      success: true,
      message: "Logged out successfully"
    });
  }
);

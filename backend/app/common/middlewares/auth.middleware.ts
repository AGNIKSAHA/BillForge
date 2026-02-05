import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken
} from "../utils/jwt.js";

import { RefreshToken } from "../../modules/token/refreshToken.model.js";
import User from "../../modules/user/user.model.js";
import { ENV } from "../config/env.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    try {

      const decoded = verifyAccessToken(accessToken);

      req.user = { _id: decoded.userId } as any;

      return next();

    } catch (error) {

      if (!(error instanceof jwt.TokenExpiredError)) {

        res.status(401).json({
          success: false,
          message: "Invalid access token"
        });

        return;
      }
    }
  }

  try {

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) throw new Error();

    const decoded = verifyRefreshToken(refreshToken);

    const stored = await RefreshToken.findOne({
      token: refreshToken,
      userId: decoded.userId,
      expiresAt: { $gt: new Date() }
    });

    if (!stored) throw new Error();


    const user = await User.findById(decoded.userId);

    if (!user) throw new Error();

    const newAccessToken = signAccessToken({
      userId: user.id,
      role: user.role
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: ENV.JWT_ACCESS_EXPIRES * 1000
    });

    req.user = { _id: user.id } as any;

    next();

  } catch {

    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });

    return;
  }
};

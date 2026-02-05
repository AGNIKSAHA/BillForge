import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { RefreshToken } from "./refreshToken.model.js";

import {
  signAccessToken,
  verifyRefreshToken
} from "../../common/utils/jwt.js";
import User from "../user/user.model.js"; 



export const refreshAccessTokenService = async (
  refreshToken: string
): Promise<string> => {

  let decoded: { userId: string };

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Refresh token expired");
    }

    throw new Error("Invalid refresh token");
  }



  const stored = await RefreshToken.findOne({
    token: refreshToken,
    userId: decoded.userId,
    expiresAt: { $gt: new Date() }
  });

  if (!stored) {
    throw new Error("Refresh session not found");
  }



  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }



  return signAccessToken({
    userId: user.id,
    role: user.role
  });
};



export const revokeRefreshTokenService = async (
  refreshToken: string
): Promise<void> => {

  await RefreshToken.deleteOne({ token: refreshToken });
};



export const revokeAllUserTokensService = async (
  userId: Types.ObjectId
): Promise<void> => {

  await RefreshToken.deleteMany({ userId });
};


import { Types } from "mongoose";
import {RefreshToken} from "./refreshToken.model.js";

import {
  signAccessToken,
  signRefreshToken
} from "../../common/utils/jwt.js";

import { ENV } from "../../common/config/env.js";


export const createTokenService = async (
  userId: Types.ObjectId,
  role: string
) => {

  const payload = {
    userId: userId.toString(),
    role
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await RefreshToken.create({
    userId,
    token: refreshToken,
    expiresAt: new Date(
      Date.now() + ENV.JWT_REFRESH_EXPIRES * 1000
    )
  });

  return { accessToken, refreshToken };
};


/* =========================
   FIND REFRESH TOKEN
========================= */

export const findRefreshToken = async (
  token: string
) => {

  return RefreshToken.findOne({ token });
};

/* =========================
   DELETE REFRESH TOKEN
========================= */

export const deleteRefreshToken = async (
  token: string
) => {

  return RefreshToken.deleteOne({ token });
};

/* =========================
   DELETE ALL USER TOKENS
   (Logout All Devices)
========================= */

export const deleteAllUserTokens = async (
  userId: Types.ObjectId
) => {

  return RefreshToken.deleteMany({ userId });
};

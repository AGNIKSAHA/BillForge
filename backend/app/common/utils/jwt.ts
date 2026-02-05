import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

interface Payload {
  userId: string;
  role: string;
}


export const signAccessToken = (
  payload: Payload
): string => {

  return jwt.sign(
    payload,
    ENV.JWT_ACCESS_SECRET,
    {
      expiresIn: ENV.JWT_ACCESS_EXPIRES
    }
  );
};


export const signRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES
  });
};



export const verifyAccessToken = (token: string): Payload => {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET) as Payload;
};

export const verifyRefreshToken = (token: string): Payload => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as Payload;
};

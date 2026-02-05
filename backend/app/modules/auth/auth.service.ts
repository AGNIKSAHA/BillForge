import User from "../user/user.model.js";


import { SignupDTO } from "../user/dto/signup.dto.js";
import { LoginDTO } from "../user/dto/login.dto.js";

import {
  hashPassword,
  comparePassword,
  generateToken
} from "../user/user.helpers.js";

import { sendMail } from "../../common/utils/mail.js";
import { createTokenService } from "../token/token.service.js";

import { ENV } from "../../common/config/env.js";

const CLIENT_URL = ENV.CLIENT_URL;



export const signupService = async (
  payload: SignupDTO
): Promise<void> => {

  const exists = await User.findOne({ email: payload.email });

  if (exists) throw new Error("Email already registered");

  const hashedPassword = await hashPassword(payload.password);
  const verificationToken = generateToken();

  console.log(payload.role);
  const role =
    payload.role === "client"
      ? "client"
      : "freelancer";
  console.log("  ",role);
  await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role,
    verificationToken,
    verificationExpires: new Date(Date.now() + 86400000)
  });

  const link =
    `${CLIENT_URL}/verify-email?token=${verificationToken}`;

  await sendMail(payload.email, "Verify Email", `Verify here: ${link}`);
};



export const verifyEmailService = async (
  token: string
): Promise<void> => {

  const user = await User.findOne({
    verificationToken: token,
    verificationExpires: { $gt: new Date() }
  });

  if (!user) throw new Error("Invalid or expired token");

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationExpires = null;

  await user.save();
};


export const loginService = async (
  payload: LoginDTO
) => {

  const user = await User.findOne({ email: payload.email });

  if (!user) throw new Error("User not found");

  if (!user.isVerified)
    throw new Error("Email not verified");

  const match = await comparePassword(
    payload.password,
    user.password
  );

  if (!match)
    throw new Error("Invalid credentials");



  return createTokenService(user._id, user.role);
};


export const forgotPasswordService = async (
  email: string
): Promise<void> => {

  const user = await User.findOne({ email });

  if (!user) return;

  const resetToken = generateToken();

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(
    Date.now() + 30 * 60 * 1000
  );

  await user.save();

  const link =
    `${CLIENT_URL}/reset-password?token=${resetToken}`;

  await sendMail(
    email,
    "Reset Password",
    `Reset here: ${link}`
  );
};



export const resetPasswordService = async (
  token: string,
  password: string
): Promise<void> => {

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = await hashPassword(password);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();
};

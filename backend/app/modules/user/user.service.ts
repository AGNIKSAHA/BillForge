import { Types } from "mongoose";
import User from "./user.model.js";
import { UpdateProfileDTO } from "./dto/updateProfile.dto.js";
import { ChangePasswordDTO } from "./dto/changePassword.dto.js";
import { comparePassword, hashPassword } from "./user.helpers.js";


export const getProfileService = async (
  userId: Types.ObjectId
) => {
  return User.findById(userId).select("-password");
};


export const updateProfileService = async (
  userId: Types.ObjectId,
  payload: UpdateProfileDTO
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    payload,
    { new: true }
  ).select("-password");

  if (!user) throw new Error("User not found");

  return user;
};


export const changePasswordService = async (
  userId: Types.ObjectId,
  payload: ChangePasswordDTO
) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const match = await comparePassword(
    payload.oldPassword,
    user.password
  );

  if (!match) throw new Error("Old password incorrect");

  user.password = await hashPassword(payload.newPassword);

  await user.save();
};

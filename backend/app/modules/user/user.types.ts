import { Types } from "mongoose";


export type UserRole =
  | "admin"
  | "freelancer"
  | "client";

export interface IUser {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password: string;

  isVerified: boolean;

  role: UserRole;

  verificationToken?: string | null;
  verificationExpires?: Date | null;

  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}




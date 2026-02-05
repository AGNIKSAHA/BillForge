import { z } from "zod";


export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["client", "freelancer","admin"]).optional()
});



export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});




export const forgotPasswordSchema = z.object({
  email: z.string().email()
});



export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6)
});



export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional()
});


export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});
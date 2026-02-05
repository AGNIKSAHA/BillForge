import { Router } from "express";
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout
} from "./auth.controller.js";

import { validate } from "../../common/validators/validators.js";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from "../user/user.validation.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

router.get("/verify-email", verifyEmail);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

router.post("/logout", logout);

export default router;

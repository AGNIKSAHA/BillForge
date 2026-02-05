import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import {
  getProfile,
  updateProfile,
  changePassword
} from "./user.controller.js";

import {
  updateProfileSchema,
  changePasswordSchema
} from "./user.validation.js";

const router = Router();

router.get("/me", authMiddleware, getProfile);

router.patch(
  "/update",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfile
);

router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword
);

export default router;

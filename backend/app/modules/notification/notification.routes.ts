import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import {
  getNotifications,
  markNotificationRead
} from "./notification.controller.js";

import { markReadSchema } from "./notification.validation.js";

const router = Router();

router.get("/", authMiddleware, getNotifications);

router.patch(
  "/read",
  authMiddleware,
  validate(markReadSchema),
  markNotificationRead
);

export default router;

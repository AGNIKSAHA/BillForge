import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import {
  startTimer,
  stopTimer,
  getTimeLogs
} from "./timelog.controller.js";

import {
  startTimerSchema,
  stopTimerSchema
} from "./timelog.validation.js";

const router = Router();

router.post(
  "/start",
  authMiddleware,
  validate(startTimerSchema),
  startTimer
);

router.post(
  "/stop",
  authMiddleware,
  validate(stopTimerSchema),
  stopTimer
);

router.get("/:projectId", authMiddleware, getTimeLogs);

export default router;

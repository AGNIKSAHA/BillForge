import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "./project.controller.js";

import {
  createProjectSchema,
  updateProjectSchema
} from "./project.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createProjectSchema),
  createProject
);

router.get("/", authMiddleware, getProjects);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateProjectSchema),
  updateProject
);

router.delete("/:id", authMiddleware, deleteProject);

export default router;

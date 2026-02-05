import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import {
  createClient,
  getClients,
  updateClient,
  deleteClient
} from "./client.controller.js";

import {
  createClientSchema,
  updateClientSchema
} from "./client.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createClientSchema),
  createClient
);

router.get("/", authMiddleware, getClients);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateClientSchema),
  updateClient
);

router.delete("/:id", authMiddleware, deleteClient);

export default router;

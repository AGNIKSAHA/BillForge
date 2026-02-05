import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/validators/validators.js";

import { createInvoice } from "./invoice.controller.js";
import { createInvoiceSchema } from "./invoice.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createInvoiceSchema),
  createInvoice
);

export default router;

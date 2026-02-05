import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {

    const result = schema.safeParse(req.body);

    if (!result.success) {

      const firstError = result.error.issues[0];

      res.status(400).json({
        success: false,
        message: firstError?.message ?? "Validation error"
      });

      return;
    }

    req.body = result.data;
    next();
  };

import { z } from "zod";

export const startTimerSchema = z.object({
  projectId: z.string()
});

export const stopTimerSchema = z.object({
  timelogId: z.string()
});

import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  hourlyRate: z.number().positive(),
  clientId: z.string()
});

export const updateProjectSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  hourlyRate: z.number().positive().optional()
});

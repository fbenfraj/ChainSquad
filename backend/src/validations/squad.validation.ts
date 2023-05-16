import { z } from "zod";

export const SquadValidationSchema = z.object({
  squadName: z.string().min(1, "Squad Name must not be empty"),
  description: z.string().optional(),
  createdBy: z.number().int().nonnegative(),
});

export const UpdateSquadValidationSchema = z.object({
  squadName: z.string().min(1, "Squad Name must not be empty").optional(),
  description: z.string().min(1, "Description must not be empty").optional(),
});

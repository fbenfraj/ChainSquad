import { z } from "zod";
import { IdSchema, NameSchema } from "./general.validation";

export const SquadValidationSchema = z.object({
  squadName: NameSchema,
  description: z.string().optional(),
  createdBy: IdSchema,
});

export const UpdateSquadValidationSchema = z.object({
  squadName: NameSchema.optional(),
  description: z.string().min(1, "Description must not be empty").optional(),
});

import { z } from "zod";
import { IdSchema, NameSchema } from "./general.validation";

export const LineupValidationSchema = z.object({
  lineupName: NameSchema,
  squadId: IdSchema,
  createdBy: IdSchema,
});

export const UpdateLineupSchema = z.object({
  lineupName: NameSchema.optional(),
  squadId: IdSchema.optional(),
});

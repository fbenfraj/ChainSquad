import { z } from "zod";

export const LineupValidationSchema = z.object({
  lineupName: z.string().min(1, "Lineup Name must not be empty"),
  squadId: z.number().int().nonnegative(),
  createdBy: z.number().int().nonnegative(),
});

export const UpdateLineupSchema = z.object({
  lineupName: z.string().min(1, "Lineup Name must not be empty").optional(),
  squadId: z.number().int().nonnegative().optional(),
});

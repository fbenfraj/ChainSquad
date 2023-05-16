import { z } from "zod";

export const NumeralIdSchema = z.object({
  id: z.number().int().nonnegative(),
});

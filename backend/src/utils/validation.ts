import { ZodError } from "zod";

export function formatAndThrowZodError(error: ZodError) {
  const errors = error.errors.map((e) => e.message);
  throw new Error(errors.join(", "));
}

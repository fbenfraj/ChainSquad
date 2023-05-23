import { z } from "zod";

export const IdSchema = z.number().int().nonnegative() || z.string().uuid();

export const NameSchema = z.string().min(1, "Name must not be empty");

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

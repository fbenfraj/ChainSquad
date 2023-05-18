import { z } from "zod";
import { IdSchema, NameSchema, PasswordSchema } from "./general.validation";

export const UserValidationSchema = z.object({
  username: NameSchema,
  fullName: NameSchema,
  email: z.string().email("Must be a valid email address"),
  password: PasswordSchema,
});

export const UpdateUserValidationSchema = z.object({
  userId: IdSchema,
  fullName: NameSchema.optional(),
});

export const UserWithRoleSchema = z.array(
  z.object({
    userId: IdSchema,
    role: z.enum(["Coach", "Player"]),
  })
);

import { z } from "zod";
import { NameSchema, PasswordSchema } from "./general.validation";

export const SignInValidationSchema = z.object({
  username: NameSchema,
  password: PasswordSchema,
});

export const RefreshTokenValidationSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token cannot be empty"),
});

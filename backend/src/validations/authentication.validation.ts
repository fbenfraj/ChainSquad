import { z } from "zod";

export const SignInValidationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const RefreshTokenValidationSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token cannot be empty"),
});

import { z } from "zod";

export const UserValidationSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  fullName: z.string().min(5, "Full Name must be at least 5 characters"),
  email: z.string().email("Must be a valid email address"),
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

export const UpdateUserValidationSchema = z.object({
  userId: z.number(),
  fullName: z.string().optional(),
});

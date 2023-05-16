import { z } from "zod";

export const UserValidationSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  fullName: z.string().min(5, "Full Name must be at least 5 characters"),
  email: z.string().email("Must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => {
        return (
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[0-9]/.test(password) &&
          /[^a-zA-Z0-9]/.test(password)
        );
      },
      {
        message:
          "Password must contain lower case, upper case, number, and special character",
      }
    ),
});

export const UpdateUserValidationSchema = z.object({
  userId: z.number(),
  fullName: z.string().optional(),
});

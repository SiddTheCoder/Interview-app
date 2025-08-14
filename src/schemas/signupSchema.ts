import { email, z } from "zod";

export const usernameValidationSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must not exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
);
  
export const signupValidationSchema = z.object({
  username: usernameValidationSchema.optional(),
  fullName: z.string().min(2).max(100),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, "Email must not exceed 50 characters"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(50, "Password must not exceed 50 characters"),
});

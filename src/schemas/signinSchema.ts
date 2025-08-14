import { z } from "zod";

export const signinValidationSchema = z.object({
  identifier: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
});

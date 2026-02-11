import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must have at least 3 characters")
    .max(20, "Username must have less than 20 characters"),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at least 8 characters"),
});

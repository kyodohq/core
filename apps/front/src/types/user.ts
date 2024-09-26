import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().positive().min(1),
  username: z
    .string()
    .min(3, "Must be at least 3 characters.")
    .max(32, "Must be at most 32 characters."),
  display_name: z
    .string()
    .min(3, "Must be at least 3 characters.")
    .max(32, "Must be at most 32 characters."),
  email: z.string().email("Your email is invalid."),
  bio: z.string().max(400, "Bio must be at most 400 characters.").optional(),
  avatar_url: z.string().url().optional(),
  banner_url: z.string().url().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const createUserDTOSchema = userSchema.pick({
  email: true,
  username: true,
  display_name: true,
});

export type createUserDTO = z.infer<typeof createUserDTOSchema>;

import z from "zod";

export const userSchema = z.object({
  id: z.number().int().positive().min(1),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username must be at most 32 characters."),
  display_name: z
    .string()
    .min(3, "Display name must be at least 3 characters.")
    .max(32, "Display name must be at most 32 characters."),
  email: z.string().email("Email is invalid."),
  bio: z.string().max(400, "Bio must be at most 400 characters.").optional(),
  avatar_url: z.string().url().optional(),
  banner_url: z.string().url().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});
export type User = z.infer<typeof userSchema>;

export const checkEmailSchema = userSchema.pick({
  email: true,
});

export const checkPinSchema = z.object({
  pin: z.string().min(6, "Pin must be at least 6 characters."),
  email: z.string().email("Email is invalid."),
});

export const createUserSchema = userSchema.omit({
  id: true,
  bio: true,
  avatar_url: true,
  banner_url: true,
  created_at: true,
  updated_at: true,
});
export type createUserDTO = z.infer<typeof createUserSchema>;

export const signInSchema = userSchema.pick({
  email: true,
});
export type signInDTO = z.infer<typeof signInSchema>;

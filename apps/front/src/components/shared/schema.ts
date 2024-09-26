import { z } from "zod";
import { userSchema } from "@/types/user";

export const emailSchema = userSchema.pick({ email: true });
export const codeSchema = z.object({
  code: z.string().length(6),
});
export const infosSchema = userSchema.pick({
  username: true,
  display_name: true,
});

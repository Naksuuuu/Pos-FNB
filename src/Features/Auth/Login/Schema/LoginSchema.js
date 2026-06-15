import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(255, "Username maksimal 255 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter").max(255, "Password maksimal 255 karakter"),
});

import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Password Wajib Diisi!"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    password_confirmation: z.string().min(6, "Password minimal 6 karakter"),
  })
  .refine((val) => val.password === val.password_confirmation, {
    message: "Password tidak cocok!",
    path: ["password_confirmation"],
  });

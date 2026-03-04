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

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Nama Wajib Diisi!").max(255, "Nama maksimal 255 karakter"),
  username: z.string().min(1, "Username Wajib Diisi!").max(255, "Username maksimal 255 karakter"),
  email: z.preprocess((val) => {
    if (val === "") return null;
    return val;
  }, z.email("Format email tidak valid!").nullable()),

  phone: z.preprocess((val) => {
    if (val === "") return null;
    return val;
  }, z.string().min(8, "No Handphone minimal 8 karakter!").max(17, "No Handphone maksimal 17 karakter!").nullable()),
});

import { z } from "zod";

export const CashierMemberSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi!").max(100, "Nama maksimal 100 karakter!"),
    email: z.preprocess(
      (val) => (val === "" ? null : val),
      z.string().email("Format email tidak valid!").max(100, "Email maksimal 100 karakter!").nullable().optional()
    ),
    phone: z.preprocess(
      (val) => (val === "" ? null : val),
      z.string().min(8, "No Handphone minimal 8 karakter!").max(20, "No Handphone maksimal 20 karakter!").nullable().optional()
    ),
    username: z.string().min(3, "Username minimal 3 karakter!").max(50, "Username maksimal 50 karakter!"),
    password: z.string().min(6, "Password minimal 6 karakter!"),
    password_confirmation: z.string().min(1, "Konfirmasi password wajib diisi!"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password tidak cocok!",
    path: ["password_confirmation"],
  });

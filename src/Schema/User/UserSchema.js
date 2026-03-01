import { z } from "zod";

const name = z.string().min(1, "Nama User Wajib diisi!");
const username = z.string().min(3, "Username minimal 3 karakter!");
const role = z.enum(["admin", "cashier"], {
  required_error: "Role User Wajib diisi!",
});

const passwordRequired = z.string().min(6, "Password minimal 6 karakter!");

const CreateUserSchema = z
  .object({
    name,
    username,
    role,
    password: passwordRequired,
    password_confirmation: passwordRequired,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password tidak cocok!",
    path: ["password_confirmation"],
  });

const EditUserSchema = z.object({
  role,
});

export { CreateUserSchema, EditUserSchema };

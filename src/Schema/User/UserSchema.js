import { z } from "zod";

const name = z.string().min(1, "Nama User Wajib diisi!");
const username = z.string().min(3, "Username minimal 3 karakter!");
const role = z.enum(["admin", "cashier"], {
  required_error: "Role User Wajib diisi!",
});

const passwordRequired = z.string().min(6, "Password minimal 6 karakter!");
const passwordOptional = z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 6, {
    message: "Password minimal 6 karakter jika ingin diubah!",
  });

const CreateUserSchema = z.object({
  name,
  username,
  role,
  password: passwordRequired,
});

const EditUserSchema = z.object({
  name,
  username,
  role,
  password: passwordOptional,
});

export { CreateUserSchema, EditUserSchema };

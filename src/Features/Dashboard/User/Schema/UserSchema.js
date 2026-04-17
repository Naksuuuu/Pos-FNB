import { ROLE_OPTIONS } from "@/Features/Dashboard/User/Constants/UserConstant";
import { z } from "zod";

const role_value = ROLE_OPTIONS.map((option) => option.value);
const role_label = ROLE_OPTIONS.map((option) => option.label);

const name = z.string().min(1, "Nama User Wajib diisi!");
const username = z.string().min(1, "Username Wajib diisi!");
const role = z.refine((val) => role_value.includes(val), {
  message: `Role harus antara ${role_label.join(" atau ")}!`,
});
const email = z.preprocess((val) => {
  if (val === "") return null;
  return val;
}, z.email("Format email tidak valid!").nullable());

const phone = z.preprocess((val) => {
  if (val === "") return null;
  return val;
}, z.string().min(8, "No Handphone minimal 8 karakter!").max(17, "No Handphone maksimal 17 karakter!").nullable());

const passwordRequired = z.string().trim().min(6, "Password minimal 6 karakter!");
const passwordOptional = z.string().trim();

const CreateUserSchema = z
  .object({
    name,
    username,
    role,
    email,
    phone,
    password: passwordRequired,
    password_confirmation: passwordRequired,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password tidak cocok!",
    path: ["password_confirmation"],
  });

const EditUserSchema = z
  .object({
    name,
    username,
    role,
    email,
    phone,
    password: passwordOptional,
    password_confirmation: passwordOptional,
  })
  .superRefine((data, ctx) => {
    if (!data.password || data.password.trim() === "") return;
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password tidak cocok!", path: ["password_confirmation"] });
    }
  });

export { CreateUserSchema, EditUserSchema };

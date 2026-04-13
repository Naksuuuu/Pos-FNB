import { z } from "zod";

const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/;

const restaurant_name = z.string().min(1, "Nama restoran wajib diisi!").max(255, "Nama restoran maksimal 255 karakter");

const tax_percentage = z
  .string()
  .min(1, "Pajak wajib diisi!")
  .refine((value) => !Number.isNaN(Number(value)), "Pajak harus berupa angka!")
  .refine((value) => Number(value) >= 0 && Number(value) <= 100, "Pajak harus di antara 0 sampai 100");

const dashboard_color = z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Warna dashboard harus format hex, contoh #D97706");

const opening_time = z.string().regex(isValidTime, "Jam buka harus format HH:mm");
const closing_time = z.string().regex(isValidTime, "Jam tutup harus format HH:mm");

export const UpdateSettingSchema = z.object({
  restaurant_name,
  tax_percentage,
  dashboard_color,
  is_operational: z.boolean().default(false),
  opening_time,
  closing_time,
  is_active: z.boolean().default(false),
});

export const SettingLogoSchema = z.object({
  logo: z
    .any()
    .refine((files) => !files || files instanceof FileList, "Logo tidak valid")
    .refine((files) => !files || files.length > 0, "Logo wajib diisi")
    .refine((files) => !files || ["image/jpeg", "image/jpg", "image/png"].includes(files[0]?.type), "Hanya JPEG/JPG/PNG yang diperbolehkan")
    .refine((files) => !files || files[0]?.size <= 2 * 1024 * 1024, "Ukuran logo maksimal 2MB"),
});

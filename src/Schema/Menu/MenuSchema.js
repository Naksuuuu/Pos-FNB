import { z } from "zod";

const name = z.string().min(1, "Nama Wajib diisi!");

const price = z
  .string()
  .min(1, "Harga Wajib diisi!")
  .refine((v) => !Number.isNaN(Number(v)), "Harga harus berupa angka!")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Minimal harga 0 Rupiah!");
const stock = z
  .string()
  .min(1, "Stok Wajib diisi!")
  .refine((v) => !Number.isNaN(Number(v)), "Stok harus berupa angka!")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Minimal stok 0");

const category_id = z.string("Kategori wajib diisi!").min(1, "Kategori wajib diisi!");

const description = z.any().optional();

const is_available = z
  .boolean()
  .default(false)
  .transform((val) => (val ? 1 : 0));

const CreateMenuSchema = z.object({
  name,
  price,
  stock,
  category_id,
  description,
  image: z
    .any()
    .refine((files) => !files || files instanceof FileList, "Foto wajib diisi")
    .refine((files) => !files || ["image/jpeg", "image/jpg", "image/png"].includes(files[0]?.type), "Hanya JPEG/JPG/PNG yang diperbolehkan")
    .refine((files) => !files || files[0]?.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB"),
  is_available,
});

const EditMenuSchema = z.object({
  name,
  price,
  stock,
  category_id,
  description,
  image: z
    .any()
    .optional()
    .refine((files) => !files || !(files instanceof FileList) || files.length === 0 || ["image/jpeg", "image/jpg", "image/png"].includes(files[0]?.type), "Hanya JPEG/JPG/PNG yang diperbolehkan")
    .refine((files) => !files || !(files instanceof FileList) || files.length === 0 || files[0]?.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB"),
  is_available,
});

export { CreateMenuSchema, EditMenuSchema };

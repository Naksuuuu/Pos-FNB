import { z } from "zod";

const name = z.string().min(1, "Name is required");

const price = z
  .string()
  .min(1, "Price is required")
  .refine((v) => !Number.isNaN(Number(v)), "Price must be a number")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Price must be at least 0");
const stock = z
  .string()
  .min(1, "Stock is required")
  .refine((v) => !Number.isNaN(Number(v)), "Stock must be a number")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Price must be at least 0");

const category_id = z
  .string()
  .min(1, "Category wajib diisi")
  .refine((v) => !Number.isNaN(Number(v)), "Category id must be a number")
  .transform((v) => Number(v));

const description = z.string().min(1, "Description is required");

const is_available = z
  .boolean()
  .default(true)
  .transform((val) => (val ? 1 : 0));

const CreateMenuSchema = z.object({
  name,
  price,
  stock,
  category_id,
  description,
  image: z
    .any()
    .refine((files) => !files || files instanceof FileList, "File is required")
    .refine((files) => !files || ["image/jpeg", "image/png"].includes(files[0]?.type), "Only JPG/PNG allowed")
    .refine((files) => !files || files[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
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
    .refine(
      (files) =>
        !files ||
        !(files instanceof FileList) ||
        files.length === 0 ||
        ["image/jpeg", "image/png"].includes(files[0]?.type),
      "Only JPG/PNG allowed",
    )
    .refine(
      (files) => !files || !(files instanceof FileList) || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
      "Max file size is 5MB",
    ),
  is_available,
});

export { CreateMenuSchema, EditMenuSchema };

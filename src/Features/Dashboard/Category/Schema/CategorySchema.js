import { z } from "zod";

const name = z.string().min(1, "Nama Kategori Wajib diisi!");

const CreateCategorySchema = z.object({
  name,
});

const EditCategorySchema = z.object({
  name,
});
export { CreateCategorySchema, EditCategorySchema };


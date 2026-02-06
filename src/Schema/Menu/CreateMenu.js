import { z } from "zod";

const CreateMenuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  category_id: z.coerce.number().min(1, "Category ID is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .refine((files) => !files || files instanceof FileList, "File is required")
    .refine((files) => !files || ["image/jpeg", "image/png"].includes(files[0]?.type), "Only JPG/PNG allowed")
    .refine((files) => !files || files[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
  is_available: z
    .boolean()
    .default(true)
    .transform((val) => (val ? 1 : 0)),
});
export default CreateMenuSchema;

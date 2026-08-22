import { z } from "zod";

const name = z.string().min(1, "Nama opsi kustom wajib diisi!");
const price = z.coerce.number({ invalid_type_error: "Harga harus berupa angka!" }).min(0, "Harga tidak boleh negatif!");

const CustomOptionSchema = z.object({
  name,
  price,
});

export { CustomOptionSchema };

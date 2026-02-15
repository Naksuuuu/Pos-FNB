import { z } from "zod";

const code = z.string().min(1, "kode nama wajib diisi!");

const status = z.enum(["available", "occupied"], {
  errorMap: () => ({ message: "Status wajib diisi!" }),
});

const CreateDiningTableSchema = z.object({
  code,
});

export { CreateDiningTableSchema };

import { z } from "zod";
import { STATUS_OPTIONS_SCHEMA } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const statusOptions = STATUS_OPTIONS_SCHEMA.map((option) => option.value);
const statusLabels = STATUS_OPTIONS_SCHEMA.map((option) => option.label);

const code = z.string().min(1, "kode nama wajib diisi!");

const status = z.refine((val) => statusOptions.includes(val), {
  message: `Status harus antara ${statusLabels.join(" atau ")}!`,
});

const CreateDiningTableSchema = z.object({
  code,
  status,
});

const editDiningTableSchema = z.object({
  code,
  status,
});

export { CreateDiningTableSchema, editDiningTableSchema };

import { z } from "zod";

const code = z.string().min(1, "Kode reward wajib diisi!");
const name = z.string().min(1, "Nama reward wajib diisi!");

const category = z.enum(["MERCHANDISE", "VOUCHER"], {
  errorMap: () => ({ message: "Kategori wajib dipilih!" }),
});

const point_cost = z
  .string()
  .min(1, "Biaya poin wajib diisi!")
  .refine((v) => !Number.isNaN(Number(v)), "Biaya poin harus berupa angka!")
  .transform((v) => Number(v))
  .refine((v) => Number.isInteger(v) && v >= 1, "Biaya poin harus minimal 1!");

const stock = z
  .string()
  .min(1, "Stok wajib diisi!")
  .refine((v) => !Number.isNaN(Number(v)), "Stok harus berupa angka!")
  .transform((v) => Number(v))
  .refine((v) => Number.isInteger(v) && v >= 0, "Stok minimal 0!");

const discount_percentage = z
  .string()
  .optional()
  .nullable()
  .transform((v) => (v === "" || v === undefined || v === null ? null : Number(v)));

const description = z.string().nullable().optional();
const status = z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE");

const CreateRewardSchema = z
  .object({
    code,
    name,
    category,
    point_cost,
    stock,
    discount_percentage,
    description,
    status,
  })
  .superRefine((data, ctx) => {
    if (data.category === "VOUCHER") {
      if (data.discount_percentage === null || data.discount_percentage === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Persentase diskon wajib diisi untuk kategori VOUCHER!",
          path: ["discount_percentage"],
        });
      } else if (
        !Number.isInteger(data.discount_percentage) ||
        data.discount_percentage < 1 ||
        data.discount_percentage > 100
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Persentase diskon harus berupa angka bulat 1 - 100!",
          path: ["discount_percentage"],
        });
      }
    }
  })
  .transform((data) => {
    if (data.category === "MERCHANDISE") {
      return {
        ...data,
        discount_percentage: null,
      };
    }
    return data;
  });

const EditRewardSchema = CreateRewardSchema;

export { CreateRewardSchema, EditRewardSchema };

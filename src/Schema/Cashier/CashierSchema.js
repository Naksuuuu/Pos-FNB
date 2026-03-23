import { z } from "zod";

const normalizeCashAmount = (value) => String(value ?? "").replace(/[^0-9]/g, "");

const CashierOrderItemSchema = z.object({
  menu_id: z.string().min(1, "Menu wajib dipilih"),
  qty: z.number().int().min(1, "Jumlah menu minimal 1"),
});

const CreateCashierOrderSchema = z.object({
  code: z.string().min(1, "Nomor meja wajib dipilih"),
  customer_name: z.string().trim().min(1, "Nama pelanggan wajib diisi"),
  notes: z.string().optional(),
  items: z.array(CashierOrderItemSchema).min(1, "Tambahkan minimal 1 menu"),
});

const CashierPaymentSchema = z.object({
  cash_amount: z
    .string()
    .trim()
    .min(1, "Uang diterima wajib diisi")
    .transform(normalizeCashAmount)
    .refine((value) => value.length > 0, "Nominal uang tidak valid")
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value) && value > 0, "Uang diterima harus lebih dari 0"),
});

export { CashierOrderItemSchema, CreateCashierOrderSchema, CashierPaymentSchema };

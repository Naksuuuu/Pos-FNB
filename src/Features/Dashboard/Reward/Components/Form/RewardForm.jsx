import { Controller, useWatch } from "react-hook-form";

import { Input, InputNumber } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/Components/Elements/Shadcn/field";

const RewardForm = ({ errors, control, register }) => {
  const categorySelected = useWatch({ control, name: "category" });

  return (
    <FieldSet>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="code">
            Kode Reward <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="code"
            name="code"
            autoComplete="off"
            placeholder="contoh: REW01"
            {...register("code")}
            aria-invalid={errors.code ? "true" : "false"}
          />
          {errors.code && <FieldError>{errors.code.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="name">
            Nama Reward <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            placeholder="contoh: Free Drink"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="category_select">
            Kategori <span className="text-destructive">*</span>
          </FieldLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                items={CATEGORY_OPTIONS}
                id="category_select"
                name="category"
                placeholder="Pilih kategori"
                value={field.value || ""}
                onValueChange={(val) => field.onChange(val)}
                aria-invalid={errors.category ? "true" : "false"}
              />
            )}
          />
          {errors.category && <FieldError>{errors.category.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="point_cost">
            Biaya Poin <span className="text-destructive">*</span>
          </FieldLabel>
          <InputNumber
            id="point_cost"
            name="point_cost"
            control={control}
            autoComplete="off"
            placeholder="contoh: 10"
            aria-invalid={errors.point_cost ? "true" : "false"}
          />
          {errors.point_cost && <FieldError>{errors.point_cost.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="stock">
            Stok <span className="text-destructive">*</span>
          </FieldLabel>
          <InputNumber
            id="stock"
            name="stock"
            control={control}
            autoComplete="off"
            placeholder="contoh: 50"
            aria-invalid={errors.stock ? "true" : "false"}
          />
          {errors.stock && <FieldError>{errors.stock.message}</FieldError>}
        </Field>

        {categorySelected === "VOUCHER" && (
          <Field>
            <FieldLabel htmlFor="discount_percentage">
              Persentase Diskon (%) <span className="text-destructive">*</span>
            </FieldLabel>
            <InputNumber
              id="discount_percentage"
              name="discount_percentage"
              control={control}
              autoComplete="off"
              placeholder="contoh: 10"
              aria-invalid={errors.discount_percentage ? "true" : "false"}
            />
            {errors.discount_percentage && <FieldError>{errors.discount_percentage.message}</FieldError>}
          </Field>
        )}

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="status_select">Status</FieldLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                items={STATUS_OPTIONS}
                id="status_select"
                name="status"
                placeholder="Pilih status"
                value={field.value || "ACTIVE"}
                onValueChange={(val) => field.onChange(val)}
                aria-invalid={errors.status ? "true" : "false"}
              />
            )}
          />
          {errors.status && <FieldError>{errors.status.message}</FieldError>}
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Deskripsi reward..."
            autoComplete="off"
            {...register("description")}
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && <FieldError>{errors.description.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default RewardForm;

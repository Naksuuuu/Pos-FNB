import { Controller } from "react-hook-form";

import { STATUS_OPTIONS_SCHEMA } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";

import { Input } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";

const DiningTableForm = ({ register, errors, control }) => {
  return (
    <FieldSet>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="code">
            Kode Meja <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="code" name="code" autoComplete="off" placeholder="Kode Meja" {...register("code")} aria-invalid={!!errors.code} />
          {errors.code && <FieldError>{errors.code.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="status">
            Status <span className="text-destructive">*</span>
          </FieldLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                items={STATUS_OPTIONS_SCHEMA}
                id="status"
                name="status"
                placeholder="Pilih status"
                value={field.value || ""}
                onValueChange={(val) => field.onChange(val)}
                aria-invalid={!!errors.status}
              />
            )}
          />
          {errors.status && <FieldError>{errors.status.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
export default DiningTableForm;

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Inputs/Input";

const CategoryForm = ({ register, errors }) => {
  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">
            Nama Kategori <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="name" name="name" autoComplete="off" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
export default CategoryForm;

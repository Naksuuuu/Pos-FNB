import { Field, FieldError } from "@/Components/Elements/Shadcn/field";
import { Input, InputRupiah } from "@/Components/Elements/Inputs/Input";
import { Label } from "@/Components/Elements/Shadcn/label";

const CustomOptionForm = ({ register, errors, control }) => {
  return (
    <div className="space-y-4 p-2">
      <Field>
        <Label htmlFor="name">Nama Opsi Kustom</Label>
        <Input id="name" name="name" placeholder="Contoh: Extra Cheese, Pedas Sedang" {...register("name")} />
        {errors?.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>

      <Field>
        <Label htmlFor="price">Harga</Label>
        <InputRupiah
          id="price"
          name="price"
          control={control}
          placeholder="Contoh: 5.000"
          aria-invalid={errors?.price ? "true" : "false"}
        />
        {errors?.price && <FieldError>{errors.price.message}</FieldError>}
      </Field>
    </div>
  );
};

export default CustomOptionForm;

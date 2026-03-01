import { Controller } from "react-hook-form";

import { ROLE_OPTIONS } from "@/Constants/Dashboard/User/UserConstant";

import { Input } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";

const UserForm = ({ errors, control, register, type = "create" }) => {
  return (
    <FieldSet>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">
            Nama User <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="username">
            Username <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="username"
            name="username"
            autoComplete="off"
            {...register("username")}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <FieldError>{errors.username.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="role">
            Role User <span className="text-destructive">*</span>
          </FieldLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                items={ROLE_OPTIONS}
                label="Role User"
                id="role"
                name="role"
                placeholder="Pilih role"
                value={field.value || ""}
                onValueChange={(val) => field.onChange(val)}
                aria-invalid={errors.role ? "true" : "false"}
              />
            )}
          />
          {errors.role && <FieldError>{errors.role.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">
            Password {type === "create" ? <span className="text-destructive">*</span> : "(Opsional)"}
          </FieldLabel>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <FieldError>{errors.password.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
export default UserForm;

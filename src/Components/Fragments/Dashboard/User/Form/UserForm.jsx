import { Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { ROLE_OPTIONS } from "@/Constants/Dashboard/User/UserConstant";

import { Input } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Button } from "@/Components/Elements/Shadcn/button";

const UserForm = ({
  errors,
  control,
  register,
  type = "create",
  visiblePassword = null,
  handleVisiblePassword = null,
}) => {
  return (
    <FieldSet>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        {type === "create" && (
          <>
            <Field>
              <FieldLabel htmlFor="name">
                Nama User <span className="text-destructive">*</span>
              </FieldLabel>
              <Input id="name" name="name" autoComplete="off" {...register("name")} aria-invalid={!!errors.name} />
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
                aria-invalid={!!errors.username}
              />
              {errors.username && <FieldError>{errors.username.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Password {type === "create" ? <span className="text-destructive">*</span> : "(Opsional)"}
              </FieldLabel>
              <Input
                type={visiblePassword?.password ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                {...register("password")}
                aria-invalid={!!errors.password}
                lastAddon={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent ring-0 focus-visible:ring-0 border-0 focus-visible:ring-offset-0 focus-visible:border-none"
                    onClick={() => handleVisiblePassword("password")}
                  >
                    {visiblePassword.password ? <Eye /> : <EyeOff />}
                  </Button>
                }
              />
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password_confirmation">
                Konfirmasi Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type={visiblePassword?.password_confirmation ? "text" : "password"}
                id="password_confirmation"
                name="password_confirmation"
                autoComplete="off"
                {...register("password_confirmation")}
                aria-invalid={!!errors.password_confirmation}
                lastAddon={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent ring-0 focus-visible:ring-0 border-0 focus-visible:ring-offset-0 focus-visible:border-none"
                    onClick={() => handleVisiblePassword("password_confirmation")}
                  >
                    {visiblePassword.password_confirmation ? <Eye /> : <EyeOff />}
                  </Button>
                }
              />
              {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
            </Field>
          </>
        )}

        <Field className="md:col-span-2">
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
                aria-invalid={!!errors.role}
              />
            )}
          />
          {errors.role && <FieldError>{errors.role.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
export default UserForm;

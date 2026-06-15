import { Input, InputPassword } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Link } from "react-router";
import { ROUTES } from "@/Constants/RouteConstant";
import useRegister from "@/Features/Auth/Register/Hooks/useRegister";

const RegisterForm = () => {
  const { loading, register, handleSubmit, handleSubmitForm, errors } = useRegister();

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">
              Nama User <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Nama"
              {...register("name")}
              aria-invalid={!!errors.name}
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
              placeholder="Username"
              {...register("username")}
              aria-invalid={!!errors.username}
            />
            {errors.username && <FieldError>{errors.username.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">No Handphone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              autoComplete="off"
              placeholder="No Handphone"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">
              Password <span className="text-destructive">*</span>
            </FieldLabel>
            <InputPassword
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="password_confirmation">
              Konfirmasi Password <span className="text-destructive">*</span>
            </FieldLabel>
            <InputPassword
              id="password_confirmation"
              name="password_confirmation"
              autoComplete="off"
              placeholder="Konfirmasi Password"
              {...register("password_confirmation")}
              aria-invalid={!!errors.password_confirmation}
            />
            {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
          </Field>

          <Field>
            <Button type="submit" disabled={loading} className="relative cursor-pointer" size="default">
              <span className={loading ? "invisible" : "visible"}>Daftar</span>
              {loading && (
                <div className="absolute ">
                  <Spinner />
                </div>
              )}
            </Button>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <Link
              to={ROUTES.AUTH.LOGIN}
              variant="link"
              className="w-full font-semibold h-auto py-0 underline text-primary"
            >
              Sudah punya akun? Masuk
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default RegisterForm;

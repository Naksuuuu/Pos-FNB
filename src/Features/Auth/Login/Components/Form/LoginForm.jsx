import { Lock, User } from "lucide-react";

import useLogin from "@/Features/Auth/Login/Hooks/useLogin";

import { Input, InputPassword } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Link } from "react-router";
import { ROUTES } from "@/Constants/RouteConstant";

const LoginForm = () => {
  const { loading, register, handleSubmit, handleSubmitForm, errors } = useLogin();

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <Label htmlFor="username">
              Username<span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register("username")}
              aria-invalid={!!errors.username}
              firstAddon={<User />}
            />
            {errors.username && <FieldError>{errors.username.message}</FieldError>}
          </Field>
          <Field>
            <Label htmlFor="password">
              Password<span className="text-destructive">*</span>
            </Label>
            <InputPassword
              id="password"
              name="password"
              placeholder="Password"
              {...register("password")}
              aria-invalid={!!errors.password}
              firstAddon={<Lock />}
            />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>
          <Field>
            <Button type="submit" disabled={loading} className="relative cursor-pointer" size="default">
              <span className={loading ? "invisible" : "visible"}>Masuk</span>
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
              to={ROUTES.AUTH.REGISTER}
              variant="link"
              className="w-full font-semibold h-auto py-0 underline text-primary"
            >
              Belum punya akun? Daftar
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default LoginForm;

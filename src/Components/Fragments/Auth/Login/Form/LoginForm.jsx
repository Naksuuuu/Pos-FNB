import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User } from "lucide-react";

import useLogin from "@/Hooks/Auth/Login/useLogin";
import { LoginSchema } from "@/Schema/Auth/AuthSchema";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input, InputPassword } from "@/Components/Elements/Inputs/Input";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const LoginForm = () => {
  const { Login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await Login(data);
      toast.success(response.message || "Login berhasil");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal login");
    }
  };

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
              {...register("password")}
              aria-invalid={!!errors.password}
              firstAddon={<Lock />}
            />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>
          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Masuk"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default LoginForm;

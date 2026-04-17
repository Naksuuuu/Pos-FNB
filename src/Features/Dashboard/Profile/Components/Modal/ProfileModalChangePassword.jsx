import { LockOpen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import useChangePassword from "@/Features/Dashboard/Profile/Hooks/useChangePassword";
import { ChangePasswordSchema } from "@/Features/Dashboard/Profile/Schema/ProfileSchema";

import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { InputPassword } from "@/Components/Elements/Inputs/Input";
import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";

const ProfileModalChangePassword = ({ isOpen, onOpenModal }) => {
  const { changePassword, loading } = useChangePassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await changePassword(data);
      onOpenModal(false);
      toast.success(response.message || "Password berhasil diubah");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengubah password");
    }
  };

  return (
    <DashModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Ganti Password" icon={LockOpen}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <Label htmlFor="current_password">
              Password Sekarang <span className="text-destructive">*</span>
            </Label>
            <InputPassword id="current_password" name="current_password" placeholder="Password Sekarang" {...register("current_password")} aria-invalid={!!errors.current_password} />
            {errors.current_password && <FieldError>{errors.current_password.message}</FieldError>}
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="password">
              Password Baru <span className="text-destructive">*</span>
            </Label>
            <InputPassword id="password" name="password" placeholder="Password Baru" {...register("password")} aria-invalid={!!errors.password} />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor="password_confirmation">
              Konfirmasi Password Baru <span className="text-destructive">*</span>
            </Label>
            <InputPassword
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Konfirmasi Password Baru"
              {...register("password_confirmation")}
              aria-invalid={!!errors.password_confirmation}
            />
            {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashModalForm>
  );
};

ProfileModalChangePassword.displayName = "ProfileModalChangePassword";

export default ProfileModalChangePassword;

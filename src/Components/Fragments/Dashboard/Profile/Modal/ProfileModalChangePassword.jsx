import { ChangePasswordSchema } from "@/Schema/Profile/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";
import useChangePassword from "@/Hooks/Dashboard/Profile/useChangePassword";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Lock, LockOpen } from "lucide-react";

const ProfileModalChangePassword = ({ isOpen, onOpenModal }) => {
  const { change, loading } = useChangePassword();

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
      const response = await change(data);
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
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Ganti Password"
      icon={LockOpen}
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <Label>
              Password Sekarang <span className="text-destructive">*</span>
            </Label>
            <Input type="password" {...register("current_password")} />
            {errors.current_password && <FieldError>{errors.current_password.message}</FieldError>}
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-4">
          <Field>
            <Label>
              Password Baru <span className="text-destructive">*</span>
            </Label>
            <Input type="password" {...register("password")} />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>

          <Field>
            <Label>
              Konfirmasi Password Baru <span className="text-destructive">*</span>
            </Label>
            <Input type="password" {...register("password_confirmation")} />
            {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashModalForm>
  );
};

export default ProfileModalChangePassword;

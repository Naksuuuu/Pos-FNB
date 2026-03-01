import { Eye, EyeOff, LockOpen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import useChangePassword from "@/Hooks/Dashboard/Profile/useChangePassword";
import { ChangePasswordSchema } from "@/Schema/Profile/ProfileSchema";

import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";

const ProfileModalChangePassword = ({ isOpen, onOpenModal }) => {
  const { change, loading, visiblePassword, handleVisiblePassword } = useChangePassword();

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
            <Input
              type={visiblePassword.current_password ? "text" : "password"}
              {...register("current_password")}
              lastAddon={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent ring-0 focus-visible:ring-0 border-0 focus-visible:ring-offset-0 focus-visible:border-none"
                  onClick={() => handleVisiblePassword("current_password")}
                >
                  {visiblePassword.current_password ? <Eye /> : <EyeOff />}
                </Button>
              }
            />
            {errors.current_password && <FieldError>{errors.current_password.message}</FieldError>}
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-4">
          <Field>
            <Label>
              Password Baru <span className="text-destructive">*</span>
            </Label>
            <Input
              type={visiblePassword.password ? "text" : "password"}
              {...register("password")}
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
            <Label>
              Konfirmasi Password Baru <span className="text-destructive">*</span>
            </Label>
            <Input
              type={visiblePassword.password_confirmation ? "text" : "password"}
              {...register("password_confirmation")}
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
        </FieldGroup>
      </FieldSet>
    </DashModalForm>
  );
};

export default ProfileModalChangePassword;

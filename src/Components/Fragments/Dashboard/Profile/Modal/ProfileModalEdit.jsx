import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";

import useEditProfile from "@/Hooks/Dashboard/Profile/useEditProfile";
import { UpdateProfileSchema } from "@/Schema/Profile/ProfileSchema";

import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Input } from "@/Components/Elements/Inputs/Input";
import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";

const ProfileModalEdit = ({ isOpen, onOpenModal, profile }) => {
  const { edit, loading } = useEditProfile();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
    },
  });

  const handleSubmitForm = async (formData) => {
    try {
      const response = await edit(formData);
      onOpenModal(false);
      toast.success(response.message || "Profile berhasil diupdate");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengupdate profile");
    }
  };

  return (
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Edit Profile"
      icon={Edit}
    >
      <FieldSet>
        <FieldGroup className="grid grid-cols-2 gap-4">
          <Field>
            <Label>
              Nama <span className="text-destructive">*</span>
            </Label>
            <Input {...register("name")} aria-invalid={!!errors.name} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <Label>
              Username <span className="text-destructive">*</span>
            </Label>
            <Input {...register("username")} aria-invalid={!!errors.username} />
            {errors.username && <FieldError>{errors.username.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashModalForm>
  );
};
export default ProfileModalEdit;

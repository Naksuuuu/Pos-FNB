import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserPen } from "lucide-react";

import { EditUserSchema } from "@/Schema/User/UserSchema";
import useEditUser from "@/Hooks/Dashboard/User/useEditUser";

import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";
import UserForm from "@/Components/Fragments/Dashboard/User/Form/UserForm";

const UserModalEdit = ({ selectedUser, onOpenModal }) => {
  const { edit, loading } = useEditUser();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: selectedUser?.name || "",
      username: selectedUser?.username || "",
      role: selectedUser?.role || "",
      password: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name || "",
        username: selectedUser.username || "",
        role: selectedUser.role || "",
        password: "",
      });
    }
  }, [selectedUser, reset]);

  const handleSubmitForm = async (data) => {
    try {
      const payload = {
        name: data.name,
        username: data.username,
        role: data.role,
      };

      if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
      }

      const response = await edit(selectedUser.id, payload);
      onOpenModal(null);
      toast.success(response.message || "User berhasil diubah");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal mengubah user");
    }
  };

  return (
    <DashModalForm
      isOpen={!!selectedUser}
      onOpenModal={() => onOpenModal(null)}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Edit User"
      icon={UserPen}
    >
      <UserForm register={register} errors={errors} control={control} type="edit" />
    </DashModalForm>
  );
};
export default UserModalEdit;

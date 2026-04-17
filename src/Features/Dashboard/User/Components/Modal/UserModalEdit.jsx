import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserPen } from "lucide-react";

import { EditUserSchema } from "@/Features/Dashboard/User/Schema/UserSchema";
import useEditUser from "@/Features/Dashboard/User/Hooks/useEditUser";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import UserForm from "@/Features/Dashboard/User/Components/Form/UserForm";

const UserModalEdit = ({ selectedUser, onOpenModal }) => {
  const { editUserById, loading } = useEditUser();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: selectedUser?.name || "",
      username: selectedUser?.username || "",
      password: "",
      email: selectedUser?.email || "",
      phone: selectedUser?.phone || "",
      role: selectedUser?.role || "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await editUserById(selectedUser.id, data);
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
    <DashModalForm isOpen={!!selectedUser} onOpenModal={() => onOpenModal(null)} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Edit User" icon={UserPen}>
      <UserForm register={register} errors={errors} control={control} type="edit" />
    </DashModalForm>
  );
};
export default UserModalEdit;

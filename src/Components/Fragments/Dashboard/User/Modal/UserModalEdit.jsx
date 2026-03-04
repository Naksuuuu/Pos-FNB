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
      const response = await edit(selectedUser.id, data);
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

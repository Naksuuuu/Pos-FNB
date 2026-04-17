import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

import { CreateUserSchema } from "@/Features/Dashboard/User/Schema/UserSchema";
import useCreateUser from "@/Features/Dashboard/User/Hooks/useCreateUser";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import UserForm from "@/Features/Dashboard/User/Components/Form/UserForm";

const UserModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateUser();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(CreateUserSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message || "User berhasil ditambahkan");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal menambahkan user");
    }
  };

  return (
    <DashModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah User Baru" icon={UserPlus}>
      <UserForm register={register} errors={errors} control={control} type="create" />
    </DashModalForm>
  );
};
export default UserModalCreate;

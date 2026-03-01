import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CreateUserSchema } from "@/Schema/User/UserSchema";
import useCreateUser from "@/Hooks/Dashboard/User/useCreateUser";

import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";
import UserForm from "@/Components/Fragments/Dashboard/User/Form/UserForm";

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
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Tambah User Baru"
    >
      <UserForm register={register} errors={errors} control={control} type="create" />
    </DashModalForm>
  );
};
export default UserModalCreate;

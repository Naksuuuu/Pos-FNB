import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateCustomOption from "@/Features/Dashboard/CustomOption/Hooks/useCreateCustomOption";
import { CustomOptionSchema } from "@/Features/Dashboard/CustomOption/Schema/CustomOptionSchema";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import CustomOptionForm from "@/Features/Dashboard/CustomOption/Components/Form/CustomOptionForm";

const CustomOptionModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateCustomOption();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(CustomOptionSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response?.message || "Opsi kustom berhasil dibuat");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal membuat opsi kustom");
    }
  };

  return (
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Tambah Opsi Kustom"
    >
      <CustomOptionForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};

export default CustomOptionModalCreate;

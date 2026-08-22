import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useEditCustomOption from "@/Features/Dashboard/CustomOption/Hooks/useEditCustomOption";
import { CustomOptionSchema } from "@/Features/Dashboard/CustomOption/Schema/CustomOptionSchema";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import CustomOptionForm from "@/Features/Dashboard/CustomOption/Components/Form/CustomOptionForm";

const CustomOptionModalEdit = ({ selectedCustomOption, onOpenModal }) => {
  const { edit, loading } = useEditCustomOption();
  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(CustomOptionSchema),
    defaultValues: {
      name: selectedCustomOption?.name || "",
      price: selectedCustomOption?.price ? Number(selectedCustomOption.price) : 0,
    },
  });

  useEffect(() => {
    if (selectedCustomOption) {
      reset({
        name: selectedCustomOption.name || "",
        price: selectedCustomOption.price ? Number(selectedCustomOption.price) : 0,
      });
    }
  }, [selectedCustomOption, reset]);

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedCustomOption.id, data);
      onOpenModal(null);
      toast.success(response?.message || "Opsi kustom berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal memperbarui opsi kustom");
    }
  };

  return (
    <DashModalForm
      isOpen={!!selectedCustomOption}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Edit Opsi Kustom"
    >
      <CustomOptionForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};

export default CustomOptionModalEdit;

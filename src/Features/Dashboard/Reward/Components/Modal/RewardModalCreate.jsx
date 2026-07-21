import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateReward from "@/Features/Dashboard/Reward/Hooks/useCreateReward";
import { CreateRewardSchema } from "@/Features/Dashboard/Reward/Schema/RewardSchema";
import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import RewardForm from "@/Features/Dashboard/Reward/Components/Form/RewardForm";

const RewardModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateReward();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(CreateRewardSchema),
    defaultValues: {
      code: "",
      name: "",
      category: "MERCHANDISE",
      point_cost: "",
      stock: "",
      discount_percentage: "",
      status: "ACTIVE",
      description: "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message || "Reward berhasil dibuat");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal membuat reward");
    }
  };

  return (
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Tambah Reward"
    >
      <RewardForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};

export default RewardModalCreate;

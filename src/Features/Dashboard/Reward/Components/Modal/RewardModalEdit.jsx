import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditRewardSchema } from "@/Features/Dashboard/Reward/Schema/RewardSchema";
import useUpdateReward from "@/Features/Dashboard/Reward/Hooks/useUpdateReward";
import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import RewardForm from "@/Features/Dashboard/Reward/Components/Form/RewardForm";

const RewardModalEdit = ({ selectedReward, onOpenModal }) => {
  const { edit, loading } = useUpdateReward();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditRewardSchema),
    defaultValues: {
      code: selectedReward.code || "",
      name: selectedReward.name || "",
      category: selectedReward.category || "MERCHANDISE",
      point_cost: selectedReward.point_cost ? String(selectedReward.point_cost) : "",
      stock: selectedReward.stock !== undefined && selectedReward.stock !== null ? String(selectedReward.stock) : "",
      discount_percentage: selectedReward.discount_percentage !== undefined && selectedReward.discount_percentage !== null ? String(selectedReward.discount_percentage) : "",
      status: selectedReward.status || "ACTIVE",
      description: selectedReward.description || "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedReward.id, data);
      onOpenModal(null);
      toast.success(response.message || "Reward berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal memperbarui reward");
    }
  };

  return (
    <DashModalForm
      isOpen={!!selectedReward}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title={`Edit Reward ${selectedReward?.name}`}
    >
      <RewardForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};

export default RewardModalEdit;

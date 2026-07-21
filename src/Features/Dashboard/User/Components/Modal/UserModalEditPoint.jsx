import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Coins } from "lucide-react";

import { EditLoyaltyPointSchema } from "@/Features/Dashboard/User/Schema/UserSchema";
import useUpdateLoyaltyPoint from "@/Features/Dashboard/User/Hooks/useUpdateLoyaltyPoint";
import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import { InputNumber } from "@/Components/Elements/Inputs/Input";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";

const UserModalEditPoint = ({ selectedUser, onOpenModal }) => {
  const { updateLoyaltyPoint, loading } = useUpdateLoyaltyPoint();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditLoyaltyPointSchema),
    defaultValues: {
      loyalty_point: selectedUser.loyalty_point ? String(selectedUser.loyalty_point) : "0",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await updateLoyaltyPoint(selectedUser.id, data.loyalty_point);
      onOpenModal(null);
      toast.success(response.message || "Loyalty point berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal memperbarui loyalty point");
    }
  };

  return (
    <DashModalForm
      isOpen={!!selectedUser}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title={`Edit Loyalty Point ${selectedUser?.name}`}
      icon={Coins}
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="loyalty_point">
              Loyalty Point <span className="text-destructive">*</span>
            </FieldLabel>
            <InputNumber
              id="loyalty_point"
              name="loyalty_point"
              control={control}
              placeholder="Masukkan jumlah poin"
              autoComplete="off"
              aria-invalid={errors.loyalty_point ? "true" : "false"}
            />
            {errors.loyalty_point && <FieldError>{errors.loyalty_point.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashModalForm>
  );
};

export default UserModalEditPoint;

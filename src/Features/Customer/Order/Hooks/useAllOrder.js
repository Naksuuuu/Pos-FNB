import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import OrderService from "@/Features/Customer/Order/Services/OrderService";
import { CUSTOMER_ORDER_QUERY_KEYS } from "@/Features/Customer/Order/Constants/OrderConstant";

const useAllOrder = (effectiveTableCode, queryWithCode, onCheckoutSuccess) => {
  const storedItems = sessionStorage.getItem("orderItems");
  const [orderItems, setOrderItems] = useState(storedItems ? JSON.parse(storedItems) : []);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { customer_name: "", code: effectiveTableCode, notes: "" },
  });

  const mutation = useMutation({
    mutationKey: CUSTOMER_ORDER_QUERY_KEYS.create(),
    mutationFn: async (orderPayload) => {
      const response = await OrderService.create(orderPayload);

      if (response.status !== 201) {
        throw new Error(response.message || "Failed to create order");
      }

      return response.data;
    },
  });

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);

  const handleCheckout = useCallback(
    async (values) => {
      if (orderItems.length === 0) {
        setError("items", { type: "manual", message: "Belum ada pesanan." });
        return;
      }

      clearErrors();

      try {
        const orderPayload = {
          code: values.code || "A1",
          customer_name: values.customer_name || "Guest",
          notes: values.notes || "",
          items: (orderItems || []).map((item) => ({
            menu_id: item.menu_id,
            qty: Number(item.qty) || 1,
          })),
        };

        const response = await mutation.mutateAsync(orderPayload);
        sessionStorage.setItem("orderResult", JSON.stringify(response));
        sessionStorage.removeItem("orderItems");

        if (onCheckoutSuccess) {
          onCheckoutSuccess();
        }
      } catch (error) {
        if (error?.validationErrors) {
          Object.entries(error.validationErrors).forEach(([field, message]) => {
            setError(field, { type: "server", message: message || "Tidak valid" });
          });
          return;
        }
      }
    },
    [orderItems, mutation, clearErrors, setError, onCheckoutSuccess],
  );

  const deleteOrderItem = useCallback((menuId) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.menu_id !== menuId);
      sessionStorage.setItem("orderItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  // Update form value when effectiveTableCode changes
  useEffect(() => {
    setValue("code", effectiveTableCode);
  }, [effectiveTableCode, setValue]);

  return {
    // Order state
    orderItems,
    totalPrice,
    deleteOrderItem,
    // Form state & methods
    register,
    handleSubmit,
    errors,
    isSubmitting,
    // Checkout handler
    handleCheckout,
    loadingCheckout: mutation.isPending,
  };
};

export default useAllOrder;

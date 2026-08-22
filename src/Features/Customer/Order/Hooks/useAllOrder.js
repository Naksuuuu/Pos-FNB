import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";

import OrderService from "@/Features/Customer/Order/Services/OrderService";
import { CUSTOMER_ORDER_QUERY_KEYS } from "@/Features/Customer/Order/Constants/OrderConstant";
import { selectIsAuthenticated, selectAuthUser } from "@/Redux/Features/Auth/Login/LoginSelector";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";
import useCustomerMyRewards from "@/Features/Customer/Reward/Hooks/useCustomerMyRewards";
// import { custom } from "zod";

const useAllOrder = (effectiveTableCode, onCheckoutSuccess) => {
  const { isTenantPro } = useTenantTier();

  const storedItems = sessionStorage.getItem("orderItems");
  const [orderItems, setOrderItems] = useState(storedItems ? JSON.parse(storedItems) : []);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const { myRewards } = useCustomerMyRewards();
  const [selectedReward, setSelectedReward] = useState(null);

  const availableRewards = useMemo(() => {
    return myRewards.filter(
      (item) => item.status === "APPROVED" && !item.completed_at && item.reward.category === "VOUCHER",
    );
  }, [myRewards]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      customer_name: isAuthenticated && isTenantPro ? user?.name || "" : "",
      customer_id: isAuthenticated && isTenantPro ? user?.id : null,
      code: effectiveTableCode,
      notes: "",
    },
    values: {
      customer_name: isAuthenticated && isTenantPro ? user?.name || "" : "",
      customer_id: isAuthenticated && isTenantPro ? user?.id : null,
      code: effectiveTableCode,
    },
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
          payment_method: "tunai",
          customer_name: values.customer_name || "Guest",
          notes: values.notes || "",
          reward_redeem_id: selectedReward?.id || null,
          items: (orderItems || []).map((item) => ({
            menu_id: item.menu_id,
            qty: Number(item.qty) || 1,
            customs: (item.selected_customs || []).map((c) => c.id),
          })),
        };

        console.log(orderPayload);

        const response = await mutation.mutateAsync(orderPayload);

        // SAVE TO COOKIE WITH 1 YEAR EXPIRATION
        let orderHistory = [];
        try {
          const storedHistory = Cookies.get("orderHistory");
          orderHistory = storedHistory ? JSON.parse(storedHistory) : [];
        } catch {
          orderHistory = [];
        }

        // Push new order response
        orderHistory.push(response);

        // Keep last 10 items to prevent cookie size bloat
        const trimmedHistory = orderHistory.slice(-10);
        Cookies.set("orderHistory", JSON.stringify(trimmedHistory), { expires: 365 });

        sessionStorage.removeItem("orderItems");

        if (onCheckoutSuccess) {
          onCheckoutSuccess(response);
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
    [orderItems, mutation, clearErrors, setError, onCheckoutSuccess, selectedReward],
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
    isAuthenticated,
    // Tenant status
    isTenantPro,
    // Checkout handler
    handleCheckout,
    loadingCheckout: mutation.isPending,
    // Voucher rewards
    availableRewards,
    selectedReward,
    setSelectedReward,
  };
};

export default useAllOrder;

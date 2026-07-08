import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import { CreateCashierOrderSchema } from "@/Features/Dashboard/Cashier/Schema/CashierSchema";
import useTenant from "@/Features/Shared/Hooks/useTenant";

const useCashierNewOrder = () => {
  const queryClient = useQueryClient();
  const { tenant } = useTenant();
  const [cart, setCart] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateCashierOrderSchema),
    defaultValues: {
      code: "",
      customer_name: "",
      notes: "",
      items: [],
    },
  });

  const selectedTableCode = useWatch({ control, name: "code" }) || "";
  const customerName = useWatch({ control, name: "customer_name" }) || "";

  const taxPercentage = Number(tenant?.tax_percentage || 0);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0), [cart]);
  const tax = useMemo(() => Math.round(subtotal * (taxPercentage / 100)), [subtotal, taxPercentage]);
  const grandTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  const canSubmitQueue = useMemo(() => {
    return cart.length > 0 && !!customerName.trim() && !!selectedTableCode;
  }, [cart, customerName, selectedTableCode]);

  useEffect(() => {
    setValue(
      "items",
      cart.map((item) => ({
        menu_id: item.menu_id,
        qty: item.qty,
      })),
    );
  }, [cart, setValue]);

  const addToCart = useCallback((menu) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex((item) => item.menu_id === menu.id);

      if (itemIndex >= 0) {
        return prev.map((item, index) => (index === itemIndex ? { ...item, qty: item.qty + 1 } : item));
      }

      return [
        ...prev,
        {
          menu_id: menu.id,
          name: menu.name,
          price: Number(menu.price || 0),
          qty: 1,
        },
      ];
    });
  }, []);

  const decreaseCartItem = useCallback((menuId) => {
    setCart((prev) => {
      const item = prev.find((itm) => itm.menu_id === menuId);
      if (!item) {
        return prev;
      }

      if (item.qty <= 1) {
        return prev.filter((itm) => itm.menu_id !== menuId);
      }

      return prev.map((itm) => (itm.menu_id === menuId ? { ...itm, qty: itm.qty - 1 } : itm));
    });
  }, []);

  const increaseCartItem = useCallback((menuId) => {
    setCart((prev) => prev.map((itm) => (itm.menu_id === menuId ? { ...itm, qty: itm.qty + 1 } : itm)));
  }, []);

  const removeCartItem = useCallback((menuId) => {
    setCart((prev) => prev.filter((itm) => itm.menu_id !== menuId));
  }, []);

  const clearOrderForm = useCallback(() => {
    reset();
    setCart([]);
  }, [reset]);

  const mutation = useMutation({
    mutationFn: async (menuData) => {
      const response = await CashierService.createOrder(menuData);

      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to create order");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.submittedOrders({ status: "submitted" }) });
    },
  });

  const createOrderQueue = useCallback(
    async (menuData) => {
      const response = await mutation.mutateAsync(menuData);
      return response;
    },
    [mutation],
  );

  return {
    register,
    control,
    errors,
    handleSubmit,

    cart,
    addToCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    clearOrderForm,

    subtotal,
    tax,
    taxPercentage,
    grandTotal,

    canSubmitQueue,
    createOrderQueue,
    loadingCreateOrder: mutation.isPending,
  };
};

export default useCashierNewOrder;

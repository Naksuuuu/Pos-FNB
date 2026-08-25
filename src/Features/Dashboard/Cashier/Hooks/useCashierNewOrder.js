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
      order_type: "DINE_IN",
      code: "",
      customer_name: "",
      notes: "",
      items: [],
    },
  });

  const orderType = useWatch({ control, name: "order_type" }) || "DINE_IN";
  const selectedTableCode = useWatch({ control, name: "code" }) || "";
  const customerName = useWatch({ control, name: "customer_name" }) || "";

  const taxPercentage = Number(tenant?.tax_percentage || 0);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.unit_price || item.price || 0) * Number(item.qty || 0), 0),
    [cart],
  );
  const tax = useMemo(() => Math.round(subtotal * (taxPercentage / 100)), [subtotal, taxPercentage]);
  const grandTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  const canSubmitQueue = useMemo(() => {
    if (cart.length === 0 || !customerName.trim()) return false;
    if (orderType === "DINE_IN" && !selectedTableCode) return false;
    return true;
  }, [cart, customerName, orderType, selectedTableCode]);

  useEffect(() => {
    setValue(
      "items",
      cart.map((item) => ({
        menu_id: item.menu_id,
        qty: item.qty,
        customs: (item.selected_customs || []).map((c) => c.id),
      })),
    );
  }, [cart, setValue]);

  const addToCart = useCallback((menu, selectedCustoms = [], addQty = 1) => {
    setCart((prev) => {
      const basePrice = Number(menu.price || 0);
      const customTotalPrice = (selectedCustoms || []).reduce(
        (sum, c) => sum + Number(c.price || 0),
        0,
      );
      const unitPrice = basePrice + customTotalPrice;
      const customIdsKey = (selectedCustoms || [])
        .map((c) => c.id)
        .sort()
        .join(",");
      const cartItemKey = `${menu.id}-${customIdsKey}`;

      const existingIndex = prev.findIndex(
        (item) => (item.cart_item_key || item.menu_id) === cartItemKey,
      );

      if (existingIndex >= 0) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, qty: item.qty + addQty } : item,
        );
      }

      return [
        ...prev,
        {
          cart_item_key: cartItemKey,
          menu_id: menu.id,
          name: menu.name,
          base_price: basePrice,
          unit_price: unitPrice,
          price: unitPrice,
          qty: addQty,
          custom_ids_key: customIdsKey,
          selected_customs: selectedCustoms,
        },
      ];
    });
  }, []);

  const decreaseCartItem = useCallback((cartItemKey) => {
    setCart((prev) => {
      const item = prev.find((itm) => (itm.cart_item_key || itm.menu_id) === cartItemKey);
      if (!item) {
        return prev;
      }

      if (item.qty <= 1) {
        return prev.filter((itm) => (itm.cart_item_key || itm.menu_id) !== cartItemKey);
      }

      return prev.map((itm) =>
        (itm.cart_item_key || itm.menu_id) === cartItemKey ? { ...itm, qty: itm.qty - 1 } : itm,
      );
    });
  }, []);

  const increaseCartItem = useCallback((cartItemKey) => {
    setCart((prev) =>
      prev.map((itm) =>
        (itm.cart_item_key || itm.menu_id) === cartItemKey ? { ...itm, qty: itm.qty + 1 } : itm,
      ),
    );
  }, []);

  const removeCartItem = useCallback((cartItemKey) => {
    setCart((prev) => prev.filter((itm) => (itm.cart_item_key || itm.menu_id) !== cartItemKey));
  }, []);

  const updateCartItemCustoms = useCallback((targetCartItemKey, selectedCustoms = [], nextQty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item.cart_item_key || item.menu_id) === targetCartItemKey,
      );
      if (existingIndex === -1) return prev;

      const currentItem = prev[existingIndex];
      const basePrice = Number(currentItem.base_price || currentItem.price || 0);
      const customTotalPrice = (selectedCustoms || []).reduce(
        (sum, c) => sum + Number(c.price || 0),
        0,
      );
      const unitPrice = basePrice + customTotalPrice;
      const customIdsKey = (selectedCustoms || [])
        .map((c) => c.id)
        .sort()
        .join(",");
      const newCartItemKey = `${currentItem.menu_id}-${customIdsKey}`;

      const updatedItem = {
        ...currentItem,
        cart_item_key: newCartItemKey,
        unit_price: unitPrice,
        price: unitPrice,
        qty: nextQty,
        custom_ids_key: customIdsKey,
        selected_customs: selectedCustoms,
      };

      const copy = [...prev];
      copy.splice(existingIndex, 1, updatedItem);
      return copy;
    });
  }, []);

  const clearOrderForm = useCallback(() => {
    reset();
    setCart([]);
  }, [reset]);

  const mutation = useMutation({
    mutationFn: async (menuData) => {
      const payload = { ...menuData };
      if (!payload.customer_id) {
        delete payload.customer_id;
      }
      if (payload.order_type === "TAKE_AWAY") {
        delete payload.code;
      }
      const response = await CashierService.createOrder(payload);

      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to create order");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.orders() });
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
    setValue,
    errors,
    handleSubmit,
    orderType,

    cart,
    addToCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    updateCartItemCustoms,
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

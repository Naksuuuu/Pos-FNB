import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import { createOrder } from "@/Redux/Features/Dashboard/Cashier/CashierNewOrderSlice";
import { CreateCashierOrderSchema } from "@/Schema/Cashier/CashierSchema";

const useCashierNewOrder = () => {
  const dispatch = useDispatch();
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

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0), [cart]);
  const tax = useMemo(() => Math.round(subtotal * 0.1), [subtotal]);
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

  const createOrderQueue = useCallback(
    async (menuData) => {
      const response = await dispatch(createOrder(menuData)).unwrap();
      return response;
    },
    [dispatch],
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
    grandTotal,

    canSubmitQueue,
    createOrderQueue,
  };
};

export default useCashierNewOrder;

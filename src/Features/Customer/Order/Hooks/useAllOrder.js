import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import OrderService from "@/Features/Customer/Order/Services/OrderService";
import { CUSTOMER_ORDER_QUERY_KEYS } from "@/Features/Customer/Order/Constants/OrderConstant";

const useAllOrder = () => {
  const storedItems = sessionStorage.getItem("orderItems");
  const [orderItems, setOrderItems] = useState(storedItems ? JSON.parse(storedItems) : []);

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

  const checkout = useCallback(
    async ({ customerName, items, code }) => {
      const orderPayload = {
        code: code || "A1",
        customer_name: customerName || "Guest",
        items: (items || []).map((item) => ({
          menu_id: item.menu_id,
          qty: Number(item.qty) || 1,
        })),
      };

      const response = await mutation.mutateAsync(orderPayload);
      sessionStorage.setItem("orderResult", JSON.stringify(response));
      sessionStorage.removeItem("orderItems");
      return response;
    },
    [mutation],
  );

  const deleteOrderItem = useCallback((menuId) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.menu_id !== menuId);
      sessionStorage.setItem("orderItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  return { orderItems, totalPrice, checkout, deleteOrderItem, loadingCheckout: mutation.isPending };
};

export default useAllOrder;

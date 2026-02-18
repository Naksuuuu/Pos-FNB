import { useCallback, useMemo } from "react";
import { createOrders } from "@/Redux/Features/Customer/Order/OrderSlice";
import { useDispatch } from "react-redux";

const useAllOrder = () => {
  const dispatch = useDispatch();
  const orderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.harga, 0), [orderItems]);

  const chekout = useCallback(
    async (orderData) => {
      const orderPayload = {
        code: "VIP2",
        customer_name: "John Doe",
        items: orderData,
      };

      const response = await dispatch(createOrders(orderPayload)).unwrap();
      sessionStorage.removeItem("orderItems");
      return response;
    },
    [dispatch],
  );

  return { orderItems, totalPrice, chekout };
};

export default useAllOrder;

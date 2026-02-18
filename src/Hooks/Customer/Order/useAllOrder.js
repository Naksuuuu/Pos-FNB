import { useCallback, useMemo } from "react";
import { createOrders } from "@/Redux/Features/Customer/Order/OrderSlice";
import { useDispatch } from "react-redux";

const useAllOrder = () => {
  const dispatch = useDispatch();
  const orderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);

  const checkout = useCallback(
    async ({ customerName, items }) => {
      const orderPayload = {
        code: "VIP2",
        customer_name: customerName || "Guest",
        items: (items || []).map((item) => ({
          menu_id: item.menu_id,
          qty: Number(item.qty) || 1,
        })),
      };

      const response = await dispatch(createOrders(orderPayload)).unwrap();
      sessionStorage.setItem("orderResult", JSON.stringify(response));
      sessionStorage.removeItem("orderItems");
      return response;
    },
    [dispatch],
  );

  return { orderItems, totalPrice, checkout };
};

export default useAllOrder;

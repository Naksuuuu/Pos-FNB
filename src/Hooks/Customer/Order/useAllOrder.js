import { useCallback, useMemo, useState } from "react";
import { createOrders } from "@/Redux/Features/Customer/Order/OrderSlice";
import { useDispatch } from "react-redux";

const useAllOrder = () => {
  const dispatch = useDispatch();
  const storedItems = sessionStorage.getItem("orderItems");
  const [orderItems, setOrderItems] = useState(storedItems ? JSON.parse(storedItems) : []);

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);

  const checkout = useCallback(
    async ({ customerName, items, code }) => {
      const orderPayload = {
        code: code || "VIP2",
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

  const deleteOrderItem = useCallback((menuId) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.menu_id !== menuId);
      sessionStorage.setItem("orderItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  return { orderItems, totalPrice, checkout, deleteOrderItem };
};

export default useAllOrder;

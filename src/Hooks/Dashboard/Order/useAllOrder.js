import { selectAllOrders, selectOrderError, selectOrderLoading, selectOrderPagination } from "@/Redux/Features/Dashboard/Order/OrderSelector";
import { fetchOrders } from "@/Redux/Features/Dashboard/Order/OrderSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const loading = useSelector(selectOrderLoading);
  const errorMessage = useSelector(selectOrderError);
  const pagination = useSelector(selectOrderPagination);

  const loadOrders = useCallback(
    (params) => {
      dispatch(fetchOrders(params));
    },
    [dispatch],
  );

  return { orders, loading, errorMessage, pagination, loadOrders };
};

export default useAllOrder;

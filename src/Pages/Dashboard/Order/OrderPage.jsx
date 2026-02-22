import { Card } from "@/Components/Elements/Cards/Card";
import OrderTable from "@/Components/Fragments/Dashboard/Order/Table/OrderTable";
import useAllOrder from "@/Hooks/Dashboard/Order/useAllOrder";
import { useEffect } from "react";

const OrderPage = () => {
  const { orders, loadOrders, errorMessage, loading, pagination } = useAllOrder();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <>
      <Card className="space-y-2 ">
        <OrderTable orders={orders} loading={loading} errorMessage={errorMessage} pagination={pagination} onOpenDeleteModal={() => {}} onOpenEditModal={() => {}} handlePageChange={() => {}} />
      </Card>
    </>
  );
};
export default OrderPage;

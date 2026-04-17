import { useCallback, useEffect, useState } from "react";
import { Banknote, Plus } from "lucide-react";

import { useNavbar } from "@/Features/Dashboard/Shared/Context/DashNavbarContext";
import useFilterParams from "@/Hooks/useFilterParams";

import { Button } from "@/Components/Elements/Shadcn/button";
import CashierNewOrderTab from "@/Features/Dashboard/Cashier/Components/Tabs/CashierNewOrderTab";
import CashierPaymentTab from "@/Features/Dashboard/Cashier/Components/Tabs/CashierPaymentTab";

const CashierPage = () => {
  const { resetFilters } = useFilterParams();
  const [activeTab, setActiveTab] = useState("new-order");

  const { setCenterContent } = useNavbar();

  const handleChangeTab = useCallback(
    (tab) => {
      resetFilters();
      setActiveTab(tab);
    },
    [resetFilters],
  );

  useEffect(() => {
    setCenterContent(
      <div className="inline-flex p-1 border rounded-xl border-border bg-input/20">
        <Button variant={activeTab === "new-order" ? "default" : "ghost"} className="rounded-lg" onClick={() => handleChangeTab("new-order")}>
          <Plus /> Pesanan Baru
        </Button>
        <Button variant={activeTab === "payment" ? "default" : "ghost"} className="rounded-lg" onClick={() => handleChangeTab("payment")}>
          <Banknote />
          Pembayaran
        </Button>
      </div>,
    );

    return () => setCenterContent(null);
  }, [setCenterContent, activeTab, handleChangeTab]);

  return (
    <div className="space-y-4">
      {activeTab === "new-order" && <CashierNewOrderTab onOrderCreated={() => handleChangeTab("payment")} />}
      {activeTab === "payment" && <CashierPaymentTab />}
    </div>
  );
};

export default CashierPage;

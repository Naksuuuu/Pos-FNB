import { useContext } from "react";

import { TenantContext } from "@/Features/Shared/Context/TenantContext";

const useTenant = () => {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }

  return context;
};

export default useTenant;

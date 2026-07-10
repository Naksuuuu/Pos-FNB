import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import { CUSTOMER_PROFILE_QUERY_KEYS } from "@/Features/Customer/Profile/Constants/CustomerProfileConstant";
import CustomerProfileService from "@/Features/Customer/Profile/Services/CustomerProfileService";

const useCustomerProfile = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: CUSTOMER_PROFILE_QUERY_KEYS.detail(),
    queryFn: async () => {
      const response = await CustomerProfileService.get();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch profile");
      }

      return response.data;
    },
    enabled: isAuthenticated,
  });

  return {
    profile,
    loading: isAuthenticated ? loading : false,
    error: error?.message,
  };
};

export default useCustomerProfile;

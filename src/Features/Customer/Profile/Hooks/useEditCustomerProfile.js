import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

import { CUSTOMER_PROFILE_QUERY_KEYS } from "@/Features/Customer/Profile/Constants/CustomerProfileConstant";
import CustomerProfileService from "@/Features/Customer/Profile/Services/CustomerProfileService";
import { setCredentials } from "@/Redux/Features/Auth/Login/LoginSlice";
import { setUserData, getAuthToken } from "@/Utils/sessionUtils";

const useEditCustomerProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await CustomerProfileService.edit(data);

        if (!response.success) {
          throw new Error(response?.message || "Failed to edit profile");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit profile");
      }
    },
    onSuccess: async (response) => {
      const updatedUser = response?.data;
      if (updatedUser) {
        setUserData(updatedUser);
        dispatch(setCredentials({ user: updatedUser, token: getAuthToken() }));
      }
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_PROFILE_QUERY_KEYS.detail() });
    },
  });

  const edit = useCallback(
    async (data) => {
      const response = await mutation.mutateAsync(data);
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useEditCustomerProfile;

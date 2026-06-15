import { apiUtils } from "@/Services/Common/Base";

const LOGOUT_URL = "/auth/logout";

const LogoutService = {
  logout: async (token) => {
    const response = await apiUtils.post(
      LOGOUT_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
};

export default LogoutService;

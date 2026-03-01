import { apiUtils } from "@/Services/Common/Base";

const LOGIN_URL = "/auth/login";
const LOGOUT_URL = "/auth/logout";

export const Login = async (data) => {
  const response = await apiUtils.post(LOGIN_URL, data);
  return response.data;
};

export const Logout = async (token) => {
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
};

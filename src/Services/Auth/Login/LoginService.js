import { apiUtils } from "@/Services/Common/Base";

const LOGIN_URL = "/auth/login";

export const Login = async (data) => {
  const response = await apiUtils.post(LOGIN_URL, data);
  return response.data;
};

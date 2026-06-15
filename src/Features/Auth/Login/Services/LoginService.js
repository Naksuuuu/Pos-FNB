import { apiUtils } from "@/Services/Common/Base";

const LOGIN_URL = "/auth/login";
const ME_URL = "/auth/me";

const LoginService = {
  login: async (data) => {
    const response = await apiUtils.post(LOGIN_URL, data);
    return response.data;
  },

  me: async () => {
    const response = await apiUtils.get(ME_URL);
    return response.data;
  },
};

export default LoginService;

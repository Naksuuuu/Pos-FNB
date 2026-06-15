import { apiUtils } from "@/Services/Common/Base";

const REGISTER_URL = "/auth/register";

const RegisterService = {
  register: async (data) => {
    const response = await apiUtils.post(REGISTER_URL, data);
    return response.data;
  },
};

export default RegisterService;

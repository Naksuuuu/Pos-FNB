import { apiUtils } from "@/Services/Common/Base";

const PaymentService = {
  getMidtransSnapToken: async (orderId) => {
    const response = await apiUtils.post("/payments/midtrans-token", { order_id: orderId });
    return response.data;
  },

  notifyMidtrans: async (payload) => {
    const response = await apiUtils.post("/payments/midtrans-notification", payload);
    return response.data;
  },
};

export default PaymentService;

import Cookies from "js-cookie";

/**
 * Normalizes raw order data from either Cookie (Guest Mode) or API Response (Logged-In Mode)
 * into a single unified and clean order object structure.
 */
export const normalizeOrder = (rawOrderData) => {
  if (!rawOrderData) return null;

  // Extract order object from potential wrapper structures
  const order = rawOrderData?.order || rawOrderData?.data?.order || rawOrderData || {};

  if (!order || typeof order !== "object" || !order.id) return null;

  // Extract payment properties safely
  const paymentMethod = String(order?.payment?.method || order?.payment_method || "tunai").toLowerCase();
  const paymentStatus = String(order?.payment?.status || order?.payment_status || "unpaid").toLowerCase();
  const rawStatus = String(order?.status || "").toUpperCase();
  const rawPaymentStatus = String(paymentStatus).toUpperCase();

  const isNonTunai = paymentMethod === "nontunai";
  const isSettled =
    ["PAID", "SETTLEMENT", "COMPLETED"].includes(rawPaymentStatus) || ["COMPLETED", "SETTLEMENT"].includes(rawStatus);

  // Normalize items array
  const rawItems = Array.isArray(order?.items) ? order.items : [];
  const normalizedItems = rawItems.map((item) => {
    const menuObj = item?.menu || {};
    return {
      id: item?.id || item?.menu_id,
      menuId: item?.menu_id || menuObj?.id,
      name: menuObj?.name || item?.name || "Menu",
      description: menuObj?.description || "",
      image: menuObj?.image_url || menuObj?.image || "",
      qty: Number(item?.qty || 1),
      price: Number(item?.price || 0),
      subtotal: Number(item?.subtotal || (item?.price || 0) * (item?.qty || 1)),
      customs: (Array.isArray(item?.customs)
        ? item.customs
        : Array.isArray(item?.selected_customs)
          ? item.selected_customs
          : []
      ).map((c) => ({
        id: c.id,
        name: c.name || c.custom_name || "Custom",
        price: Number(c.price || 0),
      })),
    };
  });

  const subtotalAmount = Number(order?.subtotal_amount || 0);
  const taxPercentage = parseFloat(order?.tax_percentage || "0");
  const taxAmount = Number(order?.tax_amount || 0) || subtotalAmount * (taxPercentage / 100);
  const discountAmount = Number(order?.discount_amount || 0);
  const totalAmount = Number(order?.total_amount || 0) || Math.max(0, subtotalAmount - discountAmount + taxAmount);

  return {
    id: order.id,
    orderNo: order.order_no || "-",
    customerName: order.customer_name || "Pelanggan",
    customerId: order.customer_id || null,
    tableId: order.table_id || order.table?.id || null,
    tableCode: order.table?.code,
    paymentMethod,
    paymentStatus,
    status: order.status || "submitted",
    notes: order.notes || "",
    subtotalAmount,
    taxPercentage,
    taxAmount,
    discountAmount,
    totalAmount,
    isNonTunai,
    isSettled,
    createdAt: order.created_at || null,
    updatedAt: order.updated_at || null,
    rewardRedeem: order.reward_redeem || null,
    payment: order.payment || null,
    items: normalizedItems,
    _raw: order,
  };
};

/**
 * Updates or replaces an existing order in Cookies.get("orderHistory") with latest API response
 */
export const updateOrderInCookies = (latestOrderResponse) => {
  if (!latestOrderResponse) return;

  const targetOrder = latestOrderResponse?.order || latestOrderResponse?.data?.order || latestOrderResponse;
  const targetId = targetOrder?.id;

  if (!targetId) return;

  try {
    const storedHistory = Cookies.get("orderHistory");
    let orderHistory = storedHistory ? JSON.parse(storedHistory) : [];

    const existingIndex = orderHistory.findIndex((item) => {
      const itemOrder = item?.order || item?.data?.order || item || {};
      return itemOrder.id === targetId;
    });

    if (existingIndex !== -1) {
      orderHistory[existingIndex] = latestOrderResponse;
    } else {
      orderHistory.push(latestOrderResponse);
    }

    const trimmedHistory = orderHistory.slice(-10);
    Cookies.set("orderHistory", JSON.stringify(trimmedHistory), { expires: 365, path: "/" });
  } catch (error) {
    console.error("Error updating order in cookies:", error);
  }
};

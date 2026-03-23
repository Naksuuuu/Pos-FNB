import { createSelector } from "@reduxjs/toolkit";

export const selectCashierNewOrderState = (state) => state.dashboard.cashierNewOrder;
export const selectCashierPaymentState = (state) => state.dashboard.cashierPayment;

export const selectCashierMenus = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.menus);
export const selectCashierCategories = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.categories);
export const selectCashierTables = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.tables);
export const selectCashierError = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.error);

export const selectCashierLoading = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.loading);
export const selectCashierLoadingCategories = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.loadingCategories);
export const selectCashierLoadingTables = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.loadingTables);
export const selectOrderCreateLoading = createSelector([selectCashierNewOrderState], (cashierState) => cashierState.loadingCreate);

export const selectCashierSubmittedOrders = createSelector([selectCashierPaymentState], (cashierState) => cashierState.submittedOrders);

export const selectCashierSubmittedOrdersLoading = createSelector([selectCashierPaymentState], (cashierState) => cashierState.loadingSubmittedOrders);
export const selectOrderPaymentLoading = createSelector([selectCashierPaymentState], (cashierState) => cashierState.loadingPayment);
export const selectOrderUpdateStatusLoading = createSelector([selectCashierPaymentState], (cashierState) => cashierState.loadingUpdateStatus);

export const selectCashierNewOrderVM = createSelector([selectCashierNewOrderState], (cashierState) => ({
  menus: cashierState.menus,
  categories: cashierState.categories,
  tables: cashierState.tables,
  loadingResources: cashierState.loadingInit || cashierState.loading || cashierState.loadingCategories || cashierState.loadingTables,
  loadingCreateOrder: cashierState.loadingCreate,
  pagination: cashierState.pagination,
}));

export const selectCashierPaymentVM = createSelector([selectCashierPaymentState], (cashierState) => ({
  submittedOrders: cashierState.submittedOrders,
  loadingSubmittedOrders: cashierState.loadingSubmittedOrders,
  loadingPayment: cashierState.loadingPayment,
  loadingUpdateStatus: cashierState.loadingUpdateStatus,
  isNewOrder: cashierState.isNewOrder,
}));

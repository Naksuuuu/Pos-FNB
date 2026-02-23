import { createSelector } from "@reduxjs/toolkit";

export const selectOrderState = (state) => state.dashboard.order;

export const selectAllOrders = createSelector([selectOrderState], (orderState) => orderState.orders);
export const selectOrderLoading = createSelector([selectOrderState], (orderState) => orderState.loading);
export const selectOrderError = createSelector([selectOrderState], (orderState) => orderState.error);
export const selectOrderPagination = createSelector([selectOrderState], (orderState) => orderState.pagination || {});
export const selectOrderStatistic = createSelector([selectOrderState], (orderState) => orderState.statistic || {});
export const selectOrderFilters = createSelector([selectOrderState], (orderState) => orderState.filters || {});

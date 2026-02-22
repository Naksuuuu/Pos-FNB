import { createSelector } from "@reduxjs/toolkit";

export const selectDiningTableState = (state) => state.dashboard.diningTable;

export const selectAllDiningTables = createSelector([selectDiningTableState], (diningTableState) => diningTableState.diningTables);
export const selectDiningTableLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loading);
export const selectDiningTableError = createSelector([selectDiningTableState], (diningTableState) => diningTableState.error);
export const selectDiningTablePagination = createSelector([selectDiningTableState], (diningTableState) => diningTableState.pagination || {});
export const selectDiningTableStatistic = createSelector([selectDiningTableState], (diningTableState) => diningTableState.statistic);

export const selectDiningTableCreateLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingCreate);
export const selectDiningTableEditLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingEdit);
export const selectDiningTableDeleteLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingDelete);

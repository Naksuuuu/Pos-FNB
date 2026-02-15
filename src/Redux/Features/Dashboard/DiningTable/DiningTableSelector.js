import { createSelector } from "@reduxjs/toolkit";

export const selectDiningTableState = (state) => state.diningTable || { diningTables: [], loading: false, error: null };

export const selectAllDiningTables = createSelector([selectDiningTableState], (diningTableState) => diningTableState.diningTables || []);
export const selectDiningTableLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loading || false);
export const selectDiningTableError = createSelector([selectDiningTableState], (diningTableState) => diningTableState.error || null);

export const selectDiningTableCreateLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingCreate);
export const selectDiningTableEditLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingEdit);
export const selectDiningTableDeleteLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loadingDelete);

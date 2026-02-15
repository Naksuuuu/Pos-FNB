import { createSelector } from "@reduxjs/toolkit";

export const selectDiningTableState = (state) => state.diningTable || { diningTables: [], loading: false, error: null };

export const selectAllDiningTables = createSelector([selectDiningTableState], (diningTableState) => diningTableState.diningTables || []);
export const selectDiningTableLoading = createSelector([selectDiningTableState], (diningTableState) => diningTableState.loading || false);
export const selectDiningTableError = createSelector([selectDiningTableState], (diningTableState) => diningTableState.error || null);

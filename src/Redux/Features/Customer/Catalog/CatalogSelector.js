import { createSelector } from "@reduxjs/toolkit";

const selectCatalogState = (state) => state.customer.catalog || { catalogs: [], loading: false, error: null };

export const selectAllCatalogs = createSelector([selectCatalogState], (catalogState) => catalogState.catalogs || []);
export const selectCatalogLoading = createSelector([selectCatalogState], (catalogState) => catalogState.loading || false);
export const selectCatalogError = createSelector([selectCatalogState], (catalogState) => catalogState.error || null);
export const selectCatalogFilters = createSelector([selectCatalogState], (catalogState) => catalogState.filters || {});

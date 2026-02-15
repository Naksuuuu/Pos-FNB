import { createSelector } from "@reduxjs/toolkit";

export const selectCategoryState = (state) => state.category || { categories: [], loading: false, error: null };

export const selectAllCategories = createSelector([selectCategoryState], (categoryState) => categoryState.categories || []);
export const selectCategoryLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loading || false);
export const selectCategoryError = createSelector([selectCategoryState], (categoryState) => categoryState.error || null);

export const selectCategoryCreateLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingCreate);

export const selectCategoryEditLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingEdit);

export const selectCategoryDeleteLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingDelete);

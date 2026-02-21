import { createSelector } from "@reduxjs/toolkit";

export const selectCategoryState = (state) => state.dashboard.category;

export const selectAllCategories = createSelector([selectCategoryState], (categoryState) => categoryState.categories);
export const selectCategoryLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loading);
export const selectCategoryError = createSelector([selectCategoryState], (categoryState) => categoryState.error);
export const selectCategoryStatistic = createSelector([selectCategoryState], (categoryState) => categoryState.statistic);

export const selectCategoryCreateLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingCreate);

export const selectCategoryEditLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingEdit);

export const selectCategoryDeleteLoading = createSelector([selectCategoryState], (categoryState) => categoryState.loadingDelete);

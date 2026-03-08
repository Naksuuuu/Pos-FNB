import { createSelector } from "@reduxjs/toolkit";

export const selectMenuState = (state) => state.dashboard.menu;

export const selectAllMenus = createSelector([selectMenuState], (menuState) => menuState.menus);
export const selectMenuLoading = createSelector([selectMenuState], (menuState) => menuState.loading);
export const selectMenuError = createSelector([selectMenuState], (menuState) => menuState.error);
export const selectMenuPagination = createSelector([selectMenuState], (menuState) => menuState.pagination || {});
export const selectMenuStatistic = createSelector([selectMenuState], (menuState) => menuState.statistic);

export const selectMenuCreateLoading = createSelector([selectMenuState], (menuState) => menuState.loadingCreate);

export const selectMenuEditLoading = createSelector([selectMenuState], (menuState) => menuState.loadingEdit);

export const selectMenuDeleteLoading = createSelector([selectMenuState], (menuState) => menuState.loadingDelete);
export const selectMenuBulkDeleteLoading = createSelector([selectMenuState], (menuState) => menuState.loadingBulkDelete);

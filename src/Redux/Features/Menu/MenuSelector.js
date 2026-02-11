import { createSelector } from "@reduxjs/toolkit";

export const selectMenuState = (state) => state.menu || { menus: [], loading: false, error: null };

export const selectAllMenus = createSelector([selectMenuState], (menuState) => menuState.menus || []);
export const selectMenuLoading = createSelector([selectMenuState], (menuState) => menuState.loading || false);
export const selectMenuError = createSelector([selectMenuState], (menuState) => menuState.error || null);
export const selectMenuPagination = createSelector([selectMenuState], (menuState) => menuState.pagination || {});

export const selectMenuCreateLoading = createSelector([selectMenuState], (menuState) => menuState.loadingCreate);

export const selectMenuEditLoading = createSelector([selectMenuState], (menuState) => menuState.loadingEdit);

export const selectMenuDeleteLoading = createSelector([selectMenuState], (menuState) => menuState.loadingDelete);

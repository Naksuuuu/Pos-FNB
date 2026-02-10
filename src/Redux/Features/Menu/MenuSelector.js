import { createSelector } from "@reduxjs/toolkit";

export const selectMenuState = (state) => state.menu;

export const selectAllMenus = createSelector([selectMenuState], (menuState) => menuState.menus);
export const selectMenuLoading = createSelector([selectMenuState], (menuState) => menuState.loading);
export const selectMenuError = createSelector([selectMenuState], (menuState) => menuState.error);

export const selectMenuCreateLoading = createSelector([selectMenuState], (menuState) => menuState.loadingCreate);
export const selectMenuCreateError = createSelector([selectMenuState], (menuState) => menuState.errorCreate);

export const selectMenuEditLoading = createSelector([selectMenuState], (menuState) => menuState.loadingEdit);
export const selectMenuEditError = createSelector([selectMenuState], (menuState) => menuState.errorEdit);

export const selectMenuDeleteLoading = createSelector([selectMenuState], (menuState) => menuState.loadingDelete);
export const selectMenuDeleteError = createSelector([selectMenuState], (menuState) => menuState.errorDelete);

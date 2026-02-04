import { createSelector } from "@reduxjs/toolkit";

export const selectMenuState = (state) => state.menu;

export const selectAllMenus = createSelector([selectMenuState], (menuState) => menuState.menus);

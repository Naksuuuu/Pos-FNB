import { createSelector } from "@reduxjs/toolkit";

export const selectUserState = (state) => state.dashboard.user;

export const selectAllUsers = createSelector([selectUserState], (userState) => userState.users);
export const selectUserLoading = createSelector([selectUserState], (userState) => userState.loading);
export const selectUserError = createSelector([selectUserState], (userState) => userState.error);
export const selectUserStatistic = createSelector([selectUserState], (userState) => userState.statistic);
export const selectUserPagination = createSelector([selectUserState], (userState) => userState.pagination);
export const selectUserFilters = createSelector([selectUserState], (userState) => userState.filters);

export const selectUserCreateLoading = createSelector([selectUserState], (userState) => userState.loadingCreate);

export const selectUserEditLoading = createSelector([selectUserState], (userState) => userState.loadingEdit);

export const selectUserDeleteLoading = createSelector([selectUserState], (userState) => userState.loadingDelete);

export const selectUserBulkDeleteLoading = createSelector([selectUserState], (userState) => userState.loadingBulkDelete);

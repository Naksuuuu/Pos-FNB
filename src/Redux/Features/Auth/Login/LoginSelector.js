import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => state.auth.auth;

export const selectAuthUser = createSelector([selectAuthState], (authState) => authState.user);
export const selectAuthRole = createSelector([selectAuthState], (authState) => authState.user?.role);
export const selectAuthToken = createSelector([selectAuthState], (authState) => authState.token);
export const selectAuthLoading = createSelector([selectAuthState], (authState) => authState.isLoading);
export const selectIsAuthenticated = createSelector([selectAuthState], (authState) => authState.isAuthenticated);
// export const selectAuthError = createSelector([selectAuthState], (authState) => authState.error);

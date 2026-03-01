import { createSelector } from "@reduxjs/toolkit";

const selectProfileState = (state) => state.dashboard.profile;

export const selectProfile = createSelector(selectProfileState, (state) => state.profile);
export const selectProfileLoading = createSelector(selectProfileState, (state) => state.loading);
export const selectProfileError = createSelector(selectProfileState, (state) => state.error);
export const selectProfileLoadingChangePassword = createSelector(
  selectProfileState,
  (state) => state.loadingChangePassword,
);
export const selectLoadingEditProfile = createSelector(selectProfileState, (state) => state.loadingEditProfile);

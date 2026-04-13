import { createSelector } from "@reduxjs/toolkit";

const selectSettingsState = (state) => state.dashboard.settings;

export const selectSetting = createSelector(selectSettingsState, (state) => state.setting);
export const selectSettingsError = createSelector(selectSettingsState, (state) => state.error);

export const selectSettingsLoadingGet = createSelector(selectSettingsState, (state) => state.loadingGet);
export const selectSettingsLoadingSave = createSelector(selectSettingsState, (state) => state.loadingSave);
export const selectSettingsLoadingDelete = createSelector(selectSettingsState, (state) => state.loadingDelete);
export const selectSettingsLoadingUploadLogo = createSelector(selectSettingsState, (state) => state.loadingUploadLogo);
export const selectSettingsLoadingDeleteLogo = createSelector(selectSettingsState, (state) => state.loadingDeleteLogo);

export const selectSettingsVM = createSelector([selectSettingsState], (state) => ({
  setting: state.setting,
  error: state.error,
  loadingGet: state.loadingGet,
  loadingSave: state.loadingSave,
  loadingDelete: state.loadingDelete,
  loadingUploadLogo: state.loadingUploadLogo,
  loadingDeleteLogo: state.loadingDeleteLogo,
}));

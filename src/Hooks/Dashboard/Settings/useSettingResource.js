import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { selectSettingsVM } from "@/Redux/Features/Dashboard/Settings/SettingsSelector";
import { fetchSetting } from "@/Redux/Features/Dashboard/Settings/SettingsSlice";

const useSettingResource = () => {
  const dispatch = useDispatch();

  const { setting, error, loadingGet, loadingSave, loadingDelete, loadingUploadLogo, loadingDeleteLogo } = useSelector(selectSettingsVM, shallowEqual);

  const loadSetting = useCallback(async () => {
    const response = await dispatch(fetchSetting()).unwrap();
    return response;
  }, [dispatch]);

  return {
    setting,
    error,
    loadingGet,
    loadingSave,
    loadingDelete,
    loadingUploadLogo,
    loadingDeleteLogo,
    loadSetting,
  };
};

export default useSettingResource;

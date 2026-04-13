import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteSettingLogo, uploadSettingLogo } from "@/Redux/Features/Dashboard/Settings/SettingsSlice";
import { selectSettingsLoadingDeleteLogo, selectSettingsLoadingUploadLogo } from "@/Redux/Features/Dashboard/Settings/SettingsSelector";

const useSettingLogo = () => {
  const dispatch = useDispatch();

  const loadingUpload = useSelector(selectSettingsLoadingUploadLogo);
  const loadingDelete = useSelector(selectSettingsLoadingDeleteLogo);

  const uploadLogo = useCallback(
    async ({ id, logo }) => {
      const response = await dispatch(uploadSettingLogo({ id, logo })).unwrap();
      return response;
    },
    [dispatch],
  );

  const removeLogo = useCallback(
    async (id) => {
      const response = await dispatch(deleteSettingLogo(id)).unwrap();
      return response;
    },
    [dispatch],
  );

  return {
    uploadLogo,
    removeLogo,
    loadingUpload,
    loadingDelete,
  };
};

export default useSettingLogo;

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveSetting } from "@/Redux/Features/Dashboard/Settings/SettingsSlice";
import { selectSettingsLoadingSave } from "@/Redux/Features/Dashboard/Settings/SettingsSelector";

const useSaveSetting = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectSettingsLoadingSave);

  const save = useCallback(
    async (payload) => {
      const response = await dispatch(saveSetting(payload)).unwrap();
      return response;
    },
    [dispatch],
  );

  return { save, loading };
};

export default useSaveSetting;

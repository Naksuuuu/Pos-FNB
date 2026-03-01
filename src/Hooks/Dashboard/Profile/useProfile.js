import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProfile, selectProfileLoading } from "@/Redux/Features/Dashboard/Profile/ProfileSelector";
import { getProfile } from "@/Redux/Features/Dashboard/Profile/ProfileSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);

  const loadProfile = useCallback(async () => {
    const response = await dispatch(getProfile()).unwrap();
    return response;
  }, [dispatch]);

  return {
    profile,
    loading,
    loadProfile,
  };
};

export default useProfile;

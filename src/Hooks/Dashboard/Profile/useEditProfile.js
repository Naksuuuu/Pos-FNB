import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editProfile } from "@/Redux/Features/Dashboard/Profile/ProfileSlice";
import { selectLoadingEditProfile } from "@/Redux/Features/Dashboard/Profile/ProfileSelector";

const useEditProfile = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingEditProfile);

  const edit = useCallback(
    async (data) => {
      const response = await dispatch(editProfile(data)).unwrap();
      return response;
    },
    [dispatch],
  );

  return { edit, loading };
};

export default useEditProfile;

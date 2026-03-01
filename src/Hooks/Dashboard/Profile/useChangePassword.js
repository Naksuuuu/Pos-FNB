import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { changeUserPassword } from "@/Redux/Features/Dashboard/Profile/ProfileSlice";
import { useSelector } from "react-redux";
import { selectProfileLoadingChangePassword } from "@/Redux/Features/Dashboard/Profile/ProfileSelector";

const useChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectProfileLoadingChangePassword);

  const change = useCallback(
    async (data) => {
      const response = await dispatch(changeUserPassword(data)).unwrap();
      return response;
    },
    [dispatch],
  );

  return { change, loading };
};

export default useChangePassword;

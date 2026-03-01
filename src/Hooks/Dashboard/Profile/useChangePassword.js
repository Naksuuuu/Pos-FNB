import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { changeUserPassword } from "@/Redux/Features/Dashboard/Profile/ProfileSlice";
import { selectProfileLoadingChangePassword } from "@/Redux/Features/Dashboard/Profile/ProfileSelector";

const useChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectProfileLoadingChangePassword);
  const [visiblePassword, setVisiblePassword] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const change = useCallback(
    async (data) => {
      const response = await dispatch(changeUserPassword(data)).unwrap();
      return response;
    },
    [dispatch],
  );

  const handleVisiblePassword = useCallback((field) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  return { change, loading, visiblePassword, handleVisiblePassword };
};

export default useChangePassword;

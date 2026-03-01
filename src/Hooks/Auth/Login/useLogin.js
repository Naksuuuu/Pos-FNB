import { selectAuthLoading } from "@/Redux/Features/Auth/Login/LoginSelector";
import { LoginUser, LogoutUser } from "@/Redux/Features/Auth/Login/LoginSlice";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useLogin = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setVisiblePassword((prev) => !prev);
  }, []);

  const Login = useCallback(
    async (data) => {
      const response = await dispatch(LoginUser(data)).unwrap();
      return response;
    },
    [dispatch],
  );

  return {
    Login,
    loading,
    visiblePassword,
    handleTogglePassword,
  };
};

export default useLogin;

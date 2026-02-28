import { LoginUser } from "@/Redux/Features/Auth/Login/LoginSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const dispatch = useDispatch();
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
    visiblePassword,
    handleTogglePassword,
  };
};

export default useLogin;

import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export const setAuthToken = (token) => {
  if (token) {
    Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7 });
  }
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY) || null;
};

export const clearAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

export const setUserData = (userData) => {
  if (userData) {
    Cookies.set(USER_DATA_KEY, JSON.stringify(userData), { expires: 7 });
  }
};

export const getUserData = () => {
  const userData = Cookies.get(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const clearUserData = () => {
  Cookies.remove(USER_DATA_KEY);
};

export const clearAllAuthData = () => {
  clearAuthToken();
  clearUserData();
};

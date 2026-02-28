const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export const setAuthToken = (token) => {
  if (token) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = () => {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearAuthToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(USER_DATA_KEY);
};

export const setUserData = (userData) => {
  if (userData) {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

export const getUserData = () => {
  const userData = sessionStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const clearUserData = () => {
  sessionStorage.removeItem(USER_DATA_KEY);
};

export const clearAllAuthData = () => {
  clearAuthToken();
  clearUserData();
};
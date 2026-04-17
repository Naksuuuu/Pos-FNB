import axios from "axios";
import { parseValidationErrors } from "../../Utils/errorHandler";
import { clearAuthToken, getAuthToken } from "@/Utils/sessionUtils";
import { ROUTES } from "@/Constants/RouteConstant";
// import { clearAuthToken, getAuthToken } from "../../Utils/cookieUtils";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata?.startTime;
    response.duration = duration;

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        clearAuthToken();
        const url = new URL(window.location.href);
        if (typeof window !== "undefined" && !window.location.pathname.includes("/auth/login")) {
          const newUrl = `${ROUTES.AUTH.LOGIN}?callbackUrl=${url.pathname}${url.search}`;
          window.location.href = newUrl;
        }
      }

      if (status === 422 && data?.errors) {
        const { validationErrors, allErrors } = parseValidationErrors(data);

        return Promise.reject({
          message: data.message || "Validation Error",
          status: 422,
          data: data.data || data.errors || data.data.errors,
          validationErrors,
          allErrors,
          isValidationError: true,
        });
      }

      return Promise.reject({
        message: data?.message || `Error ${status}`,
        status,
        data: data?.data || data,
      });
    }

    if (error.request) {
      return Promise.reject({
        message: "Cannot connect to server. Please check your internet connection.",
        type: "network",
      });
    }

    return Promise.reject({
      message: error.message || "An unknown error occurred.",
      type: "unknown",
    });
  },
);

export const apiUtils = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default api;

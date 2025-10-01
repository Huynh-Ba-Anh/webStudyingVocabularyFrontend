import axios from "axios";
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  removeAccessTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "../shared/utils/storsge";
import config from "../configs";

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
axiosClient.interceptors.request.use((cfg) => {
  const accessToken = getAccessTokenFromLS();
  if (accessToken) cfg.headers.Authorization = `Bearer ${accessToken}`;
  return cfg;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromLS();
        const res = await axios.post(`${config.baseUrl}/auth/refreshtoken`, {
          refresh_token: refreshToken,
        });

        const { accessToken, refreshtoken } = res.data;
        setAccessTokenToLS(accessToken);
        setRefreshTokenToLS(refreshtoken);

        // Update axiosClient headers
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        return axiosClient(originalRequest);
      } catch (e) {
        removeAccessTokenFromLS();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

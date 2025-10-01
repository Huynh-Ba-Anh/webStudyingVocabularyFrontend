const ACCESS_TOKEN_KEY = "accessToken";   // camelCase
const REFRESH_TOKEN_KEY = "refreshToken";

export const setAccessTokenToLS = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessTokenFromLS = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessTokenFromLS = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const setRefreshTokenToLS = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshTokenFromLS = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeRefreshTokenFromLS = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const clearAllTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

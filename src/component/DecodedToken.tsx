import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  id: string;
  exp: number;
  iat: number;
  sub: string;
  role: string;
}

export const useDecodedToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;
  try {
    return jwtDecode<JwtPayload>(accessToken);
  } catch {
    return null;
  }
};

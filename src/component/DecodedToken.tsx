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
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

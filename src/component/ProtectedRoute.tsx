import { Navigate, Outlet, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  exp: number;
  iat: number;
  sub: string;
  role: string;
}

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { username } = useParams();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    if (decoded.username !== username) {
      return <Navigate to="*" replace />;
    }

    return <Outlet />; 
  } catch (error) {
      console.error(error);
    return <Navigate to="*" replace />;
  }
};

export default ProtectedRoute;

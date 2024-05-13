import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useAuth";
import { useEffect } from "react";
import AuthSpinner from "./AuthSpinner";
import { getCookie } from "../utils/getCookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const cookie = getCookie("isAuthenticated");
  const isAuth = !!cookie;

  const { isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuth && !isLoading) navigate("/login", { replace: true });
    },
    [navigate, isAuth, isLoading]
  );

  if (isLoading) return <AuthSpinner />;

  if (isAuth) return children;
}

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Spinners from "../layouts/Spinner";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <Spinners />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

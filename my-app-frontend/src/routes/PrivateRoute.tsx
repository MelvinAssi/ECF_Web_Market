import type { JSX } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";


type Props = {
  children: JSX.Element;
};
const PrivateRoute = ({ children }:Props) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

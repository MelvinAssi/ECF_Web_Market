import type { JSX } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};
type LocationState = {
  from?: {
    pathname: string;
  };
};

const AuthRoute = ({ children }:Props) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname;
  
  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to={from || "/profile"} replace />; 
  }

  return children;
};

export default AuthRoute;

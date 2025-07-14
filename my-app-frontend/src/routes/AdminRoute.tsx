import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import type { JSX } from "react";

type Props = {
    children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
    const { user, isLoading } = useAuthContext();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;

import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext";

const PortalRedirect = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.role === "college") {
    return <Navigate to="/college" replace />;
  }

  if (profile.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard/student" replace />;
};

export default PortalRedirect;
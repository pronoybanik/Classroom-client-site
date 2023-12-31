import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../shared/AuthPovider";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();

  if (loading) {
    return "loading..";
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location.pathname }} replace></Navigate>;
};

export default PrivateRouter;

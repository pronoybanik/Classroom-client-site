import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../shared/AuthPovider";
import Loading from "../shared/Loading";

const AdminPrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/v1/userInfo/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data.data));
    }
  }, [userId]);

  if (loading) {
    return <Loading />;
  }
  if (user && userData?.userRole === "admin") {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    ></Navigate>
  );
};

export default AdminPrivateRouter;

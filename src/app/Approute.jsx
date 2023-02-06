import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

// HOC: high order component

const Approute = ({ path, component: Comp, isPrivate, isAuth }) => {
  const token = localStorage.getItem("accessToken");
  const profile = useSelector((state) => state.user.profile);
  if (isPrivate) {
    if (token) return <Route path={path} element={<Comp />} />;
    return <Navigate to="/login" replace />;
  }
  if (isAuth) {
    if (!profile) return <Route path={path} element={<Comp />} />;
    return <Navigate to="/" replace />;
  }
  return <Route path={path} element={<Comp />} />;
};

export default Approute;

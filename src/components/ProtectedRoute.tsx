import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const role = localStorage.getItem("role");
  return role && allowedRoles.includes(role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

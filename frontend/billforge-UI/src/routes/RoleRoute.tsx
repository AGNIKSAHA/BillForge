import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleRoute({ allowedRoles, children }: Props) {
  const { role } = useRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

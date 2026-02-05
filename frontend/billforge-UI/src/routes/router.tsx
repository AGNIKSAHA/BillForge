import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ProjectList from "../pages/project/ProjectList";
import ClientList from "../pages/client/ClientList";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Dashboard /> },

          {
            path: "/projects",
            element: (
              <RoleRoute allowedRoles={["freelancer", "admin"]}>
                <ProjectList />
              </RoleRoute>
            )
          },

          {
            path: "/clients",
            element: (
              <RoleRoute allowedRoles={["client", "admin"]}>
                <ClientList />
              </RoleRoute>
            )
          }
        ]
      }
    ]
  }
]);

export default router;

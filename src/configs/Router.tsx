import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedPage from "@/layouts/ProtectedPage";
import { authRoute } from "@/routes/AuthRoute";
import { errorRoute } from "@/routes/ErrorRoute";
import { protectedRoutes } from "@/routes/ProtectedRoute";
import { convertRoutesToRouteObject } from "@/utils/Route";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <ProtectedPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: convertRoutesToRouteObject(protectedRoutes),
      },
    ],
  },
  authRoute,
  errorRoute,
]);

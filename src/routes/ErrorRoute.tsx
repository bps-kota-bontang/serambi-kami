import { RouteObject } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";

export const errorRoute: RouteObject = {
  path: "*",
  element: <NotFoundPage />,
};

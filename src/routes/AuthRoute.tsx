import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

export const authRoute: RouteObject = {
  path: "login",
  children: [
    { index: true, element: <LoginPage /> }
  ],
};

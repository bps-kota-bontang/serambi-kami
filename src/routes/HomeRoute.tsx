import { APP_NAME } from "@/configs/Constant";
import HomePage from "@/pages/HomePage";
import { Route } from "@/types/Route";

export const homeRoutes: Route[] = [
  {
    isIndex: true,
    element: <HomePage />,
    title: APP_NAME,
    root: "",
  },
];

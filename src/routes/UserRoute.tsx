import UserPage from "@/pages/UserPage";
import { Route } from "@/types/Route";

export const userRoutes: Route[] = [
  {
    isIndex: true,
    element: <UserPage />,
    title: "Pengguna",
    root: "users",
  },
  {
    path: ":userId",
    element: <UserPage />,
    title: "Rincian Pengguna",
    root: "users",
    isDynamic: true,
  },
];

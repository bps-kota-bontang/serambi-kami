import ProfilePage from "@/pages/ProfilePage";
import { Route } from "@/types/Route";

export const profileRoutes: Route[] = [
  {
    isIndex: true,
    element: <ProfilePage />,
    title: "Profile",
    root: "profile",
  },
];

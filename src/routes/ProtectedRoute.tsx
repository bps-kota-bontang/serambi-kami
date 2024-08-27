import { Route } from "@/types/Route";
import { homeRoutes } from "@/routes/HomeRoute";
import { serviceRoutes } from "@/routes/ServiceRoute";
import { teamRoutes } from "@/routes/TeamRoute";
import { profileRoutes } from "@/routes/ProfileRoute";

export const protectedRoutes: Route[] = [
  ...homeRoutes,
  ...serviceRoutes,
  ...teamRoutes,
  ...profileRoutes,
  // ...userRoutes,
];

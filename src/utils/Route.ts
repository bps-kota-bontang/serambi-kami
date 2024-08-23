import { Route } from "@/types/Route";
import { RouteObject } from "react-router-dom";

export const convertRoutesToRouteObject = (routes: Route[]): RouteObject[] => {
  const groupedRoutes: { [key: string]: RouteObject } = {};

  routes.forEach((route) => {
    const { root, isIndex, ...rest } = route;

    if (!groupedRoutes[root]) {
      groupedRoutes[root] = {
        path: root,
        children: [],
      };
    }

    const childRoute = isIndex
      ? { ...rest, index: true }
      : { ...rest, path: route.path };

    groupedRoutes[root].children!.push(childRoute);
  });

  return Object.values(groupedRoutes);
};

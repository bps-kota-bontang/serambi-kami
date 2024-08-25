import { APP_NAME } from "@/configs/Constant";
import { Route } from "@/types/Route";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

export function createBreadcrumbItems(
  paths: string[],
  routes: Route[]
): ItemType[] {
  const breadcrumbItems: ItemType[] = [];
  const routeMap: { [key: string]: Route } = {};

  routes.forEach((route) => {
    if (route.path) {
      routeMap[route.path] = route;
    } else if (route.isIndex && route.root) {
      routeMap[route.root] = route;
    }
  });

  let currentPath = "";

  breadcrumbItems.push({
    title: paths.length ? <Link to="/">{APP_NAME}</Link> : APP_NAME,
  });

  paths.forEach((path, index) => {
    currentPath += `/${path}`;

    const route = routeMap[path] || routeMap[currentPath];

    if (route) {
      breadcrumbItems.push({
        title: route.title,
        ...(index !== paths.length - 1 && {
          title: <Link to={currentPath}>{route.title}</Link>,
        }),
      });
    } else {
      const dynamicRoutes = Object.entries(routeMap)
        .filter(([, route]) => route.isDynamic)
        .map(([, value]) => value);

      breadcrumbItems.push({
        title: dynamicRoutes.find(
          (route) => route.isDynamic && route.root == paths[0]
        )?.title,
      });
    }
  });

  return breadcrumbItems;
}

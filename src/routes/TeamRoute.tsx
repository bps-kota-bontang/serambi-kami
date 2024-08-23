import TeamPage from "@/pages/TeamPage";
import { Route } from "@/types/Route";

export const teamRoutes: Route[] = [
  {
    isIndex: true,
    element: <TeamPage />,
    title: "Tim",
    root: "teams",
  },
];

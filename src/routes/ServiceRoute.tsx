import ServicePage from "@/pages/ServicePage";
import CreateServicePage from "@/pages/CreateServicePage";
import { Route } from "@/types/Route";
import DetailServicePage from "@/pages/DetailServicePage";

export const serviceRoutes: Route[] = [
  {
    isIndex: true,
    element: <ServicePage />,
    title: "Layanan",
    root: "services",
  },
  {
    path: "create",
    element: <CreateServicePage />,
    title: "Tambah Layanan",
    root: "services",
  },
  {
    path: ":serviceId",
    element: <DetailServicePage />,
    title: "Rincian Layanan",
    root: "services",
    isDynamic: true,
  },
];

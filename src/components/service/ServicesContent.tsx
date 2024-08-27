import { Service } from "@/types/Service";
import { lazy } from "react";

const ServiceItem = lazy(() => import("@/components/service/ServiceItem"));

interface ServicesContentProps {
  services: Service[];
  onItemDeleted: () => Promise<void>;
}

const ServicesContent = ({ services, onItemDeleted }: ServicesContentProps) => {
  return (
    <div className="my-5 flex-1 grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-min">
      {services.map((item: Service, index: number) => (
        <ServiceItem onItemDeleted={onItemDeleted} key={index} service={item} />
      ))}
    </div>
  );
};

export default ServicesContent;

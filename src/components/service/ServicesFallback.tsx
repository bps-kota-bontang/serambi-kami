import ServiceSkeletonItem from "@/components/service/ServiceSkeletonItem";

interface ServiceFallbackProps {
  limit: number;
}

const ServicesFallback = ({ limit }: ServiceFallbackProps) => {
  return (
    <div className="my-5 flex-1 grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-min">
      {[...Array(limit / 2)].map((_, index) => (
        <ServiceSkeletonItem key={index} />
      ))}
    </div>
  );
};

export default ServicesFallback;

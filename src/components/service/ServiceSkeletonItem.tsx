import { Skeleton } from "antd";

const ServiceSkeletonItem = () => {
  return (
    <div className="bg-white rounded-md drop-shadow-md p-5 gap-2 flex flex-col ">
      <Skeleton.Avatar />
      <Skeleton paragraph />
      <Skeleton.Button className="mt-2" />
    </div>
  );
};

export default ServiceSkeletonItem;

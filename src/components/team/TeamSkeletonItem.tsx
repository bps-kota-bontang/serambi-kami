import { Skeleton } from "antd";

const TeamSkeletonItem = () => {
  return (
    <div className="bg-white rounded-md drop-shadow-md p-5 gap-2 flex flex-col ">
      <Skeleton title={false} paragraph={true} />
      <div className="flex">
        <Skeleton.Avatar />
        <Skeleton.Avatar />
        <Skeleton.Avatar />
        <Skeleton.Avatar />
      </div>
    </div>
  );
};

export default TeamSkeletonItem;

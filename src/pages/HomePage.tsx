import { APP_NAME } from "@/configs/Constant";

const HomePage = () => {
  return (
    <div className="w-full h-full bg-white justify-center items-center flex">
      <h1 className="text-lg ">Selamat Datang di {APP_NAME}!</h1>
    </div>
  );
};

export default HomePage;

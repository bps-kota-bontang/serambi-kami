import { useEffect, useState } from "react";

const BackgroundLogin = () => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDegree((prev) => (prev + 1) % 360);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="bg"
      className="hidden lg:flex lg:flex-1 lg:justify-center rounded-3xl"
      style={{
        background: `linear-gradient(${degree}deg, #3b82f6 0%, #05966f 50%, #f56a00 100%)`,
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <span className="text-white text-2xl font-bold">
          Selamat Datang Kembali
        </span>
        <span className="text-white text-lg font-light">
          Silahkan masuk untuk melanjutkan
        </span>
      </div>
    </div>
  );
};

export default BackgroundLogin;

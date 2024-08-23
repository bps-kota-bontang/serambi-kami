import { Outlet } from "react-router-dom";
import { Layout, Tour, TourProps } from "antd";
import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import { APP_NAME } from "@/configs/Constant";

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);

  const steps: TourProps["steps"] = useMemo(
    () => [
      {
        title: "Selamat Datang",
        description: `Selamat datang di aplikasi ${APP_NAME}.`,
      },
      {
        title: "Menu",
        description: "Daftar menu yang tersedia.",
        target: () => sidebarRef.current,
        placement: "right",
      },
      {
        title: "Navigasi",
        description: "Arahkan ke avatar untuk melihat menu.",
        target: () => headerRef.current,
      },
      {
        title: "Terima kasih",
        description: `Terima kasih telah menggunakan aplikasi ${APP_NAME}.`,
      },
    ],
    []
  );

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");

    if (!hasSeenTour) {
      setOpen(true);
    }
  }, []);

  const handleTourFinish = () => {
    localStorage.setItem("hasSeenTour", "true");
    setOpen(false);
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar ref={sidebarRef} />
      <Layout>
        <Header ref={headerRef} />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={handleTourFinish}
        steps={steps}
      />
    </Layout>
  );
};

export default DashboardLayout;

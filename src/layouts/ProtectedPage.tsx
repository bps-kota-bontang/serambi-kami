import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="flex w-full h-screen justify-center items-center">
        <Spin size="large" />
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;

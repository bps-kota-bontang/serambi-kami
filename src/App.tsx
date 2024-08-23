import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { config } from "@/configs/Theme";
import { router } from "@/configs/Router";
import { App as AppAntd } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider theme={config}>
        <AppAntd>
          <RouterProvider
            router={router}
            fallbackElement={
              <div className="w-full h-screen">Loading...</div>
            }
          />
        </AppAntd>
      </ConfigProvider>
    </AuthProvider>
  );
}

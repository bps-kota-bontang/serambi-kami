import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, App, Divider } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL, APP_NAME } from "@/configs/Constant";
import LogoBPS from "../../public/bps.svg?react";
import Cookies from "js-cookie";

interface FormLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const auth = useAuth();
  const { notification } = App.useApp();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDegree((prev) => (prev + 1) % 360);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Cookies.get("useSso") == "true") {
      auth.loginSso();
    }
  }, [auth]);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleClickSSO = () => {
    Cookies.set("useSso", "true", { expires: 3 / 1440 });
    window.location.href = `${API_BASE_URL}/v1/auth/sso`;
  };

  const onFinish = async (values: FormLogin) => {
    try {
      setIsLoading(true);
      await auth.login(values.email, values.password);
      notification.success({
        message: "Login Berhasil",
        description:
          "Anda telah berhasil login ke sistem. Selamat datang kembali!",
      });
    } catch (error) {
      console.error("An error occurred: ", error);
      notification.error({
        message: "Login Gagal",
        description:
          "Kami tidak dapat memverifikasi kredensial Anda. Silakan periksa kembali nama pengguna dan kata sandi Anda, kemudian coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex p-3 ">
      <div className="flex-1 flex flex-col justify-center px-3 bg-white">
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="border rounded-lg p-3">
              <img src="/serambi-logo.png" alt="logo" className="h-12 w-12 " />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">
                {APP_NAME}
              </span>
              <span className="text-md text-gray-500 font-light">
                Selamat datang - Silahkan masuk menggunakan akun anda
              </span>
            </div>
          </div>
          <Divider />
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Masuk
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <Button
            block
            icon={<LogoBPS className="h-5 w-5" />}
            onClick={handleClickSSO}
          >
            Masuk dengan SSO BPS
          </Button>
        </div>
      </div>
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
    </div>
  );
};

export default LoginPage;

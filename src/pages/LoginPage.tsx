import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, App } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState } from "react";

interface FormLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const auth = useAuth();
  const { notification } = App.useApp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

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
    <Flex className="w-full h-screen" justify="center" align="center">
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;

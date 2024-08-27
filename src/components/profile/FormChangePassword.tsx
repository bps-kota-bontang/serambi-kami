import { updateUserPassword } from "@/api/User";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/User";
import { App, Button, Card, Form, Input } from "antd";
import { useState } from "react";

interface FormChangePasswordProps {
  user: User;
}

const FormChangePassword = ({ user }: FormChangePasswordProps) => {
  const [form] = Form.useForm();
  const { logout } = useAuth();
  const { notification } = App.useApp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (values.newPassword !== values.confirmNewPassword) {
        notification.warning({
          message: "Terjadi Kesalahan",
          description: "Konfirmasi kata sandi baru tidak sesuai.",
        });
        return;
      }

      await updateUserPassword(user.id, values);
      notification.success({
        message: "Berhasil Mengubah Kata Sandi",
        description:
          "Kata sandi Anda berhasil diubah. Silakan gunakan kata sandi baru Anda untuk masuk kembali.",
      });
      form.resetFields();
      logout();
    } catch (error) {
      console.error("Error submitting form:", error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal mengubah kata sandi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          label="Kata Sandi Lama"
          name="oldPassword"
          required
          tooltip="Kata sandi lama wajib diisi"
          rules={[
            { required: true, message: "Silahkan masukan kata sandi lama" },
          ]}
        >
          <Input.Password placeholder="Masukan kata sandi lama" />
        </Form.Item>
        <Form.Item
          label="Kata Sandi Baru"
          name="newPassword"
          required
          tooltip="Kata sandi baru wajib diisi"
          rules={[
            { required: true, message: "Silahkan masukan kata sandi baru" },
          ]}
        >
          <Input.Password placeholder="Masukan kata sandi baru" />
        </Form.Item>
        <Form.Item
          label="Konfirmasi Kata Sandi Baru"
          name="confirmNewPassword"
          required
          tooltip="Konfirmasi kata sandi baru wajib diisi"
          rules={[
            {
              required: true,
              message: "Silahkan masukan konfirmasi kata sandi baru",
            },
          ]}
        >
          <Input.Password placeholder="Masukan konfirmasi kata sandi baru" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Ubah
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormChangePassword;

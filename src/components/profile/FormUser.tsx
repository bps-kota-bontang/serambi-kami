import { User } from "@/types/User";
import { Card, Form, Input } from "antd";
import { useEffect } from "react";

interface FormUserProps {
  user: User;
}

const FormUser = ({ user }: FormUserProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      nip: user.nip,
    });
  }, [form, user]);

  return (
    <Card>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nama lengkap"
          name="name"
          tooltip="Nama tidak dapat diubah"
        >
          <Input placeholder="Masukan nama lengkap" disabled />
        </Form.Item>
        <Form.Item
          label="Nomor Induk Pegawai"
          name="nip"
          tooltip="NIP tidak dapat diubah"
        >
          <Input placeholder="Masukan NIP" disabled />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          tooltip="Email tidak dapat diubah"
        >
          <Input placeholder="Masukan Email" disabled />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormUser;
